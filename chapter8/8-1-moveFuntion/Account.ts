import AccountType from "./AccountType";

export default class Account {
    private readonly _daysOverdrawn: number
    private readonly type: { isPremium: boolean }
    private readonly accountType:AccountType

    constructor(daysOverdrawn: number, type,accountType:AccountType) {
        this._daysOverdrawn = daysOverdrawn
        this.type = type
        this.accountType = accountType
    }

    get bankCharge(): number {
        let res = 4.5;
        if (this._daysOverdrawn > 0) {
            return res + this.accountType.overdraftCharge(this._daysOverdrawn)
        }
        return res
    }
}