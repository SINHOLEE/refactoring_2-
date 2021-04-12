import invoices from "./invoices.js";
import plays from "./plays.js";
import assert from "assert";

function playFor(aPerformance) {
	return plays[aPerformance.playID];
}

// playFor을 이용하여 amountFor 인자를 줄였을때의 이득
// 임시변수에 대한 복잡도가 줄어들어 코드를 읽는데 있어 덜 부담스럽다.
// 지역변수를 제거함으로써 얻을 수 있는 가장 큰 이득은 추출작업이 쉬워진다는 것
// 유효범위를 신경써야할 대상이 줄었기 때문이다. -> 지역변수를 최대한 줄이는 것이 리팩터링의 첫 단계!
function amountFor(aPerformance) {
	let result = 0;
	switch (playFor(aPerformance).type) {
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

	if ("comedy" === playFor(aPerformance).type) {
		result += Math.floor(aPerformance.audience / 5);
	}
	// 포인트를 적립한다.? 30명 이상이면 포인트를 준다.
	result += Math.max(aPerformance.audience - 30, 0);
	return result;
}
function statement(invoice, plays) {
	let totalAmount = 0;
	let volumeCredits = 0;
	let result = `청구 내역 (고객명:${invoice.customer})\n`;
	const format = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format;

	for (let performance of invoice.performances) {
		volumeCredits += volumeCreditsFor(performance);
		result += `  ${playFor(performance).name}: ${format(amountFor(performance) / 100)} (${
			performance.audience
		}석)\n`;
		totalAmount += amountFor(performance);
	}
	result += `총액: ${format(totalAmount / 100)}\n`;
	result += `적립포인트: ${format(volumeCredits)}\n`;
	return result;
}

// 현재 나쁜냄새가 나는 부분
// 1 switch문, 2. if comedy

assert.equal(
	statement(invoices[0], plays),
	`청구 내역 (고객명:Bigco)
  Hamlet: $650.00 (55석)
  As You Like It: $580.00 (35석)
  Othello: $500.00 (40석)
총액: $1,730.00
적립포인트: $47.00\n`,
);
console.log(statement(invoices[0], plays));
