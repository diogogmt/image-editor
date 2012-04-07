(function (Utils)  {
  Utils.Color = function (color) {
    var _r = (color && color.r) || 0
      , _g = (color && color.g) || 0
      , _b = (color && color.b) || 0;

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

  Utils.generateColor = function () {
    var brightness = 51 * 5
      , color = []
      , i = 3
    while (i--) {
      color.push(Math.random() * 256 + brightness);
    }
    color = color.map(function (x) { return Math.round(x/2.0) });
    return new Utils.Color({
        "r": color[0],
        "g": color[1],
        "b": color[2],
    });
  }
}(window.Utils));