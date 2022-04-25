// 캡슐화는 필드를 숨기는 목적 외에 다양한 이유로 인해 중요하다.
// 캡슐화가 잘 되어 있다면 변경사항에 있어 알아야할 모듈의 규모가 작아지므로 쉽게 변경할 수 있다.
// 클라이언트가 호출하려는 메서드가 a객체의 필드가 바라보는 b객체(위임객체)의 메서드일 경우,
// 클라이언트는 b객체에 대한 정보가 필요하다. 이러한 의존성이 깊어지면 복잡한 의존성관계가 있다면 호출하는것은 물론 수정하기에도 불편하다.
// 이러한 의존성 관계를 끊기 위해서 b객체에서 호출할 수 있은 위임메서드를 생성하여 b의 메서드를 쉽게 호출할 수 있도록 관리한다.
// 이렇게 관리하면 b라는 객체를 클라이언트 입장에서는 몰라도 사용할 수 있고, b객체가 변경되었어도 a객체를 관리하는 코드만 수정하면 되기때문에 클라이언트 코드는 변경할 필요 없다.

/**
 * 1. 위임 객체의 각 메서드에 해당하는 위임 메서드를 클라이언트가 바라보는 상위 객체에 생성한다.
 * 2. 클라이언트가 위임객체 대신 상위객체의 위임메서드를 호출하도록 수정한다. 하나씩 바꿀때마다 테스트 한다.
 * 3. 모두 수정했다면 클라이언트가 상위객체의 위임객체에 접근할 수 있는 접근자를 제거한다.
 */

// 목표: 클라이언트단에서는 person만 알고 있으므로 department의 매니저를 불러오는 위임 메서드를 생성한다.
export class Person {
	constructor(name) {
		this._name = name;
		this.department = new DepartMent();
	}
	get name() {
		return this._name;
	}
	set department(arg) {
		this._department = arg;
	}
	get manager() {
		return this._department.manager;
	}
}

class DepartMent {
	constructor(chargeCode = 30, manager = "sinho") {
		this.chargeCode = chargeCode;
		this.manager = manager;
	}
	get chargeCode() {
		return this._chargeCode;
	}
	set chargeCode(arg) {
		this._chargeCode = arg;
	}
	get manager() {
		return this._manager;
	}
	set manager(arg) {
		this._manager = arg;
	}
}
