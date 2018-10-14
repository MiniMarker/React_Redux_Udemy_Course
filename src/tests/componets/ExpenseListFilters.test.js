import React from "react";
import {shallow} from "enzyme";
import moment from 'moment';
import {ExpenseListFilters} from "../../components/ExpenseListFilters";
import {filters, altFilters} from "../fixtures/filters";

let setTextFilterSpy, sortByDateSpy, sortByAmountSpy, setStartDateSpy, setEndDateSpy, wrapper;

beforeEach(() => {
	setTextFilterSpy = jest.fn();
	sortByDateSpy = jest.fn();
	sortByAmountSpy = jest.fn();
	setStartDateSpy = jest.fn();
	setEndDateSpy = jest.fn();

	wrapper = shallow(
		<ExpenseListFilters
			filters={filters}
			setTextFilter={setTextFilterSpy}
			sortByDate={sortByDateSpy}
			sortByAmount={sortByAmountSpy}
			setStartDate={setStartDateSpy}
			setEndDate={setEndDateSpy}
		/>);
});

test("RenderExpenseListFiltesDefaultData", () => {
	expect(wrapper).toMatchSnapshot();
});

test("RenderExpenseListFiltesAltData", () => {

	wrapper.setProps({
		filters: altFilters
	});

	expect(wrapper).toMatchSnapshot();
});


test("HandleTextChange", () => {

	const updatedText = "testValue";

	wrapper.find("input")
		.simulate("change", {
			target: {
				value: updatedText
			}
		});

	expect(setTextFilterSpy).toHaveBeenCalledWith(updatedText);
});

test("HandleSortByDate", () => {

	wrapper.setProps({
		filters: altFilters
	});

	wrapper.find("select")
		.simulate("change", {
			target: {
				value: "date"
			}
		});

	expect(sortByDateSpy).toHaveBeenCalled();

});

test("HandleSortByAmount", () => {

	wrapper.find("select")
		.simulate("change", {
			target: {
				value: "amount"
			}
		});

	expect(sortByAmountSpy).toHaveBeenCalled();

});

test("HandleDateChanges", () => {

	const startDate = moment(0).add(2, 'days');
	const endDate = moment(0).add(4, 'days');

	wrapper.find("DateRangePicker").prop("onDatesChange")({
		startDate,
		endDate
	});

	expect(setStartDateSpy).toHaveBeenCalledWith(startDate);
	expect(setEndDateSpy).toHaveBeenCalledWith(endDate);

});

test("HandleDateFocusChange", () => {

	const calendarFocused = 'endDate';

	wrapper.find("DateRangePicker").prop("onFocusChange")(calendarFocused);

	expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});