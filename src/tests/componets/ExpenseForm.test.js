import React from "react";
import {shallow} from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import testData from "../fixtures/expenses";
import moment from "moment";

test("RenderExpenseFormDefaultValuesTest", () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
});

test("RenderExpenseFormWithTestData", () => {
	const wrapper = shallow(<ExpenseForm expense={testData[0]} />);
	expect(wrapper).toMatchSnapshot();
});

test("RenderErrorForInvalidFormSubmission", () => {
	const wrapper = shallow(<ExpenseForm />);

	expect(wrapper).toMatchSnapshot();

	wrapper.find("form").simulate("submit", {
		preventDefault: () => {}
	});

	expect(wrapper.state("errorMessage").length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

test("SetDescriptionStateOnInputChange", () => {
	const text = "changedDescription";
	const wrapper = shallow(<ExpenseForm />);

	wrapper
		.find("input")
		.at(0)
		.simulate("change", {
			target: {
				value: text
			}
		});

	expect(wrapper.state("description")).toBe(text);
});

test("SetNoteStateOnInputChange", () => {
	const text = "changedNote";
	const wrapper = shallow(<ExpenseForm />);

	wrapper.find("textarea").simulate("change", {
		target: {
			value: text
		}
	});

	expect(wrapper.state("note")).toBe(text);
});

test("SetAmountStateOnValidInput", () => {
	const amount = 12.5;
	const wrapper = shallow(<ExpenseForm />);

	wrapper
		.find("input")
		.at(1)
		.simulate("change", {
			target: {
				value: amount
			}
		});

	expect(wrapper.state("amount")).toBe(amount);
});

test("SetAmountStateOnInvalidInput", () => {
	const amount = "abc";
	const wrapper = shallow(<ExpenseForm />);

	wrapper
		.find("input")
		.at(1)
		.simulate("change", {
			target: {
				value: amount
			}
		});

	expect(wrapper.state("amount")).toBe("");
});

test("CallOnSubmitPropOnValidFormSubmit", () => {
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(
		<ExpenseForm expense={testData[0]} onSubmit={onSubmitSpy} />
	);

	wrapper.find("form").simulate("submit", {
		preventDefault: () => {}
	});

	expect(wrapper.state("errorMessage")).toBe("");
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		description: testData[0].description,
		amount: testData[0].amount,
		note: testData[0].note,
		createdAt: testData[0].createdAt
	});
});

test("SetNewDateOnDateChange", () => {
	const now = moment();
	const wrapper = shallow(<ExpenseForm />);

	wrapper.find("SingleDatePicker").prop("onDateChange")(now);
	expect(wrapper.state("createdAt")).toEqual(now);
});

test("SetCalendarFocusOnChange", () => {
	const wrapper = shallow(<ExpenseForm />);

	wrapper.find("SingleDatePicker").prop("onFocusChange")({
		focused: true
	});

	expect(wrapper.state("calendarFocused")).toBeTruthy();
});