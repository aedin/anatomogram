'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSvg = require('react-svg');

var _reactSvg2 = _interopRequireDefault(_reactSvg);

var _urijs = require('urijs');

var _urijs2 = _interopRequireDefault(_urijs);

require('./AnatomogramSvg.css');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var groupIntoPairs = function groupIntoPairs(arr, f) {
  return Object.entries((0, _lodash.groupBy)(arr, f));
};

var getSvgElementById = function getSvgElementById(svgDomNode) {
  var getEfoLayerGroup = function getEfoLayerGroup(svgDomNode) {
    var svgGroups = svgDomNode.getElementsByTagName('g');
    for (var i = 0; i < svgGroups.length; i++) {
      if (svgGroups[i].id === 'LAYER_EFO') {
        return svgGroups[i];
      }
    }
  };

  var efoLayerGroup = getEfoLayerGroup(svgDomNode);

  function _getSvgElementById(id) {
    if (efoLayerGroup) {
      for (var i = 0; i < efoLayerGroup.children.length; i++) {
        if (efoLayerGroup.children[i].id === id) {
          if (efoLayerGroup.children[i].attributes['xlink:href']) {
            return _getSvgElementById(efoLayerGroup.children[i].attributes['xlink:href'].value.substring(1));
          } else {
            return efoLayerGroup.children[i];
          }
        }
      }
    }
  }

  return _getSvgElementById;
};

var paintSvgElement = function paintSvgElement(element, elementMarkup) {
  return element && elementMarkup && Object.assign(element.style, elementMarkup);
};

var registerEvent = function registerEvent(element, eventType, elementMarkup, callback) {
  element && element.addEventListener(eventType, function () {
    paintSvgElement(element, elementMarkup);
    callback();
  });
};

var initialiseSvgElements = function initialiseSvgElements(getSvgElementById, _ref) {
  var idsWithMarkup = _ref.idsWithMarkup,
      onMouseOver = _ref.onMouseOver,
      onMouseOut = _ref.onMouseOut,
      onClick = _ref.onClick;

  //More than one id can correspond to an element - see the svg "use" elements
  groupIntoPairs(idsWithMarkup.map(function (e) {
    return e.id;
  }).filter(function (e, ix, self) {
    return self.indexOf(e) == ix;
  }).map(function (id) {
    return [getSvgElementById(id), id];
  }), '[0].id').forEach(function (a) {
    var element = a[1][0][0];
    var ids = a[1].map(function (t) {
      return t[1];
    });
    //Given an element and its ids, we take the first element of the idsWithMarkup array that is one of the ids
    var markupNormalAndUnderFocus = idsWithMarkup.find(function (m) {
      return ids.includes(m.id);
    });

    paintSvgElement(element, markupNormalAndUnderFocus.markupNormal);

    registerEvent(element, "mouseover", markupNormalAndUnderFocus.markupUnderFocus, onMouseOver.bind(undefined, ids));
    registerEvent(element, "mouseout", markupNormalAndUnderFocus.markupNormal, onMouseOut.bind(undefined, ids));
    registerEvent(element, "click", {}, onClick.bind(undefined, ids));
  });
};

var loadSvg = function loadSvg(species, selectedView) {
  return require('./svg/' + species + (selectedView ? '.' + selectedView : '') + '.svg');
};

// ReactSVG loads the SVG file asynchronously (hence the callback prop). We don’t use componentDidUpdate or
// componentDidMount because they can’t guarantee that the SVG is already loaded when they’re run. If
var AnatomogramSvg = function AnatomogramSvg(props) {
  return _react2.default.createElement(
    'div',
    { className: 'gxa-anatomogram-svg-wrapper' },
    _react2.default.createElement(_reactSvg2.default, {
      path: (0, _urijs2.default)(loadSvg(props.species, props.selectedView), props.atlasUrl),
      callback: function callback(svgDomNode) {
        initialiseSvgElements(getSvgElementById(svgDomNode), props);
      },
      className: 'gxa-anatomogram-svg',
      style: { paddingLeft: props.selectedView ? '10px' : '' } })
  );
};

AnatomogramSvg.propTypes = {
  atlasUrl: _propTypes2.default.string.isRequired,
  species: _propTypes2.default.string.isRequired,
  selectedView: _propTypes2.default.string,
  idsWithMarkup: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    markupNormal: _propTypes2.default.object.isRequired,
    markupUnderFocus: _propTypes2.default.object.isRequired
  })).isRequired,
  onMouseOver: _propTypes2.default.func.isRequired,
  onMouseOut: _propTypes2.default.func.isRequired,
  onClick: _propTypes2.default.func.isRequired
};

exports.default = AnatomogramSvg;