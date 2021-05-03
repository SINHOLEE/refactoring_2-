import {Order} from "./index.js";

describe("주문 클래스", () => {
	let order;
	beforeEach(() => {
		order = new Order(30, {price: 50});
	});

	it("price over 1000", () => {
		expect(order.price).toBe(1500 * 0.95);
	});
	it("price less than 1000", () => {
		const newOrder = new Order(20, {price: 40});
		expect(newOrder.price).toBe(800 * 0.98);
	});
});
