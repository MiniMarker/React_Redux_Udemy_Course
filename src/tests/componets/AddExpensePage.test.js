import React from "react";
import {shallow} from "enzyme";
import {AddExpensePage} from "../../components/AddExpensePage";
import testData from '../fixtures/expenses'

let startAddExpenseSpy, historySpy, wrapper;

beforeEach(() => {
	startAddExpenseSpy = jest.fn();
	historySpy = { push: jest.fn() };
	wrapper = shallow(<AddExpensePage startAddExpense={startAddExpenseSpy} history={historySpy}/>);
});

test("RenderAddExpensePage", () => {
	expect(wrapper).toMatchSnapshot();
});

test("HandleOnSubmit", () => {
	wrapper.find("ExpenseForm").prop("onSubmit")(testData[1]);
	expect(historySpy.push).toHaveBeenLastCalledWith("/");
	expect(startAddExpenseSpy).toHaveBeenLastCalledWith(testData[1])
});
