import React from 'react';
import {shallow} from 'enzyme';
import {Header} from '../../components/Header';

let logoutSpy, wrapper;

beforeEach(() => {

	logoutSpy = jest.fn();

	wrapper = shallow(<Header startLogout={logoutSpy}/>);
});


test("RenderHeader", () => {
	expect(wrapper).toMatchSnapshot();
});

test("CallStartLoginOnButtonClick", () => {
	wrapper.find("button").simulate('click');
	expect(logoutSpy).toHaveBeenCalled();
});