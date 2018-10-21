import React from 'react';
import { shallow } from 'enzyme';
import {LoginPage} from '../../components/LoginPage'

let loginSpy, wrapper;

beforeEach(() => {

	loginSpy = jest.fn();

	wrapper = shallow(<LoginPage startLogin={loginSpy}/>);
});

test("RenderLoginPage", () => {
    expect(wrapper).toMatchSnapshot();
});

test("CallStartLoginOnButtonClick", () => {
    wrapper.find("button").simulate('click');
    expect(loginSpy).toHaveBeenCalled();
});