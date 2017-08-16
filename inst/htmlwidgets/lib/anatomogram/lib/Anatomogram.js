'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Switcher = require('./Switcher');

var _Switcher2 = _interopRequireDefault(_Switcher);

var _AnatomogramSvg = require('./AnatomogramSvg');

var _AnatomogramSvg2 = _interopRequireDefault(_AnatomogramSvg);

var _Assets = require('./Assets');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Anatomogram = function (_React$Component) {
  _inherits(Anatomogram, _React$Component);

  function Anatomogram(props) {
    _classCallCheck(this, Anatomogram);

    var _this = _possibleConstructorReturn(this, (Anatomogram.__proto__ || Object.getPrototypeOf(Anatomogram)).call(this, props));

    _this.state = {
      selectedView: (0, _Assets.getDefaultView)(props.species)
    };
    _this._switchAnatomogramView = _this._switchAnatomogramView.bind(_this);
    return _this;
  }

  _createClass(Anatomogram, [{
    key: '_switchAnatomogramView',
    value: function _switchAnatomogramView(anatomogramView) {
      this.setState({ selectedView: anatomogramView });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.species !== this.props.species) {
        this.setState({ selectedView: (0, _Assets.getDefaultView)(nextProps.species) });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _Assets.supportedSpecies.includes(this.props.species) && _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Switcher2.default, {
          atlasUrl: this.props.atlasUrl,
          species: this.props.species,
          selectedView: this.state.selectedView,
          onChangeView: this._switchAnatomogramView }),
        _react2.default.createElement(_AnatomogramSvg2.default, _extends({
          atlasUrl: this.props.atlasUrl
        }, this.props, {
          selectedView: this.state.selectedView }))
      );
    }
  }]);

  return Anatomogram;
}(_react2.default.Component);

Anatomogram.propTypes = {
  species: _propTypes2.default.string.isRequired
};

Anatomogram.defaultProps = {
  atlasUrl: 'https://www.ebi.ac.uk/gxa/'
};

exports.default = Anatomogram;