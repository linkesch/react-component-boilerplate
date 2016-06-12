import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Index from '../src/js/index';

describe('Index', () => {

    it('renders component', () => {
        const renderer = TestUtils.createRenderer();
        let result;

        renderer.render(<Index />);
        result = renderer.getRenderOutput();

        expect(result.type).toBe('div');
        expect(result.props.children).toContain(<h1>Hello World!</h1>);
    });

});
