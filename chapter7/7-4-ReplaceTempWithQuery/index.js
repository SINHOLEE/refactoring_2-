// 임시변수를 질의함수로 바꾸므로서 얻는 잇점
// 1. 함수의 구조적 중복을 발견할 수 있고, 결합도를 낮출 힌트를 얻일 수 있다. 즉 부자연스러운 의존관계나부수효과를 찾을 수 있다.

export class Order {
	constructor(quantity, item) {
		this._quantity = quantity;
		this._item = item;
	}

	get basePrice() {
		return this._quantity * this._item.price;
	}

	get discountFactor() {
		let discountFactor = 0.98;
		// 만약 가격이 1000원보다 높으면 할인을 3프로 더 해준다.
		if (this.basePrice > 1000) discountFactor -= 0.03;
		return discountFactor;
	}

	get price() {
		return this.discountFactor * this.basePrice;
	}
}
