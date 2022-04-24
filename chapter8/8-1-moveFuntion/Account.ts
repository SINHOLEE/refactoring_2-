class Account {
    private readonly _daysOverdrawn: number
    private readonly type: { isPremium: boolean }

    constructor(daysOverdrawn: number, type) {
        this._daysOverdrawn = daysOverdrawn
        this.type = type
    }

    get bankCharge(): number {
        let res = 4.5;
        if (this._daysOverdrawn > 0) {
            return res + this.overdraftCharge
        }
        return res
    }

    get overdraftCharge() {
        if (this.type.isPremium) {
            const baseCharge = 10;
            if (this._daysOverdrawn <= 7) {
                return baseCharge
            }
            return baseCharge + (this._daysOverdrawn - 7) * 0.85
        }
        return this._daysOverdrawn * 1.75
    }

}