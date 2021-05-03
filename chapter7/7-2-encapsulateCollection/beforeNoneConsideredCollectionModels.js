export class Person {
	constructor(name) {
		this._name = name;
		this._courses = [];
	}
	get name() {
		return this._name;
	}
	get courses() {
		return this._courses;
	}
	set courses(aList) {
		return (this._courses = aList);
	}
}

export class Course {
	constructor(data) {
		this._name = data.name;
		this._isAdvanced = data.isAdvanced;
	}

	get name() {
		return this._name;
	}
	get isAdvanced() {
		return this._isAdvanced;
	}
}
