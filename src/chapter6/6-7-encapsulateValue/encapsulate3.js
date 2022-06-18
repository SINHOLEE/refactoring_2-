let defaultOwnerData = {lastName: "이", firstName: "신호"};

export function defaultOwner3() {
	// 복제
	return new Person(defaultOwnerData);
}
export function setDefaultOwner3(arg) {
	defaultOwnerData = arg;
}

class Person {
	constructor(data) {
		this._lastName = data.lastName;
		this._firstName = data.firstName;
	}
	get firstName() {
		return this._firstName;
	}
	get lastName() {
		return this._lastName;
	}
}
