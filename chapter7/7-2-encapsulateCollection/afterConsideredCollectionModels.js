export class Person {
	constructor(name) {
		this._name = name;
		this._courses = [];
	}
	get name() {
		return this._name;
	}
	get courses() {
		return this._courses.slice();
	}
	// set courses(aList) {
	// 	return (this._courses = aList);
	// }

	addCourse(aCourse) {
		this._courses.push(aCourse);
		return this;
	}
	removeCourse(
		aCourse,
		fnIfAbsent = () => {
			throw new RangeError();
		},
	) {
		// const delIndex = this._courses.indexOf(aCourse);
		const delIndex = this._courses.findIndex(aCourse.isEqual.bind(aCourse));
		if (delIndex === -1) {
			fnIfAbsent();
		}
		this._courses.splice(delIndex, 1);
		return this;
	}
	get numberOfAdvancedCourses() {
		return this._courses.filter((c) => c.isAdvanced).length;
	}
}

export class Course {
	constructor(data) {
		this._name = data.name;
		this._isAdvanced = data.isAdvanced;
	}
	isEqual(target) {
		return this._name === target.name;
	}

	get name() {
		return this._name;
	}
	get isAdvanced() {
		return this._isAdvanced;
	}
}
