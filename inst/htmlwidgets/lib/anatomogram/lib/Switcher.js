'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _urijs = require('urijs');

var _urijs2 = _interopRequireDefault(_urijs);

var _Assets = require('./Assets');

require('./Switcher.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadIcon = function loadIcon(view, selectedView) {
  return require('./img/' + view + '.' + (view === selectedView ? '' : 'un') + 'selected.png');
};

var Switcher = function Switcher(_ref) {
  var atlasUrl = _ref.atlasUrl,
      species = _ref.species,
      selectedView = _ref.selectedView,
      onChangeView = _ref.onChangeView;
  return _react2.default.createElement(
    'div',
    { className: 'gxa-anatomogram-switcher' },
    (0, _Assets.getAnatomogramViews)(species).map(function (view) {
      return _react2.default.createElement('img', { key: view, className: 'gxa-anatomogram-switcher-icon', onClick: function onClick() {
          return onChangeView(view);
        },
        src: (0, _urijs2.default)(loadIcon(view, selectedView), atlasUrl).toString() });
    })
  );
};

Switcher.propTypes = {
  atlasUrl: _propTypes2.default.string.isRequired,
  species: _propTypes2.default.string.isRequired,
  selectedView: _propTypes2.default.string,
  onChangeView: _propTypes2.default.func.isRequired
};

Switcher.defaultProps = {
  atlasUrl: 'https://www.ebi.ac.uk/gxa/'
};

exports.default = Switcher;