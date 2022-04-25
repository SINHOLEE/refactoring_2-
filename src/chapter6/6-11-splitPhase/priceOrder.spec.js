// origin codes

function priceOrder(product, quantity, shippingMethod) {
	const priceData = calculatePriceData(product, quantity);
	return applyShippingPrice(priceData, shippingMethod);

	function calculatePriceData(product, quantity) {
		const basePrice = product.basePrice * quantity;

		// 할인정책: 최소할인가능 수량을 넘어가게 주문한다면  (허들 초과분 * 상품의 기본가격) * 상품의 할인율로 총 할인금액을 구한다.
		const discount =
			Math.max(quantity - product.discountThreshold, 0) *
			product.basePrice *
			product.discountRate;
		return {
			basePrice,
			discount,
			quantity,
		};
	}

	function applyShippingPrice(priceData, shippingMethod) {
		const shippingPerCase =
			priceData.basePrice > shippingMethod.discountThreshold
				? shippingMethod.discountedFee
				: shippingMethod.feePerCase;
		// 운송비용: 개당 상품의 가격이 무료배송가격보다 크다면 할인된 운송비를 청구하고 그렇지 않으면 기본 비용으로 청구한다.
		const shippingCost = shippingPerCase * priceData.quantity;
		// 기본 가격에서 할인 가격을 빼고,운송비를 더해서 최종 가격을 도출한다.
		return priceData.basePrice - priceData.discount + shippingCost;
	}
}
describe("price Order", () => {
	let dummyProduct;
	let dummyShippingMethod;
	beforeEach(() => {
		dummyProduct = {
			name: "apple",
			productID: "uuid1",
			basePrice: 100,
			discountThreshold: 30, // 개
			discountRate: 0.1, // 10%
		};

		dummyShippingMethod = {
			discountThreshold: 20, // 개
			discountedFee: 2,
			feePerCase: 3,
		};
	});

	it("happy plan - quntity = 0", () => {
		const price = priceOrder(dummyProduct, 0, dummyShippingMethod);
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
});
