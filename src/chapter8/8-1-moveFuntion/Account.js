"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Account {
    _daysOverdrawn;
    type;
    accountType;
    constructor(daysOverdrawn, type, accountType) {
        this._daysOverdrawn = daysOverdrawn;
        this.type = type;
        this.accountType = accountType;
    }
    get bankCharge() {
        let res = 4.5;
        if (this._daysOverdrawn > 0) {
            return res + this.accountType.overdraftCharge(this._daysOverdrawn);
        }
        return res;
    }
}
exports.default = Account;
