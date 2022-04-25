import {reading} from "./readingData.js";

export function baseRate(aMonth, aYear) {
	// 어떤 계산식
	const rates = [10, 15, 13, 14, 11, 12, 13, 14, 11, 12, 13, 14];
	const rateIndex = (aMonth + aYear) % rates.length;
	return rates[rateIndex] / 100;
}

export function taxThreshold(aYear) {
	return 0.3;
}

export function deepCopy(value) {
	return JSON.parse(JSON.stringify(value));
}
export function acquireReading() {
	return Object.assign({}, reading);
}
