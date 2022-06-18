import invoices from "../../videoStore/invoices.js";
import plays from "../../videoStore/plays.js";
import createStatementData from "../../videoStore/model/createStatementData.js";

describe("init test", () => {
	it("1,2중 큰값은 2이다.", () => {
		expect(Math.max(1, 2)).toBe(2);
	});
	it("스냅샷 확인", () => {
		expect(createStatementData(invoices[0], plays)).toEqual({
			customer: "Bigco",
			performances: [
				{
					playID: "hamlet",
					audience: 55,
					play: {name: "Hamlet", type: "tragedy"},
					amount: 65000,
					volumeCredits: 25,
				},
				{
					playID: "as-like",
					audience: 35,
					play: {name: "As You Like It", type: "comedy"},
					amount: 58000,
					volumeCredits: 12,
				},
				{
					playID: "othello",
					audience: 40,
					play: {name: "Othello", type: "tragedy"},
					amount: 50000,
					volumeCredits: 10,
				},
			],
			totalAmount: 173000,
			totalVolumeCredits: 47,
		});
	});
});
