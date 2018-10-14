import React from "react";
import {shallow} from "enzyme";
import {EditExpensePage} from "../../components/EditExpensePage";
import testData from '../fixtures/expenses'

let editExpenseSpy, removeExpenseSpy, historySpy, wrapper;

beforeEach(() => {
	editExpenseSpy = jest.fn();
	removeExpenseSpy = jest.fn();
	historySpy = { push: jest.fn() };
	wrapper = shallow(
		<EditExpensePage
			expense={testData[2]}
			editExpense={editExpenseSpy}
			removeExpense={removeExpenseSpy}
			history={historySpy}
		/>)
});

test("RenderEditExpensePageTest", () => {
    expect(wrapper).toMatchSnapshot();
});

test("HandleOnSubmit", () => {
	wrapper.find("ExpenseForm").prop("onSubmit")(testData[2]);
	expect(editExpenseSpy).toHaveBeenCalledWith(testData[2].id, testData[2]);
	expect(historySpy.push).toHaveBeenCalledWith("/")
});

test("HandleOnRemove", () => {
	wrapper.find("button").simulate('click');
	expect(removeExpenseSpy).toHaveBeenCalledWith({id: testData[2].id});
	expect(historySpy.push).toHaveBeenCalledWith("/")
});
