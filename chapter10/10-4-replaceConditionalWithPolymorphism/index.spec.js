import birdAPI from "./index.js";

describe("회귀테스트", () => {
	it("깃털상태", () => {
		expect(birdAPI.plumages(birdAPI.dummy_birds)).toEqual(
			new Map([
				["유젭", "보통이다"],
				["아제 1", "보통이다"],
				["아제 10", "지쳤다"],
				["노파앵 20 true", "예쁘다"],
				["노파앵 20 false", "예쁘다"],
				["노파앵 110 false", "그을렸다"],
				["노파앵 110 true", "그을렸다"],
				["몰라새", "알 수 없다"],
			]),
		);
	});
	it("속도", () => {
		expect(birdAPI.speeds(birdAPI.dummy_birds)).toEqual(
			new Map([
				["유젭", 35],
				["아제 1", 38],
				["아제 10", 20],
				["노파앵 20 true", 0],
				["노파앵 20 false", 12],
				["노파앵 110 false", 21],
				["노파앵 110 true", 0],
				["몰라새", null],
			]),
		);
	});
});
