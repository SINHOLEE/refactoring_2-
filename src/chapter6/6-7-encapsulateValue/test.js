import assert from "assert";
import {defaultOwner1, setDefaultOwner1} from "./encapsulate1.js";
import {defaultOwner2, setDefaultOwner2} from "./encapsulate2.js";
import {defaultOwner3, setDefaultOwner3} from "./encapsulate3.js";

// encapsulate1
{
	const onwer1 = defaultOwner1();
	assert.equal(onwer1.lastName, "이", "성이 이가 맞는가?");
	assert.equal(onwer1.firstName, "신호", "이름이 신호가 맞는가?");

	// 전역데이터를 완전히 바꿔버림
	setDefaultOwner1({firstName: "미니", lastName: "박"});
	const onwer2 = defaultOwner1();
	assert.equal(onwer2.lastName, "박", "성을 박으로 바꾼게 맞는가??");
	assert.equal(onwer2.firstName, "미니", "이름이 미니로 바꾼게 맞는가?");

	// 바뀐상태에서는 이 신호가 아니라 박 미니이다.
	const onwer3 = defaultOwner1();
	onwer3.lastName = "강";
	assert.equal(onwer3.lastName, "강", "성이 강이 맞는가?"); // 헐 변경 가능함 문제있다.
	assert.equal(onwer3.firstName, "미니", "이름이 미니가 맞는가?");

	const onwer4 = defaultOwner1();
	// assin으로 복제했기때문에 owner3에서만 property가 바뀌고 전역 데이터는 변경사항이 없다.
	assert.equal(
		onwer4.lastName,
		"강",
		"새로운객체를 생성했지만 onwer3에서 강으로 바꾼 여파가 남아있다.",
	);
}
// encapsulate2
{
	const onwer1 = defaultOwner2();
	assert.equal(onwer1.lastName, "이", "성이 이가 맞는가?");
	assert.equal(onwer1.firstName, "신호", "이름이 신호가 맞는가?");

	// 전역데이터를 완전히 바꿔버림
	setDefaultOwner2({firstName: "미니", lastName: "박"});
	const onwer2 = defaultOwner2();
	assert.equal(onwer2.lastName, "박", "성을 박으로 바꾼게 맞는가??");
	assert.equal(onwer2.firstName, "미니", "이름이 미니로 바꾼게 맞는가?");

	// 바뀐상태에서는 이 신호가 아니라 박 미니이다.
	const onwer3 = defaultOwner2();
	onwer3.lastName = "강";
	assert.equal(onwer3.lastName, "강", "성이 강이 맞는가?"); // 헐 변경 가능함 문제있다.
	assert.equal(onwer3.firstName, "미니", "이름이 미니가 맞는가?");

	const onwer4 = defaultOwner2();
	// assin으로 복제했기때문에 owner3에서만 property가 바뀌고 전역 데이터는 변경사항이 없다.
	assert.equal(
		onwer4.lastName,
		"박",
		"새로운객체를 생성했지만 onwer3에서 강으로 바꾼 여파가 남아있지 않다.",
	);
}
// encapsulate3
{
	const onwer1 = defaultOwner3();
	assert.equal(onwer1.lastName, "이", "성이 이가 맞는가?");
	assert.equal(onwer1.firstName, "신호", "이름이 신호가 맞는가?");

	// 전역데이터를 완전히 바꿔버림
	setDefaultOwner3({firstName: "미니", lastName: "박"});
	const onwer2 = defaultOwner3();
	assert.equal(onwer2.lastName, "박", "성을 박으로 바꾼게 맞는가??");
	assert.equal(onwer2.firstName, "미니", "이름이 미니로 바꾼게 맞는가?");

	// 바뀐상태에서는 이 신호가 아니라 박 미니이다.
	const onwer3 = defaultOwner3();

	assert.throws(() => {
		//강이라고 바꾸려하지만 타입에러를 뿜는다.
		onwer3.lastName = "강";
	});
	assert.equal(onwer3.lastName, "박", "성이 박이 맞는가?");
	assert.equal(onwer3.firstName, "미니", "이름이 미니가 맞는가?");

	const onwer4 = defaultOwner3();
	// person객체를 정의해서 캡슐화했기때문에 문제없다.
	assert.equal(
		onwer4.lastName,
		"박",
		"새로운객체를 생성했지만 onwer3에서 강으로 바꾼 여파가 남아있지 않다.",
	);
}
