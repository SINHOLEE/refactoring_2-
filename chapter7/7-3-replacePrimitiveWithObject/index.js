// 예를들어 전화번호를 문자열로 표현하는 기능에서,
// 국제번호를 찾거나, 지역코드를 추출하는 등의 기능이 필요하다면
// 데이터에서 클래스로 포멧팅하여 로직을 관리하는것이 좋다.

export class Order {
	constructor(data) {
		this.priority = data.priority;
	}
	//1 변수 캡슐화
	// 왜? 필드를 자가캡슐화한다면 필드이름을 바꿔도 클라이언트 코드는 변경하지 않아도 되기 때문.
	get priority() {
		return this._priority;
	}
	get priorityString() {
		return this._priority.toString();
	}

	set priority(aString) {
		this._priority = new Priority(aString);
	}
}

export class Priority {
	constructor(value) {
		if (value instanceof Priority) {
			return value;
		}
		if (Priority.priorityOrder().includes(value)) {
			this._value = value;
		} else {
			throw new Error(`${value} is invalid for priority`);
		}
	}

	// getter를 쓰지 않고 toString으로 표현하는 이유
	// 클라이언트 입장에서 보면 속성 자체를 받은게 아니라 해당 속성을 문자열로 표현한 것
	static priorityOrder() {
		return ["low", "normal", "high", "rush"];
	}
	get _index() {
		return Priority.priorityOrder().findIndex((item) => item === this._value);
	}
	equals(other) {
		return this._index === other._index;
	}
	higherThan(other) {
		return this._index > other._index;
	}
	lowerThan(other) {
		return this._index < other._index;
	}
	toString() {
		return this._value;
	}
}
