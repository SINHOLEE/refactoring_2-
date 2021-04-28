import { Province, sampleProvinceData } from './summary.js';

describe('privince asia -happy path', () => {
	let asia;
	beforeEach(() => {
		asia = new Province(sampleProvinceData());
	});
	it('부족분 계산', () => {
		expect(asia.shortfall).toBe(5);
	});
	it('수익계산', () => {
		expect(asia.profit).toEqual(230);
	});
	it('production 개수', () => {
		expect(asia.totalProduction).toBe(25);
	});
	it('change a production - shortfall', () => {
		asia.producers[0].production = 20;
		expect(asia.shortfall).toEqual(-6);
	});
	it('change a production - profit', () => {
		asia.producers[0].production = 20;
		expect(asia.profit).toEqual(292);
	});
});

describe('경계테스트- no producers(no colections)', () => {
	let noProducers;
	beforeEach(() => {
		const data = {
			name: 'no producers',
			producers: [],
			demand: 30,
			price: 20,
		};
		noProducers = new Province(data);
	});
	it('shortfall', () => {
		expect(noProducers.shortfall).toBe(30);
	});
	it('profit', () => {
		expect(noProducers.profit).toBe(0);
	});
});
describe('경계테스트- zero, nagatve, string demand', () => {
	let asia;
	beforeEach(() => {
		asia = new Province(sampleProvinceData());
	});
	it('zero demand - shortfall', () => {
		asia.demand = 0;
		expect(asia.shortfall).toBe(-25);
	});
	it('zero demand - profit', () => {
		asia.demand = 0;
		expect(asia.profit).toBe(0);
	});
	// demand가 음수거나, 숫자가 될 수 없으면 0으로 초기화 한다.
	it('-1 demand - shortfall', () => {
		asia.demand = -1;
		expect(asia.shortfall).toBe(-25);
	});
	it('-1 demand - profit', () => {
		asia.demand = -1;
		expect(asia.profit).toBe(0);
	});
	it('string demand "" - shortfall', () => {
		asia.demand = '';
		expect(asia.shortfall).toBe(-25);
	});
	it('string demand "" - profit', () => {
		asia.demand = '';
		expect(asia.profit).toBe(0);
	});
});

describe('string for producers', () => {
	it('말도 안되는 producers를 받을때는 빈 리스트로 저장한다.', () => {
		const data = {
			name: 'string producers',
			producers: '123',
			demand: 30,
			price: 20,
		};
		const stirngProducers = new Province(data);

		expect(stirngProducers.shortfall).toBe(30);
	});
});
