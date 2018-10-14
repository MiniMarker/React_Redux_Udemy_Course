import React from 'react';
import {shallow} from 'enzyme';
import Header from '../../components/Header';



test("RenderHeader", () => {

	const wrapper = shallow(<Header/>);
	expect(wrapper).toMatchSnapshot();

	//expect(wrapper.find('h1').text()).toBe("Expensify")

	/*
	// OLD STUFF!
    const renderer = new ReactShallowRenderer();
    renderer.render(<Header/>);

    console.log(renderer.getRenderOutput());

    // Dette lagrer ett utdrag fra rendered output i en egen mappe __snapshots__
	// Neste gang testen kjøres sjekkes det da om resultatet fremdeles stemmer med forrige versjon
    expect(renderer.getRenderOutput()).toMatchSnapshot();
    */

});