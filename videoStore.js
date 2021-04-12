import invoices from "./invoices.js";
import plays from "./plays.js";

function amountFor(aPerformance, play) {
	let result = 0;
	switch (play.type) {
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
			throw new Error(`알수없는 장르 ${play.type}`);
			break;
	}
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

	for (let perf of invoice.performances) {
		const play = plays[perf.playID];
		let thisAmount = amountFor(perf, play);
		// 포인트를 적립한다.? 30명 이상이면 포인트를 준다.
		volumeCredits += Math.max(perf.audience - 30, 0);
		// 코메디 장르일 경우 5명 마다 추가 포인트를 적립해준다.
		if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
		result += `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
		totalAmount += thisAmount;
	}
	result += `총액: ${format(totalAmount / 100)}\n`;
	result += `적립포인트: ${format(volumeCredits)}\n`;
	return result;
}

// 현재 나쁜냄새가 나는 부분
// 1 switch문, 2. if comedy
console.log(statement(invoices[0], plays));
