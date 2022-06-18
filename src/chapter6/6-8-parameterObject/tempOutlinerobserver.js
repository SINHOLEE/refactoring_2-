import assert from "assert";

const station = {
	name: "ZB1",
	readings: [
		{temp: 47, time: "2016-11-10 09:10"},
		{temp: 53, time: "2016-11-10 09:20"},
		{temp: 58, time: "2016-11-10 09:30"},
		{temp: 53, time: "2016-11-10 09:40"},
		{temp: 51, time: "2016-11-10 09:50"},
	],
};

//1
function readingsOutsideRange(station, range) {
	return station.readings.filter((r) => !range.contains(r.temp));
}
class NumberRange {
	constructor(min, max) {
		this._data = {min, max};
	}
	get min() {
		return this._data.min;
	}
	get max() {
		return this._data.max;
	}
	contains = (arg) => {
		return this._data.min <= arg && arg <= this._data.max;
	};
}

class OperationgPlan {
	constructor() {
		this._temperatureRange = null;
	}
	setTemperatureRange(arg) {
		this._temperatureRange = arg;
	}
	temperatureRange() {
		if (this._temperatureRange === null) {
			throw new Error("온도범위를 먼저 설정해주세요.");
		}
		if (this._temperatureRange instanceof NumberRange) {
			return this._temperatureRange;
		}
		throw new Error("NumberRange 인스턴스가 아닙니다.");
	}
}
const iOerationPlan = new OperationgPlan();
const numberRange = iOerationPlan.setTemperatureRange(new NumberRange(51, 57));

//2

const alerts = readingsOutsideRange(station, iOerationPlan.temperatureRange());
assert.deepStrictEqual(alerts, [
	{temp: 47, time: "2016-11-10 09:10"},
	{temp: 58, time: "2016-11-10 09:30"},
]);
