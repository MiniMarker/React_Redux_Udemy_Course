import React from 'react';
import { shallow } from 'enzyme';
import DashboardPage from '../../components/DashboardPage';

test("RenderDashboard", () => {
    const wrapper = shallow(<DashboardPage/>);
	expect(wrapper).toMatchSnapshot();
	expect(wrapper.find("Connect(ExpenseListFilters)").length).toBe(1);
	expect(wrapper.find("Connect(ExpenseList)").length).toBe(1)
});