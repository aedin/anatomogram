'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportedSpecies = exports.getDefaultView = exports.getAnatomogramViews = undefined;

var _svgsMetadata = require('./json/svgsMetadata.json');

var _svgsMetadata2 = _interopRequireDefault(_svgsMetadata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unique = function unique(value, index, self) {
  return self.indexOf(value) === index;
};
var isNotBlank = function isNotBlank(str) {
  return typeof str === 'string' && str !== '';
};

var supportedSpecies = _svgsMetadata2.default.map(function (svgMetadata) {
  return svgMetadata.species;
}).filter(unique);

var multipleViewsSpecies = _svgsMetadata2.default.filter(function (svgMetadata) {
  return svgMetadata.view !== '';
}).map(function (svgMetadata) {
  return svgMetadata.species;
}).filter(unique);

var anatomogramViews = multipleViewsSpecies.reduce(function (acc, species) {
  acc[species] = _svgsMetadata2.default.filter(function (svgMetadata) {
    return svgMetadata.species === species;
  }).map(function (svgMetadata) {
    return svgMetadata.view;
  }).filter(isNotBlank).sort().reverse(); // The order we want is `male`, `female`, `brain` and `whole_plant`, `flower_parts` :)
  return acc;
}, {});

var getAnatomogramViews = function getAnatomogramViews(species) {
  if (supportedSpecies.includes(species)) {
    return anatomogramViews[species] || [];
  }
};

var getDefaultView = function getDefaultView(species) {
  if (supportedSpecies.includes(species)) {
    return getAnatomogramViews(species)[0] || null;
  }
};

exports.getAnatomogramViews = getAnatomogramViews;
exports.getDefaultView = getDefaultView;
exports.supportedSpecies = supportedSpecies;