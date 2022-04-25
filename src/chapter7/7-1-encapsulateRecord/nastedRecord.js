// let customerData;
let customerData = {
	1920: {
		name: "마틴 파울러",
		id: 1920,
		usages: {
			2016: {1: 50, 2: 55, 3: 52},
			2015: {1: 70, 2: 63, 3: 52},
		},
	},
	38673: {
		name: "닐 포드",
		id: 38673,
		usages: {
			2016: {1: 40, 2: 45, 3: 42},
			2015: {1: 50, 2: 53, 3: 62},
		},
	},
};

class CustomerData {
	constructor(data) {
		this._data = data;
	}
	setUsage(customerID, year, month, amount) {
		this._data[customerID].usages[year][month] = amount;
	}
	get rawData() {
		return JSON.parse(JSON.stringify(this._data));
	}
	usage(customerID, year, month) {
		return this._data[customerID].usages[year][month];
	}
}
export function getCustomerData() {
	return customerData;
}

export function getRawDataOfCustomers() {
	return customerData.rawData;
}

export const setRawDataOfCustomers = (args) => {
	customerData = new CustomerData(args);
};

export function compareUsage(customerID, laterYear, month) {
	const later = getCustomerData().usage(customerID, laterYear, month);
	const earlier = getCustomerData().usage(customerID, laterYear - 1, month);
	return {laterAmount: later, change: later - earlier};
}

setRawDataOfCustomers({
	1920: {
		name: "마틴 파울러",
		id: 1920,
		usages: {
			2016: {1: 50, 2: 55, 3: 52},
			2015: {1: 70, 2: 63, 3: 52},
		},
	},
	38673: {
		name: "닐 포드",
		id: 38673,
		usages: {
			2016: {1: 40, 2: 45, 3: 42},
			2015: {1: 50, 2: 53, 3: 62},
		},
	},
});

// 솔찍히 이해가 잘 안되는 파트.
