import invoices from "./invoices.js";
import plays from "./plays.js";
import assert from "assert";

function statement(invoice, plays) {
	const statementData = {};
	statementData.customer = invoice.customer;
	// 이때 불변데이터로 바꾼다.
	statementData.performances = invoice.performances.map(enrichPerformance);
	statementData.totalAmount = totalAmount();
	return renderPlainText(statementData, plays);
	function totalAmount() {
		let result = 0;
		for (let performance of statementData.performances) {
			result += performance.amount;
		}
		return result;
	}

	// model 변경 혹은 시리얼라이징!
	function enrichPerformance(aPerformance) {
		const result = Object.assign({}, aPerformance);
		result.play = playFor(result);
		result.amount = amountFor(result);
		result.volumeCredits = volumeCreditsFor(result);

		return result;
	}

	function playFor(aPerformance) {
		return plays[aPerformance.playID];
	}

	function amountFor(aPerformance) {
		let result = 0;
		switch (aPerformance.play.type) {
			case "tragedy":
				result = 40000;
				if (aPerformance.audience > 30) {
					result += 1000 * (aPerformance.audience - 30);
				}
				break;
			case "comedy":
				result = 30000;
				if (aPerformance.audience > 20) {
					result += 10000 + 500 * (aPerformance.audience - 20);
				}
				result += 300 * aPerformance.audience;
				break;
			default:
				throw new Error(`알수없는 장르 ${playFor(aPerformance).type}`);
				break;
		}
		return result;
	}

	function volumeCreditsFor(aPerformance) {
		let result = 0;
		// 코메디 장르일 경우 5명 마다 추가 포인트를 적립해준다.
		if ("comedy" === aPerformance.play.type) {
			result += Math.floor(aPerformance.audience / 5);
		}
		// 포인트를 적립한다.? 30명 이상이면 포인트를 준다.
		result += Math.max(aPerformance.audience - 30, 0);
		return result;
	}
}

function renderPlainText(data, plays) {
	let result = `청구 내역 (고객명:${data.customer})\n`;
	for (let performance of data.performances) {
		result += `  ${performance.play.name}: ${usd(performance.amount)} (${
			performance.audience
		}석)\n`;
	}

	result += `총액: ${usd(data.totalAmount)}\n`;
	result += `적립포인트: ${totalVolumeCredits()}\n`;
	return result;

	// 중간점검: 구조는 한결 깔끔해 졌지만 중첩함수가 난무한다.
	// 임시변수 지우기의 효과 1
	function totalVolumeCredits() {
		let result = 0;
		for (let performance of data.performances) {
			result += performance.volumeCredits;
		}
		return result;
	}
	function usd(aNumber) {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
		}).format(aNumber / 100);
	}
}

assert.equal(
	statement(invoices[0], plays),
	`청구 내역 (고객명:Bigco)
  Hamlet: $650.00 (55석)
  As You Like It: $580.00 (35석)
  Othello: $500.00 (40석)
총액: $1,730.00
적립포인트: 47\n`,
);
console.log(statement(invoices[0], plays));
