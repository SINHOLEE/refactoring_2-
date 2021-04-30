// 레코드 데이터(js의 object 구조체)의 단점
// 계산해서 얻을 수 있는 값과 그렇지 않은 값을 명확하게 구분해야한다는 점
// 클래스형으로 캡슐화하여 객체(인스턴스로) 데이터를 사용한다면 이러한 단점을 극복할 수 있다.
// 즉 어떤 데이터를 저장했는지 사용자는 모른 채 인터페이스로 노출된 정보에 접근할 수 있다 -> 즉 안전하다.
// 또한 이름을 바꿔도 기존 이름과 새이름 모두를 각각의 메서드로 제공할 수 있어 사용자 입장에서 점진적으로 수정할 수 있는 여지를 준다.
// 만약 레코드로 사용할 경우 값의 이름을 바꾼다면 해당데이터를 사용하는 모든 공간에서 다 바꿔야 하기때문에 한 큐에 바꿔야한다.

class Organization {
	constructor(data) {
		// 이런식으로 데이터를 펼쳐주면 데이터 레코드와의 연결을 끊어준다는 장점이 있다.
		// 연결을 끊는다는 것은 결국 해당 데이터를 참조하는 구간에서 변경사항이 발생하고 이로인해 캡슐화가 깨질 경우에 안전장치가 될 수 있다.
		// (레코드의 변경없이 해당 인스턴스에서만 변경사항 반영)
		this._name = data.name;
		this._country = data.country;
	}
	set name(aString) {
		this._name = aString;
	}
	get name() {
		return this._name;
	}
	set country(aString) {
		this._country = aString;
	}
	get country() {
		return this._country;
	}
}

const organization = new Organization({
	name: "애크미 구스베리",
	country: "GB",
});
//1 캡슐화하기
export function getOrganization() {
	return organization;
}
