import Customer from "../index";

describe('test', () => {
    it('기본 가격', () => {

        const c = new Customer('시니', 0.1)
        expect(c.applyDiscount(100)).toEqual(90)
        c.becomePreferred()
        expect(c.applyDiscount(100)).toEqual(87)

    })
})
