(function (Utils)  {
  Utils.Color = function (color) {
    var r = (color && color.r) || 255
      , _g = (color && color.g) || 255
      , _b = (color && color.b) || 255;

    this.getColor = function () {
      return {
        "r": _r,
        "g": _g,
        "b": _b
      };
    };

  };

  Utils.Color.prototype.toString = function () {
      // console.log(this._r + "," + this._g + "," + this._b);
  }
}(window.Utils));