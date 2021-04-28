function renderPlainText(data, plays) {
	let result = `청구 내역 (고객명:${data.customer})\n`;
	for (let performance of data.performances) {
		result += `  ${performance.play.name}: ${usd(performance.amount)} (${
			performance.audience
		}석)\n`;
	}

	result += `총액: ${usd(data.totalAmount)}\n`;
	result += `적립포인트: ${data.totalVolumeCredits}\n`;
	return result;

	// 중간점검: 구조는 한결 깔끔해 졌지만 중첩함수가 난무한다.
	// 임시변수 지우기의 효과 1
	function usd(aNumber) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
		}).format(aNumber / 100);
	}
}

assert.equal(
	statement(invoices[0], plays),
	`청구 내역 (고객명:Bigco)
  Hamlet: $650.00 (55석)
  As You Like It: $580.00 (35석)
  Othello: $500.00 (40석)
총액: $1,730.00
적립포인트: 47\n`
);
// console.log(statement(invoices[0], plays));
