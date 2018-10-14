import {
	setEndDate,
	setStartDate,
	setTextFilter,
	sortByAmount,
	sortByDate
} from "../../actions/filters";
import moment from 'moment';

test('SetStartDateTest', () => {

	const filters = setStartDate(moment(0));

	expect(filters).toEqual({
		type: "SET_START_DATE",
		startDate: moment(0)
	});
});

test('SetEndDateTest', () => {

	const filters = setEndDate(moment(0));

	expect(filters).toEqual({
		type: "SET_END_DATE",
		endDate: moment(0)
	});
});

test('SortByDateTest', () => {
	const filters = sortByDate();

	expect(filters).toEqual({
		type: 'SORT_BY_DATE'
	});
});

test('SortByAmountTest', () => {
	const filters = sortByAmount();

	expect(filters).toEqual({
		type: 'SORT_BY_AMOUNT'
	});
});

test('SetTestFilterTest_DefaultValues', () => {
	const filters = setTextFilter();

	expect(filters).toEqual({
		type: 'SET_TEXT_FILTER',
		updatedText: ''
	})
});

test('SetTestFilterTest', () => {
	const testTextFilter = "TestTextFilter";
	const filters = setTextFilter(testTextFilter);

	expect(filters).toEqual({
		type: 'SET_TEXT_FILTER',
		updatedText: testTextFilter
	})
});