import invoices from "../invoices.js";
import plays from "../plays.js";
import createStatementData from "../videoStore/model/createStatementData.js";
import {statement} from "../videoStore/view/statement.js";
import assert from "assert";

console.log("test", {result: statement(invoices[0], plays)});
// view
assert.equal(
	statement(invoices[0], plays),
	`청구 내역 (고객명:Bigco)
  Hamlet: $650.00 (55석)
  As You Like It: $580.00 (35석)
  Othello: $500.00 (40석)
총액: $1,730.00
적립포인트: 47\n`,
);
