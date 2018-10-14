import React from 'react';
import { shallow } from 'enzyme';
import {ExpenseList} from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

test("RenderExpenseListWithExpenses", () => {
   const wrapper = shallow(<ExpenseList expenses={expenses}/>);

   expect(wrapper).toMatchSnapshot();
   expect(wrapper.find("ExpenseListItem").length).toBe(3)
});

test("RenderExpenseListDefaultValues", () => {
	const wrapper = shallow(<ExpenseList expenses={[]}/>);

	expect(wrapper).toMatchSnapshot();
	expect(wrapper.find("ExpenseListItem").length).toBe(0)
});