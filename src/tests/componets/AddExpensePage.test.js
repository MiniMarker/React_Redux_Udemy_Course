import React from "react";
import {shallow} from "enzyme";
import {AddExpensePage} from "../../components/AddExpensePage";
import testData from '../fixtures/expenses'

let addExpenseSpy, historySpy, wrapper;

beforeEach(() => {
	addExpenseSpy = jest.fn();
	historySpy = { push: jest.fn() };
	wrapper = shallow(<AddExpensePage addExpense={addExpenseSpy} history={historySpy}/>);
});

test("RenderAddExpensePage", () => {
	expect(wrapper).toMatchSnapshot();
});

test("HandleOnSubmit", () => {
	wrapper.find("ExpenseForm").prop("onSubmit")(testData[1]);
	expect(historySpy.push).toHaveBeenLastCalledWith("/");
	expect(addExpenseSpy).toHaveBeenLastCalledWith(testData[1])
});
