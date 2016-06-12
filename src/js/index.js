import React from 'react';
import Component from './Component';

const PackageName = () => (
    <div className="package">
        <h1>Hello World!</h1>
        <Component>Hi there...</Component>
    </div>
);

export default PackageName;
module.exports = PackageName;
