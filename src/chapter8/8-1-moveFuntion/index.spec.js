import {trackSummary} from "./index.js";

describe("함수 옮기기", () => {
	let points;
	beforeEach(() => {
		points = [2, 4, 1, 2, 5, 13, 11];
	});

	it("이동거리 요약", () => {
		const res = trackSummary(points);
		expect(res).toEqual({
			distance: 19,
			pace: 22.105263157894736,
			time: 25200,
		});
	});
});
