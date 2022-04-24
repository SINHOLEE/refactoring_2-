type MembershipType = 'premium'|'normal'

export default class AccountType {
    private readonly BASE_CHARGE:number
    private readonly type:MembershipType
    constructor(type:MembershipType) {
        this.type = type;
        this.BASE_CHARGE = 10;
    }
    overdraftCharge(daysOverdrawn:number) {
        if (this.type === 'premium') {
            const baseCharge = 10;
            if (daysOverdrawn <= 7) {
                return baseCharge
            }
            return baseCharge + (daysOverdrawn - 7) * 0.85
        }
        return daysOverdrawn * 1.75
    }
}