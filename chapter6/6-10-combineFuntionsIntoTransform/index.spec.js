// 여러 함수를 한데 묶는 이유중 하나는 도출 로직이 중복되는 것을 피하기 위해서이다.
// 또한 이곳 저곳에서 흩뿌려저 있는 함수조각을을 한데모아 응집도를 높이는 효과를 보기 위해 사용한다.
// 여기서 궁금한점은 클래스로 묶는방법과 묶음함수로 변환하는 방법 중 클래스방법이 더 직관적인 방법으로 보인다. 과연 이 방법만의 장점이 있을까?

import {enrichReading} from "./index.js";
import {reading} from "./readingData.js";
import {acquireReading, baseRate, deepCopy, taxThreshold} from "./utils.js";

describe("클라이언트1 ", () => {
	it("기본요금을 계산하는 코드를 직접 구현해놓은 환경", () => {
		const aReading = acquireReading();
		const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
		expect(baseCharge).toBe(1.3);
	});
});
// // 클라이언트2
describe("client2", () => {
	it("기본적인 차소비량이 많아서 기본소비량만큼을 제외하고 세금을 걷는다.", () => {
		const aReading = acquireReading();
		const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
		const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
		expect(taxableCharge).toBe(1.0);
	});
	it("taxableCharge 함수를 enrichReading함수로 이동한다.", () => {
		const rawReading = acquireReading();
		const aReading = enrichReading(rawReading);
		const taxableCharge = aReading.taxableCharge;
		expect(taxableCharge).toBe(1.0);
	});
});

describe("client3 ", () => {
	it("이미 calculateBaseCharge함수가 정의되어있던 환경", () => {
		const aReading = acquireReading();
		const basicChargeAmount = calculateBaseCharge(aReading);
		function calculateBaseCharge(aReading) {
			return baseRate(aReading.month, aReading.year) * aReading.quantity;
		}

		expect(basicChargeAmount).toBe(1.3);
	});
	it("enRichReading을 적용하여 calculateBaseCharge 삭제", () => {
		const rawReading = acquireReading();
		const aReading = enrichReading(rawReading);
		const basicChargeAmount = aReading.baseCharge;

		expect(basicChargeAmount).toBe(1.3);
	});
});

describe("enrichReading 불변성 테스트", () => {
	it("만약 aReading과 copiedReading이 다르다면 enrichReading으로 불변성이 깨지는 것이다.", () => {
		const aReading = acquireReading();
		const copiedReading = deepCopy(aReading);
		const enrichedReading = enrichReading(aReading);
		expect(aReading).toEqual(copiedReading);
	});
});

// baseRate계산테스트;
describe("baseRate test", () => {
	let aReading;
	beforeEach(() => {
		aReading = acquireReading();
	});
	it("1월", () => {
		expect(baseRate(1, aReading.year)).toBe(0.13);
	});
	it("2월", () => {
		expect(baseRate(2, aReading.year)).toBe(0.14);
	});
	it("3월", () => {
		expect(baseRate(3, aReading.year)).toBe(0.11);
	});
});
