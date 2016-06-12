(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', 'react', './Component'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('react'), require('./Component'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.react, global.Component);
        global.index = mod.exports;
    }
})(this, function (module, exports, _react, _Component) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Component2 = _interopRequireDefault(_Component);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var PackageName = function PackageName() {
        return _react2.default.createElement(
            'div',
            { className: 'package' },
            _react2.default.createElement(
                'h1',
                null,
                'Hello World!'
            ),
            _react2.default.createElement(
                _Component2.default,
                null,
                'Hi there...'
            )
        );
    };

    exports.default = PackageName;

    module.exports = PackageName;
    module.exports = exports['default'];
});