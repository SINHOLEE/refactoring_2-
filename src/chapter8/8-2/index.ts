// 변경 목적
// discountRate를 구하는 로직을 coustomContract 클래스 내부로 옮기려고 한다.

export default class Customer {
    private readonly _name: string
    private readonly _contract: CustomContract

    constructor(name: string, discountRate: number) {
        this._name = name
        this._contract = new CustomContract(new Date(),discountRate)
    }

    get discountRate() {
        return this._contract.discountRate
    }

    private _setDiscountRate(aNumber:number){
       this._contract.discountRate = aNumber
    }
    becomePreferred() {
        this._setDiscountRate(this.discountRate + 0.03)

    }

    applyDiscount(amount: number) {
        return amount - (amount * this.discountRate)
    }
}


class CustomContract {
    private readonly startDate: Date
    private _discountRate:number
    constructor(startDate: Date,discountRate:number) {
        this.startDate = startDate
        this._discountRate = discountRate
    }
    get discountRate(){
        return this._discountRate
    }
    set discountRate(aNum){
        this._discountRate = aNum
    }
}

