import {baseRate, deepCopy, taxThreshold} from "./utils";

export function enrichReading(aReaing) {
	let copiedReading = deepCopy(aReaing);
	copiedReading.baseCharge = calculateBaseCharge(copiedReading);
	copiedReading.taxableCharge = calculateTaxableCharge(copiedReading);
	function calculateTaxableCharge(aReading) {
		return Math.max(0, calculateBaseCharge(aReading) - taxThreshold(aReading.year));
	}
	function calculateBaseCharge(aReading) {
		return baseRate(aReading.month, aReading.year) * aReading.quantity;
	}
	return copiedReading;
}
