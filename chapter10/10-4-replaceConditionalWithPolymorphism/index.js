const dummy_birds = [
	{
		name: "유젭",
		type: "유럽 제비",
	},
	{
		name: "아제 1",
		type: "아프리카 제비",
		numberOfCoconuts: 1,
	},
	{
		name: "아제 10",
		type: "아프리카 제비",
		numberOfCoconuts: 10,
	},
	{
		name: "노파앵 20 true",
		type: "노르웨이 파랑 앵무",
		isNailed: true,
		voltage: 20,
	},
	{
		name: "노파앵 20 false",
		type: "노르웨이 파랑 앵무",
		isNailed: false,
		voltage: 20,
	},
	{
		name: "노파앵 110 false",
		type: "노르웨이 파랑 앵무",
		isNailed: false,
		voltage: 110,
	},
	{
		name: "노파앵 110 true",
		type: "노르웨이 파랑 앵무",
		isNailed: true,
		voltage: 110,
	},
	{
		name: "몰라새",
		type: "몰라타입",
		numberOfCoconuts: 1,
		isNailed: true,
		voltage: 110,
	},
];

function plumages(birds) {
	return new Map(birds.map((b) => createBird(b)).map((b) => [b.name, b.plumage]));
}
function speeds(birds) {
	return new Map(birds.map((b) => createBird(b)).map((b) => [b.name, b.airSpeedVelocity]));
}

// 1 추상화된 슈퍼클래스를 하나 만들어 놓는다.
class Bird {
	constructor(birdObject) {
		Object.assign(this, birdObject);
	}
	get plumage() {
		return "알 수 없다";
	}
	get airSpeedVelocity() {
		return null;
	}
}

class EuropeanSwallow extends Bird {
	get plumage() {
		return "보통이다";
	}
	get airSpeedVelocity() {
		return 35;
	}
}
class AfricaSwallow extends Bird {
	get plumage() {
		return this.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
	}
	get airSpeedVelocity() {
		return 40 - 2 * this.numberOfCoconuts;
	}
}
class NorwegianBlueParrot extends Bird {
	get plumage() {
		return this.voltage > 100 ? "그을렸다" : "예쁘다";
	}
	get airSpeedVelocity() {
		return this.isNailed ? 0 : 10 + this.voltage / 10;
	}
}
// 2. 적합한 서브클래스의 인스턴스를 만들어 줄 팩토리 함수를 만든다.
function createBird(bird) {
	switch (bird.type) {
		case "유럽 제비":
			return new EuropeanSwallow(bird);

		case "아프리카 제비":
			return new AfricaSwallow(bird);

		case "노르웨이 파랑 앵무":
			return new NorwegianBlueParrot(bird);
		default:
			return new Bird(bird);
	}
}
export default {
	dummy_birds,
	speeds,
	plumages,
};
