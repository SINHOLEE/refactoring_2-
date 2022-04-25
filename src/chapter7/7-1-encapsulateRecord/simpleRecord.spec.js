import {getOrganization} from "./simpleRecord.js";

// 사용처
describe("simpleRecord to encapsulated object", () => {
	it("read example name", () => {
		let result = "";
		result += `<h1>${getOrganization().name}</h1>`;
		expect(result).toBe("<h1>애크미 구스베리</h1>");
	});
	it("read example country", () => {
		let result = "";
		result += `<h1>${getOrganization().country}</h1>`;
		expect(result).toBe("<h1>GB</h1>");
	});
	it("write example name", () => {
		let result = "";
		getOrganization().name = "sinho";
		result += `<h1>${getOrganization().name}</h1>`;
		expect(result).toBe("<h1>sinho</h1>");
	});
	it("write example country", () => {
		let result = "";
		getOrganization().country = "suwon";
		result += `<h1>${getOrganization().country}</h1>`;
		expect(result).toBe("<h1>suwon</h1>");
	});
});
