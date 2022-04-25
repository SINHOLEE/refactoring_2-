import assert from "assert";
const reading = {
	customer: "sinho",
	quantity: 10,
	month: 5,
	year: 2021,
};

//첫번째 절차 데이터형을 클래스로 바꾼다.

// 남아있는 숙제
// baseRate와 taxThreshold함수의 경우, utils로 빠져있는 외부함수다.
// 이경우 단순히 외부함수로 존재하도록 두는것이 맞는건지 아니면 reading인스턴스를 생성할 때 의존성을 주입해야하는것인지 궁금
class Reading {
	constructor(data) {
		this._customer = data.customer;
		this._quantity = data.quantity;
		this._month = data.month;
		this._year = data.year;
	}
	get baseCharge() {
		return baseRate(this._month, this._year) * this._quantity;
	}

	get taxableCharge() {
		return Math.max(0, this.baseCharge - taxThreshold(this._year));
	}

	get customer() {
		return this._customer;
	}

	get quantity() {
		return this._quantity;
	}

	get month() {
		return this._month;
	}

	get year() {
		return this._year;
	}
}

// 클라이언트1
// 기본요금을 계산하는 코드
{
	const rawReading = acquireReading();
	const aReading = new Reading(rawReading);
	const baseCharge = aReading.baseCharge;
	assert.strictEqual(baseCharge, 1.3);
}

// // 클라이언트2
// // 기본적인 차소비량이 많아서 기본소비량만큼을 제외하고 세금을 걷는다.
{
	const rawReading = acquireReading();
	const aReading = new Reading(rawReading);

	const base = aReading.baseCharge;
	const taxableCharge = aReading.taxableCharge;
	assert.strictEqual(taxableCharge, 1);
}

// //클라이언트3
// // 이미 함수화 되어있는 코드 발견
{
	const rawReading = acquireReading();
	const aReading = new Reading(rawReading);
	const basicChargeAmount = aReading.baseCharge;

	assert.strictEqual(basicChargeAmount, 1.3);
}

function acquireReading() {
	return Object.assign({}, reading);
}
// baseRate계산테스트
{
	const rawReading = acquireReading();
	const aReading = new Reading(rawReading);

	assert.strictEqual(baseRate(1, aReading.year), 0.13, "1월");
	assert.strictEqual(baseRate(2, aReading.year), 0.14, "2월");
	assert.strictEqual(baseRate(3, aReading.year), 0.11, "3월");
	assert.strictEqual(baseRate(4, aReading.year), 0.12, "4월");
	assert.strictEqual(baseRate(5, aReading.year), 0.13, "5월");
	assert.strictEqual(baseRate(6, aReading.year), 0.14, "6월");
	assert.strictEqual(baseRate(7, aReading.year), 0.1, "7월");
	assert.strictEqual(baseRate(8, aReading.year), 0.15, "8월");
	assert.strictEqual(baseRate(9, aReading.year), 0.13, "9월");
	assert.strictEqual(baseRate(10, aReading.year), 0.14, "10월");
	assert.strictEqual(baseRate(11, aReading.year), 0.11, "11월");
	assert.strictEqual(baseRate(12, aReading.year), 0.12, "12월");
}
function baseRate(aMonth, aYear) {
	// 어떤 계산식
	const rates = [10, 15, 13, 14, 11, 12, 13, 14, 11, 12, 13, 14];

	const rateIndex = (aMonth + aYear) % rates.length;
	return rates[rateIndex] / 100;
}

function taxThreshold(aYear) {
	return 0.3;
}
