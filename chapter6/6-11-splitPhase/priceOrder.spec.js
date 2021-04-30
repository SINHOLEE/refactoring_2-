// origin codes

const dummyProduct = {
	name: "apple",
	productID: "uuid1",
	basePrice: 100,
	discountThreshold: 30, // 개
	discountRate: 0.1, // 10%
};

const dummyShippingMethod = {
	discountThreshold: 20, // 개
	discountedFee: 2,
	feePerCase: 3,
};

// 기본 가격에서 할인 가격을 빼고,운송비를 더해서 최종 가격을 도출한다.
function priceOrder(product, quantity, shippingMethod) {
	// validators 이건 quantity 받을때 이미 수행되었어야하는 로직이라고 생각함 그러니 생략
	if (quantity <= 0) {
		return 0;
	}
	if (typeof quantity !== "number") {
		throw new Error("quantity is not number type");
	}
	const basePrice = product.basePrice * quantity;

	// 할인정책: 최소할인가능 수량을 넘어가게 주문한다면  (허들 초과분 * 상품의 기본가격) * 상품의 할인율로 총 할인금액을 구한다.
	const discount =
		Math.max(quantity - product.discountThreshold, 0) *
		product.basePrice *
		product.discountRate;

	// 운송비용: 개당 상품의 가격이 무료배송가격보다 크다면 할인된 운송비를 청구하고 그렇지 않으면 기본 비용으로 청구한다.
	const shippingPerCase =
		basePrice > shippingMethod.discountThreshold
			? shippingMethod.discountedFee
			: shippingMethod.feePerCase;
	const shippingCost = shippingPerCase * quantity;

	const price = basePrice - discount + shippingCost;
	return price;
}

describe("price Order", () => {
	it("happy plan - quntity = 40", () => {
		const price = priceOrder(dummyProduct, 40, dummyShippingMethod);
		expect(price).toBe(3980);
	});
	it("happy plan - quntity = 0", () => {
		const price = priceOrder(dummyProduct, 0, dummyShippingMethod);
		expect(price).toBe(0);
	});
	it("happy plan - quntity is not number type", () => {
		expect(() => {
			const price = priceOrder(dummyProduct, "asd", dummyShippingMethod);
		}).toThrow();
	});
	it("happy plan - quntity = -10", () => {
		const price = priceOrder(dummyProduct, -10, dummyShippingMethod);
		expect(price).toBe(0);
	});
	it("happy plan - quntity = 10", () => {
		const price = priceOrder(dummyProduct, 10, dummyShippingMethod);
		expect(price).toBe(1020);
	});
	it("happy plan - quntity = 20", () => {
		const price = priceOrder(dummyProduct, 20, dummyShippingMethod);
		expect(price).toBe(2040);
	});
	it("happy plan - quntity = 30", () => {
		const price = priceOrder(dummyProduct, 30, dummyShippingMethod);
		expect(price).toBe(3060);
	});
	it("happy plan - quntity = 40", () => {
		const price = priceOrder(dummyProduct, 40, dummyShippingMethod);
		expect(price).toBe(3980);
	});
});
