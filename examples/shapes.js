const LEFT_UP = 1
  , LEFT_DOWN = 2
  , RIGHT_UP = 3
  , RIGHT_DOWN = 4;

// Shape class
var Shape = Base.extend({
  "x": 0,
  "y": 0,
  "color": null,
  "zindex": 0,
  "lineStyle": 0,
  "lineWeight": 0,
  "selected": true,

  "constructor": function (opts) {
    console.log("Shape - constructor");
    console.log("opts: ", opts);
    this.x = opts.x;
    this.y = opts.y
    this.lineStyle = opts.lineStyle;
    this.lineWeight = opts.lineWeight;
    this.color = opts.color;
    this.selected = opts.selected
  },

  // Setters
  "setX": function (aX) {
    this.x = aX;
  },

  "setY": function (aY) {
    this.y = aY;
  },

  "setColor": function (aColor) {
    this.color = aColor;
  },

  "setZindex": function (aZindex) {
    this.zIndex = aZindex;
  },

  "setLineStyle": function (aLineStyle) {
    this.lineStyle = aLineStyle;
  },

  "setLineWeight": function (aLineWeight) {
    this.lineWeight = aLineWeight;
  },

  "setSelected": function (aSelected) {
    this.selected = aSelected;
  },

  "setCoords": function (aCoords) {
    // console.log("setCoords");
    this.setX(aCoords.x);
    this.setY(aCoords.y);
  },

  "setX": function (aX) {
    this.x = aX;
  },

  // Getters
  "getX": function () {
    return this.x;
  },

  "getY": function () {
    return this.y;
  },

  "getColor": function () {
    return this.color;
  },

  "getZindex": function () {
    return this.zIndex;
  },

  "getLineStyle": function () {
    return this.lineStyle;
  },

  "getLineWeight": function () {
    return this.lineWeight;
  },

  "getSelected": function () {
    return this.selected;
  },

  "getCoords": function () {
    var that = this;
    return {
      "x": that.getX(),
      "y": that.getY(),
    };
  },

  "isSelected": function () {
    return this.selected;
  },

}); // End Shape

