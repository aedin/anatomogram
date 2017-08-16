'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anatomogramSpecies = exports.render = exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Main = require('./Main');

var _Main2 = _interopRequireDefault(_Main);

var _Assets = require('./Assets');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = function render(options, target) {
  _reactDom2.default.render(_react2.default.createElement(_Main2.default, options), document.getElementById(target));
};

exports.default = _Main2.default;
exports.render = render;
exports.anatomogramSpecies = _Assets.supportedSpecies;