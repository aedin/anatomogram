'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _recompose = require('recompose');

var _Anatomogram = require('./Anatomogram');

var _Anatomogram2 = _interopRequireDefault(_Anatomogram);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var arrayDifference = function arrayDifference(arr1, arr2) {
    return Array.isArray(arr1) && Array.isArray(arr2) ? arr1.filter(function (e) {
        return !arr2.includes(e);
    }) : arr1;
};

var elementMarkup = function elementMarkup(colour, opacity) {
    return { fill: colour, opacity: opacity };
};

var idsWithMarkupAccordingToCurrentColoringScheme = function idsWithMarkupAccordingToCurrentColoringScheme(_ref) {
    var showIds = _ref.showIds,
        showColour = _ref.showColour,
        showOpacity = _ref.showOpacity,
        highlightIds = _ref.highlightIds,
        highlightColour = _ref.highlightColour,
        highlightOpacity = _ref.highlightOpacity,
        selectIds = _ref.selectIds,
        selectColour = _ref.selectColour,
        selectOpacity = _ref.selectOpacity;

    var uniqueShowIds = arrayDifference(showIds, [].concat(_toConsumableArray(highlightIds), _toConsumableArray(selectIds)));
    var uniqueHighlightIds = arrayDifference(highlightIds, selectIds);

    //Given an element and its ids, we take the first element of this array having one of the ids
    return [].concat(selectIds.map(function (id) {
        return {
            id: id,
            markupNormal: elementMarkup(selectColour, selectOpacity),
            markupUnderFocus: elementMarkup(selectColour, selectOpacity + 0.2)
        };
    }), uniqueHighlightIds.map(function (id) {
        return {
            id: id,
            markupNormal: elementMarkup(highlightColour, highlightOpacity),
            markupUnderFocus: elementMarkup(highlightColour, highlightOpacity + 0.2)
        };
    }), uniqueShowIds.map(function (id) {
        return {
            id: id,
            markupNormal: elementMarkup(showColour, showOpacity),
            markupUnderFocus: elementMarkup(highlightColour, highlightOpacity + 0.2)
        };
    }));
};

var addColoringScheme = (0, _recompose.compose)((0, _recompose.defaultProps)({
    showIds: [],
    highlightIds: [],
    selectIds: [],
    showColour: 'grey',
    highlightColour: 'red',
    selectColour: 'purple',
    showOpacity: 0.4,
    highlightOpacity: 0.4,
    selectOpacity: 0.4 }), (0, _recompose.withPropsOnChange)((0, _lodash.negate)(_lodash.isEqual), function (props) {
    return { idsWithMarkup: idsWithMarkupAccordingToCurrentColoringScheme(props) };
}));

var normaliseSpecies = (0, _recompose.mapProps)(function (props) {
    return Object.assign({}, props, { species: props.species.toLowerCase().replace(/ +/, '_') });
});

var addDefaultCallbacks = (0, _recompose.defaultProps)({
    onMouseOver: function onMouseOver() {},
    onMouseOut: function onMouseOut() {},
    onClick: function onClick() {}
});

var definePropTypes = (0, _recompose.setPropTypes)({
    atlasUrl: _propTypes2.default.string.isRequired,
    species: _propTypes2.default.string.isRequired,
    idsWithMarkup: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        id: _propTypes2.default.string.isRequired,
        markupNormal: _propTypes2.default.object.isRequired,
        markupUnderFocus: _propTypes2.default.object.isRequired
    })).isRequired,
    onMouseOver: _propTypes2.default.func.isRequired,
    onMouseOut: _propTypes2.default.func.isRequired,
    onClick: _propTypes2.default.func.isRequired
});

var defineDefaultProps = (0, _recompose.defaultProps)({
    atlasUrl: 'https://www.ebi.ac.uk/gxa/'
});

exports.default = (0, _recompose.compose)(addColoringScheme, _recompose.onlyUpdateForPropTypes, definePropTypes, defineDefaultProps, addDefaultCallbacks, normaliseSpecies)(_Anatomogram2.default);