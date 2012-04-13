// Shape class
var Shape = Base.extend({
  "x": 0,
  "y": 0,
  "color": null,
  "zindex": 0,
  "lineStyle": 0,
  "lineWeight": 0,
  "lineColor": 0,
  "selected": true,
  "group": false,
  "resizeRect": false,
  "type": 0,

  "constructor": function (opts) {
    //console.log("Shape - constructor");
    //console.log("opts: ", opts);
    this.x = opts.x;
    this.y = opts.y
    this.lineStyle = opts.lineStyle;
    this.lineWeight = opts.lineWeight;
    this.lineColor = opts.lineColor;
    this.color = opts.color;
    this.selected = opts.selected;
    this.group = opts.group;
    this.type = opts.type;
    this.resizeRect = Utils.ResizeRect.getInstance();
  },

  // Setters
  "setX": function (aX) {
    this.x = aX;
  },

  "setY": function (aY) {
    this.y = aY;
  },

  "setColor": function (aColor) {
    //console.log("Shape - setColor");
    //console.log("aColor: ", aColor);
    this.color = aColor;
  },

  "setType": function (aType) {
    //console.log("Shape - setColor");
    //console.log("aColor: ", aColor);
    this.type = aType;
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

  "setLineColor": function (aLineColor) {
    this.lineColor = aLineColor;
  },

  "setSelected": function (aSelected) {
    this.selected = aSelected;
  },

  "setGroup": function (aGroup) {
    this.group = aGroup;
  },

  "setCoords": function (aCoords) {
    //console.log("Shape - setCoords");
    //console.log("aCoords: ", aCoords);
    this.setX(aCoords.x);
    this.setY(aCoords.y);
    return this;
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

  "getType": function () {
    return this.type;
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

  "getLineColor": function () {
    return this.lineColor;
  },

  "getSelected": function () {
    return this.selected;
  },

  "getGroup": function () {
    return this.group;
  },

  "getCoords": function () {
    //console.log("Shape - getCoords");
    var that = this;
    return {
      "x": that.getX(),
      "y": that.getY(),
    };
  },

  "isSelected": function () {
    return this.selected;
  },

  "isGroup": function () {
    return this.group;
  },

}); // End Shape

