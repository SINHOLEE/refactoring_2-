const priceList = {
	uuid1: 7,
	uuid2: 12,
	uuid3: 4,
};

describe("order price", () => {
	it("happy plan", () => {
		const orderString = "apple-uuid1 40";

		const orderData = orderString.split(/\s+/);
		const productPrice = priceList[orderData[0].split("-")[1]];
		const orderPrice = parseInt(orderData[1]) * productPrice;
		expect(orderPrice).toBe(280);
	});
	it("refactoring test", () => {
		const orderString = "apple-uuid1 40";
		const data = parseData(orderString);
		const orderPrice = price(data, priceList);

		expect(orderPrice).toBe(280);
	});
});

function parseData(aOrderString) {
	const orderData = aOrderString.split(/\s+/);
	return {
		productID: orderData[0].split("-")[1],
		productQuantity: parseInt(orderData[1]),
	};
}

function price(data, priceList) {
	return priceList[data.productID] * data.productQuantity;
}
