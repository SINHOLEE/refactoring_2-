// model or store

/**
 * @returns {object} {customer:string, performances:Array, totalAmount:number, totalVolumeCredits:number}
 *
 */
export default function createStatementData(invoice, plays) {
	const statementData = {};
	statementData.customer = invoice.customer;
	// 이때 불변데이터로 바꾼다.
	statementData.performances = invoice.performances.map(enrichPerformance);
	statementData.totalAmount = totalAmount(statementData);
	statementData.totalVolumeCredits = totalVolumeCredits(statementData);
	return statementData;

	// model 변경 혹은 시리얼라이징!
	function enrichPerformance(aPerformance) {
		const result = Object.assign({}, aPerformance);
		result.play = playFor(result);
		result.amount = amountFor(result);
		result.volumeCredits = volumeCreditsFor(result);

		return result;
	}
	function totalVolumeCredits(data) {
		return data.performances.reduce((total, performance) => total + performance.volumeCredits, 0);
	}

	function totalAmount(data) {
		return data.performances.reduce((total, performance) => total + performance.amount, 0);
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
