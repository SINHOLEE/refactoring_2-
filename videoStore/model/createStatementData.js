// model or store

let cnt = 0;
class PerformanceCalculator {
	constructor(aPerformance, aPlay) {
		this.performance = aPerformance;
		this.play = aPlay;
	}
	get amount() {
		throw new Error(`현재 사용하지 않는 메서드입니다.`);
	}
	get volumeCredits() {
		return Math.max(this.performance.audience - 30, 0);
	}
}

//1 팩토리 생성함수를 선언한다.

function createFactoryPerformanceCalculator(aPerformance, aPlay) {
	switch (aPlay.type) {
		case 'tragedy':
			return new TragedyCalculator(aPerformance, aPlay);
		case 'comedy':
			return new ComedyCalculator(aPerformance, aPlay);
		default:
			throw new Error(`알 수 없는 장르: ${aPlay.type}`);
	}
	return new PerformanceCalculator(aPerformance, aPlay);
}

class TragedyCalculator extends PerformanceCalculator {
	get amount() {
		let result = 40000;
		if (this.performance.audience > 30) {
			result += 1000 * (this.performance.audience - 30);
		}
		return result;
	}
	get volumeCredits() {
		return super.volumeCredits;
	}
}
class ComedyCalculator extends PerformanceCalculator {
	get amount() {
		let result = 30000;
		if (this.performance.audience > 20) {
			result += 10000 + 500 * (this.performance.audience - 20);
		}
		result += 300 * this.performance.audience;
		return result;
	}

	get volumeCredits() {
		// 포인트를 적립한다.? 30명 이상이면 포인트를 준다.

		return super.volumeCredits + Math.floor(this.performance.audience / 5);
	}
}

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
	// console.log(JSON.stringify(statementData));
	return statementData;

	// model 변경 혹은 시리얼라이징!
	function enrichPerformance(aPerformance) {
		const calculator = createFactoryPerformanceCalculator(
			aPerformance,
			playFor(aPerformance)
		);
		const result = Object.assign({}, aPerformance);
		result.play = calculator.play;
		result.amount = calculator.amount;
		result.volumeCredits = calculator.volumeCredits;

		return result;
	}
	function totalVolumeCredits(data) {
		return data.performances.reduce(
			(total, performance) => total + performance.volumeCredits,
			0
		);
	}

	function totalAmount(data) {
		return data.performances.reduce(
			(total, performance) => total + performance.amount,
			0
		);
	}

	function playFor(aPerformance) {
		return plays[aPerformance.playID];
	}
}
