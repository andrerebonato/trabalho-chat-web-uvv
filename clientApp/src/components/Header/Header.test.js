import React from 'react';
import renderer from 'react-test-renderer';
import { HeaderComponent } from '../index';

describe('renders correctly HeaderComponent - isLoggedIn prop', () => {

    it('test snapshot when prop isLoggedIn = true', () => {
        const component = renderer.create(
            <HeaderComponent isLoggedIn />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});