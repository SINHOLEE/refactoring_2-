import renderPerson from "./renderPerson";

describe('renderPerson', () => {
    it('실행', () => {
        const now = new Date()
        const renderedPerson = renderPerson({name: 'siny', photo: {location: '수원', date: now, title: '사진 title'}})
        expect(renderedPerson).toEqual([
        '<p>siny</p>',
        '<div>',
        '<p>제목: 사진 title</p>',
        '<p>위치 : 수원</p>',
        '<p>날짜 : Mon Apr 25 2022</p>',
        '</div>',
        '<p>제목: 사진 title</p>',
        '<p>위치 : 수원</p>',
        '<p>날짜 : Mon Apr 25 2022</p>'].join('\n')
    )
    })
})