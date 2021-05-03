import {Person} from "./index.js";
describe("person - department", () => {
	it("mini가 속한 부서의 매니저는 sinho이다.", () => {
		const mini = new Person("mini");
		expect(mini.manager).toBe("sinho");
	});
});
