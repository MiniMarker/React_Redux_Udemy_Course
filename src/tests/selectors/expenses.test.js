import selectedExpenses from '../../selectors/expenses'
import moment from 'moment';
import testData from '../fixtures/expenses';

test("FilterByTextValueTest", () => {

	const filters = {
		text: "e",
		sortBy: 'date',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectedExpenses(testData, filters);

	expect(result.length).toBe(2);
	expect(result).toEqual([ testData[2], testData[1]]);
});

test("FilterByStartDateTest", () => {

	const filters = {
		text: "",
		sortBy: 'date',
		startDate: moment(0),
		endDate: undefined
	};

	const result = selectedExpenses(testData, filters);

	expect(result.length).toBe(2);
	expect(result).toEqual([ testData[2], testData[0]]);
});

test("FilterByEndDateTest", () => {

	const filters = {
		text: "",
		sortBy: 'date',
		startDate: undefined,
		endDate: moment(0).add(2, 'days')
	};

	const result = selectedExpenses(testData, filters);

	expect(result.length).toBe(2);
	expect(result).toEqual([ testData[0], testData[1]]);

});

test("SortByDateTest", () => {

	const filters = {
		text: "",
		sortBy: 'date',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectedExpenses(testData, filters);

	expect(result.length).toBe(3);
	expect(result).toEqual([testData[2], testData[0], testData[1]])

});

test("SortByAmountTest", () => {

	const filters = {
		text: "",
		sortBy: 'amount',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectedExpenses(testData, filters);

	expect(result.length).toBe(3);
	expect(result).toEqual([testData[1], testData[2], testData[0]])


});