import invoices from "../../invoices.js";
import plays from "../../plays.js";
import createStatementData from "../model/createStatementData.js";

// view
export function statement(invoice, plays) {
	return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
	let result = `청구 내역 (고객명:${data.customer})\n`;
	result += data.performances.reduce(
		(s, performance) =>
			s + `  ${performance.play.name}: ${usd(performance.amount)} (${performance.audience}석)\n`,
		"",
	);

	result += `총액: ${usd(data.totalAmount)}\n`;
	result += `적립포인트: ${data.totalVolumeCredits}\n`;
	return result;
}
function htmlStatement(invoice, plays) {
	return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
	let result = `<h2>청구 내역 (고객명:${data.customer})</h2>\n`;
	result += `<table>\n`;
	result += "<tr><td>연극</td><td>좌석수</td><td>금액</td></tr>";
	result += data.performances.reduce(
		(s, performance) =>
			s +
			`<tr><td>${performance.play.name}</td><td>${performance.audience}석</td><td>${usd(
				performance.amount,
			)}</td></tr>\n`,
		"",
	);

	result += `</table>\n`;
	result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
	result += `<p>적립포인트: <em>${data.totalVolumeCredits}</em></p>\n`;
	return result;
}

function usd(aNumber) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format(aNumber / 100);
}

export const html = htmlStatement(invoices[0], plays);
