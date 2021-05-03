// 모듈성을 얼마나 잘 구성하느냐가 좋은 소프트웨어의 평가요소이다.
// 어떤함수가 자신이 속한 모듈 a의 요소들보다 다른 모듈 b의 요소를 더 많이 참조한다면 b로 옮기는것이 마땅하다.

// points = number[]

// 원하는 일: calculateDistance를 상위 스코프로 옮겨 독립적으로 계산하고자 한다.
function totalDistance(points) {
	let result = 0;
	for (let i = 1; i < points.length; i++) {
		result += distance(points[i - 1], points[i]);
	}
	return result;
}
function distance(p1, p2) {
	return Math.abs(p1 - p2);
}

// 초
function calculateTime(points) {
	return points.length * 3600;
}
export function trackSummary(points) {
	const totalTime = calculateTime(points);
	const pace = totalTime / 60 / totalDistance(points);
	return {
		time: totalTime,
		distance: totalDistance(points),
		pace,
	};
}
