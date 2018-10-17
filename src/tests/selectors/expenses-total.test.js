import getExpensesTotal from '../../selectors/expenses-total'
import testData from '../fixtures/expenses';


test("test", () => {
	const total = getExpensesTotal(testData);
	expect(total).toBe(114195);
});

test("testEmpty", () => {
	const total = getExpensesTotal([]);
	expect(total).toBe(0);
});

test("testSingleValue", () => {
	const total = getExpensesTotal([testData[0]]);
	expect(total).toBe(195);
});