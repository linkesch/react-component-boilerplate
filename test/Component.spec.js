import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Component from '../src/js/Component';

describe('Component', () => {

    it('renders component', () => {
        const renderer = TestUtils.createRenderer();
        let result;

        renderer.render(<Component>Hi there...</Component>);
        result = renderer.getRenderOutput();

        expect(result.type).toBe('div');
        expect(result.props.children).toContain('Hi there...');
    });

});
