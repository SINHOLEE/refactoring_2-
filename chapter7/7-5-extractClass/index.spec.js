import {Person} from "./index.js";

describe("extact class", () => {
	let aPerson;
	beforeEach(() => {
		aPerson = new Person({name: "무야호", officeAreaCode: "02", officeNumber: "3321-7598"});
	});

	it("회귀 테스트 이름", () => {
		expect(aPerson.name).toBe("무야호");
	});
	it("회귀 테스트 전화번호", () => {
		expect(aPerson.telephoneNumber).toBe("02 3321-7598");
	});
	it("회귀 테스트 지역코드", () => {
		expect(aPerson.officeAreaCode).toBe("02");
	});
	it("회귀 테스트 회사번호", () => {
		expect(aPerson.officeNumber).toBe("3321-7598");
	});
});
