import {Course, Person} from "./beforeNoneConsideredCollectionModels.js";

describe("컬랙션으로 관리하기 전", () => {
	let aPerson;
	beforeEach(() => {
		aPerson = new Person("sinho");
		aPerson.courses = [
			{name: "수학", isAdvanced: false},
			{name: "영어", isAdvanced: false},
			{name: "수2", isAdvanced: true},
			{name: "물리", isAdvanced: true},
		].map((course) => new Course(course));
		console.log(aPerson.courses);
	});

	it("advancedCourses 개수는?", () => {
		const numAdvencedCouses = aPerson.courses.filter((c) => c.isAdvanced).length;
		expect(numAdvencedCouses).toBe(2);
	});
});
