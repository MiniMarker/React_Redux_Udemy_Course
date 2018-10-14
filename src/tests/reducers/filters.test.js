import filterReducer from '../../reducers/filters';
import moment from 'moment'


test("DefaultFilterValuesTest", () => {
    const state = filterReducer(undefined, {
    	type: "@@INIT"
    });

    expect(state).toEqual({
	    text: "",
	    sortBy: "date",
	    startDate: moment().startOf('month'),
	    endDate: moment().endOf('month')
    })
});

test("SetSortByAmount", () => {
    const state = filterReducer(undefined, {
    	type: "SORT_BY_AMOUNT"
    });

	expect(state.sortBy).toBe("amount")
});

test("SetSortByDate", () => {

	const defaultState = {
		text: "",
		sortBy: "amount",
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	};

	const state = filterReducer(defaultState, {
		type: "SORT_BY_DATE"
	});

	expect(state.sortBy).toBe("date")
});

test("SetSortByText", () => {

	const filterText = "TestFilter";
	const action = {
		type: "SET_TEXT_FILTER",
		updatedText: filterText
	};

	const state = filterReducer(undefined, action);

	expect(state.text).toBe(filterText)
});

test("SetStartDateFilter", () => {

	const startDate = moment(0);
	const action = {
		type: "SET_START_DATE",
		startDate: startDate
	};

	const state = filterReducer(undefined, action)

	expect(state.startDate).toEqual(startDate);
});

test("SetEndDateFilter", () => {

	const endDate = moment(0);
	const action = {
		type: "SET_END_DATE",
		endDate: endDate
	};

	const state = filterReducer(undefined, action);

	expect(state.endDate).toEqual(endDate);
});