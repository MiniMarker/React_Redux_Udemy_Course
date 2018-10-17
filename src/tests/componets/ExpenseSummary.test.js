import React from 'react';
import {ExpenseSummary} from '../../components/ExpenseSummary';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

test("RenderExpenseSummaryOneValue", () => {
    const wrapper = shallow(<ExpenseSummary expensesCount={1} totalAmount={2312}/>);
	expect(wrapper).toMatchSnapshot();
});

test("RenderExpenseSummaryMultipleValues", () => {
	const wrapper = shallow(<ExpenseSummary expensesCount={expenses.length} totalAmount={2316544672}/>);
	expect(wrapper).toMatchSnapshot();
});