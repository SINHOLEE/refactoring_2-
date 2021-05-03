import {Course, Person} from "./afterConsideredCollectionModels.js";

describe("컬랙션으로 관리하기 후", () => {
	let aPerson;
	beforeEach(() => {
		aPerson = new Person("sinho");
		[
			{name: "수학", isAdvanced: false},
			{name: "영어", isAdvanced: false},
			{name: "수2", isAdvanced: true},
			{name: "물리", isAdvanced: true},
		].forEach((course) => aPerson.addCourse(new Course(course)));
	});

	it("advancedCourses 개수는?", () => {
		const numAdvencedCouses = aPerson.numberOfAdvancedCourses;
		expect(numAdvencedCouses).toBe(2);
	});

	it("수2를 지우면", () => {
		aPerson.removeCourse(new Course({name: "수2", isAdvanced: true}));
		expect(aPerson.courses).toEqual(
			[
				{name: "수학", isAdvanced: false},
				{name: "영어", isAdvanced: false},
				{name: "물리", isAdvanced: true},
			].map((item) => new Course(item)),
		);
	});
});
