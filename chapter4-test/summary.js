export function sampleProvinceData() {
	return {
		name: 'Asia',
		producers: [
			{ name: 'Byzantium', cost: 10, production: 9 },
			{ name: 'Attalia', cost: 12, production: 10 },
			{ name: 'Sinope', cost: 10, production: 6 },
		],
		demand: 30,
		price: 20,
	};
}

export class Province {
	constructor(doc) {
		this._name = doc.name;
		this._producers = [];
		this._totalProduction = 0;
		this._demand = doc.demand;
		this._price = doc.price;
		Array.isArray(doc.producers)
			? doc.producers.forEach((d) => this.addProducer(new Producer(this, d)))
			: [];
	}
	get shortfall() {
		return this._demand - this._totalProduction;
	}

	get profit() {
		return this.demandValue - this.demandCost;
	}

	get demandValue() {
		return this.satisfiedDemand * this.price;
	}
	get satisfiedDemand() {
		return Math.min(this.totalProduction, this.demand);
	}

	get demandCost() {
		let remainingDemand = this.demand;
		let totalCost = 0;
		this.producers
			.sort((a, b) => a.cost - b.cost)
			.forEach((p) => {
				const contribution = Math.min(remainingDemand, p.production);
				remainingDemand -= contribution;
				totalCost += contribution * p.cost;
				// p.production = p.production-cheapestCostProductions
			});
		return totalCost;
	}

	addProducer(arg) {
		this._producers.push(arg);
		this._totalProduction += arg.production;
	}
	get name() {
		return this._name;
	}
	get producers() {
		return this._producers.slice();
	}
	get totalProduction() {
		return this._totalProduction;
	}
	set totalProduction(arg) {
		this._totalProduction = arg;
	}
	get demand() {
		return this._demand;
	}
	set demand(arg) {
		const demandValue = parseInt(arg);
		if (Number.isNaN(demandValue) || demandValue < 0) {
			this._demand = 0;
			return;
		}
		this._demand = demandValue;
	}
	get price() {
		return this._price;
	}
	set price(arg) {
		this._price = parseInt(arg);
	}
}

class Producer {
	constructor(aProvince, data) {
		this._province = aProvince;
		this._cost = data.cost;
		this._name = data.name;
		this._production = data.production || 0;
	}

	get name() {
		return this._name;
	}
	get cost() {
		return this._cost;
	}
	set cost(arg) {
		this._cost = parseInt(arg);
	}
	get production() {
		return this._production;
	}
	set production(amountStr) {
		const amount = parseInt(amountStr);
		const newProduction = Number.isNaN(amount) ? 0 : amount;
		this._province.totalProduction += newProduction - this._production;
		this._production = newProduction;
	}
}
