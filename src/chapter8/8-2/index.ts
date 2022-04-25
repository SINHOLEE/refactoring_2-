export default class Customer {
    private readonly _name: string
    private _discountRate: number
    private readonly _contract: CustomContract

    constructor(name: string, discountRate: number) {
        this._name = name
        this._discountRate = discountRate
        this._contract = new CustomContract(new Date())
    }

    get discountRate() {
        return this._discountRate
    }

    becomePreferred() {
        this._discountRate += 0.03
    }

    applyDiscount(amount: number) {
        return amount - (amount * this._discountRate)
    }
}

class CustomContract {
    private readonly startDate: Date

    constructor(startDate: Date) {
        this.startDate = startDate
    }
}

function main() {
    const c = new Customer('시니', 0.1)
    console.log(c.applyDiscount(100))
    c.becomePreferred()
    console.log(c.applyDiscount(100))
}

main()