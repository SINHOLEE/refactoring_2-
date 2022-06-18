import {
	CustomerData,
	compareUsage,
	getCustomerData,
	getRawDataOfCustomers,
	setRawDataOfCustomers,
	setUsage,
} from "./nastedRecord.js";

describe("중첩된 레코드 캡슐화하기", () => {
	let customerData;
	beforeEach(() => {
		setRawDataOfCustomers({
			1920: {
				name: "마틴 파울러",
				id: 1920,
				usages: {
					2016: {1: 50, 2: 55, 3: 52},
					2015: {1: 70, 2: 63, 3: 52},
				},
			},
			38673: {
				name: "닐 포드",
				id: 38673,
				usages: {
					2016: {1: 40, 2: 45, 3: 42},
					2015: {1: 50, 2: 53, 3: 62},
				},
			},
		});
		customerData = getRawDataOfCustomers();
	});
	it("읽기", () => {
		expect(customerData[1920].usages[2016][1]).toBe(50);
	});
	it("쓰기", () => {
		const currentData = getCustomerData();
		currentData.setUsage(1920, 2016, 1, 60);
		// 기존의 값은 유지하고
		expect(customerData[1920].usages[2016][1]).toBe(50);
		// setUsage를 호출한 인스턴스는 인스턴스대로 관리됨
		expect(currentData.rawData[1920].usages[2016][1]).toBe(60);
	});
	it("사용량 비교", () => {
		const res = compareUsage(1920, 2016, 1);
		expect(res).toEqual({laterAmount: 50, change: -20});
	});
});
