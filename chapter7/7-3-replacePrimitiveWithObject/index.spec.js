import {Order, Priority} from "./index.js";

describe("priority class", () => {
	it("우선순위 외의 priority 객체 생성하면 에러반환", () => {
		expect(() => {
			const p = new Priority("null");
		}).toThrowError();
	});
});
describe("주문", () => {
	let orders;
	beforeEach(() => {
		orders = [
			{priority: "high"},
			{priority: "rush"},
			{priority: "high"},
			{priority: "rush"},
			{priority: "low"},
			{priority: "low"},
		].map((o) => new Order(o));
	});
	it("우선순위 주문 개수", () => {
		const highPriorityCount = orders.filter((o) =>
			o.priority.higherThan(new Priority("normal")),
		).length;
		expect(highPriorityCount).toBe(4);
	});
});
describe("주문 생성할 때 priority 객체로 받기", () => {
	let orders;
	beforeEach(() => {
		orders = [
			{priority: "high"},
			{priority: "rush"},
			{priority: "high"},
			{priority: "rush"},
			{priority: "low"},
			{priority: "low"},
		].map((o) => new Order({priority: new Priority(o.priority)}));
	});
	it("우선순위 주문 개수 normal보다 높은건 4개", () => {
		const highPriorityCount = orders.filter((o) =>
			o.priority.higherThan(new Priority("normal")),
		).length;
		expect(highPriorityCount).toBe(4);
	});
});
