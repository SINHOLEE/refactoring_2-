"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountType {
    BASE_CHARGE;
    type;
    constructor(type) {
        this.type = type;
        this.BASE_CHARGE = 10;
    }
    overdraftCharge(daysOverdrawn) {
        if (this.type === 'premium') {
            const baseCharge = 10;
            if (daysOverdrawn <= 7) {
                return baseCharge;
            }
            return baseCharge + (daysOverdrawn - 7) * 0.85;
        }
        return daysOverdrawn * 1.75;
    }
}
exports.default = AccountType;
