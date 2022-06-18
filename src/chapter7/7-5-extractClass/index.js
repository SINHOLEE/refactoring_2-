// 클래스는 명확하게 추상화하고 주어진 소수의 역할만 책임져야 한다.
// 메서드와 데이터가 너무많으면 클래스를 이해하기 쉽지 않다. 그러므로 적절히 분리하는것이 좋다.
// 일부 데이터를 따로 묶을 수 있으면 분리하라는 신호.

export class Person {
	constructor({name, officeAreaCode, officeNumber}) {
		this.name = name;
		this._telephoneNumber = new TelePhoneNumber(officeAreaCode, officeNumber);
	}

	get name() {
		return this._name;
	}
	set name(arg) {
		this._name = arg;
	}
	get telephoneNumber() {
		return this._telephoneNumber.toString();
	}
	get officeNumber() {
		return this._telephoneNumber.number;
	}
	set officeNumber(arg) {
		this._telephoneNumber.number = arg;
	}
	get officeAreaCode() {
		return this._telephoneNumber.areaCode;
	}
	set officeAreaCode(arg) {
		this._telephoneNumber.areaCode = arg;
	}
}

class TelePhoneNumber {
	constructor(areaCode, number) {
		this.areaCode = areaCode;
		this.number = number;
	}
	get areaCode() {
		return this._areaCode;
	}
	set areaCode(arg) {
		this._areaCode = arg;
	}
	get number() {
		return this._number;
	}
	set number(arg) {
		this._number = arg;
	}
	toString() {
		return `${this.areaCode} ${this.number}`;
	}
}
