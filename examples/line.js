// Circle class
var Line = Shape.extend({

  "width": 0,
  "height": 0,
  "resizePoint": null,

  "maxCoords": {
    "x": 0,
    "y": 0,
  },

  "minCoords": {
    "x": 0,
    "y": 0,
  },

  "constructor": function (opts) {
    this.width = opts.width;
    this.height = opts.height;
    this.base({
      "x": opts.x,
      "y": opts.y,
      "color": opts.color,
      "lineStyle": opts.lineStyle,
      "lineWeight": opts.lineWeight,
      "lineColor": opts.lineColor,
      "selected": opts.selected,
      "group": opts.group,
      "type": opts.type,
    });
  },

  "resize": function () {
    var mouseX = pjs.mouseX
    , mouseY = pjs.mouseY;

    switch (this.resizePoint) {
      case LEFT_TOP:
        if (mouseY > this.maxCoords.y) {
          this.resizePoint = LEFT_BOTTOM;
          this.setMinCoords();
          this.setMaxCoords();
        }

        if (mouseX > this.maxCoords.x) {
          this.resizePoint = RIGHT_TOP;
          this.setMinCoords();
          this.setMaxCoords();
        }

        if (mouseY > this.y) {
          this.height -= mouseY - this.y;
          this.y = mouseY;
        }
        else if (mouseY < this.y) {
          this.height += this.y - mouseY;
          this.y = mouseY;
        }

        if (mouseX > this.x) {
          this.width -= mouseX - this.x;
          this.x = mouseX;
        }
        else if (mouseX < this.x) {
          this.width += this.x - mouseX;
          this.x = mouseX;
        }


        break;
      case LEFT_BOTTOM:
        if (mouseY < this.y) {
          this.resizePoint = LEFT_TOP;
          this.setMaxCoords();
        }

        if (mouseX > this.maxCoords.x) {
          this.resizePoint = RIGHT_BOTTOM;
          this.setMinCoords();
        }

        if (mouseX > this.x) {
          this.width -= mouseX - this.x;
          this.x = mouseX;
        }
        else if (mouseX < this.x) {
          this.width += this.x - mouseX;
          this.x = mouseX;
        }

        if (mouseY > (this.y + this.height)) {
          this.height += mouseY - (this.y + this.height);
        }
        else if (mouseY < (this.y + this.height)) {
          this.height -= (this.y + this.height) - mouseY;
        }
        break;

      case RIGHT_TOP:
        if (mouseX < this.minCoords.x) {
          this.resizePoint = LEFT_TOP;
          this.setMaxCoords();
        }

        if (mouseY > this.maxCoords.y) {
          this.resizePoint = RIGHT_BOTTOM;
          this.setMaxCoords();
          this.setMinCoords();
        }

        if (mouseX < (this.x + this.width)) {
          this.width -= (this.x + this.width) - mouseX;
        }
        else if (mouseX > (this.x + this.width)) {
          this.width += mouseX - (this.x + this.width);
        }

        if (mouseY > this.y) {
          this.height -= mouseY - this.y;
          this.y = mouseY;
        }
        else if (mouseY < this.y) {
          this.height += this.y - mouseY;
          this.y = mouseY;
        }
        break;

      case RIGHT_BOTTOM:
        if (mouseX < this.minCoords.x) {
          this.resizePoint = LEFT_BOTTOM;
          this.setMinCoords();
          this.setMaxCoords();
        }

        if (mouseY < this.minCoords.y) {
          this.resizePoint = RIGHT_TOP;
          this.setMinCoords();
          this.setMaxCoords();
        }

        if (mouseX > (this.x + this.width)) {
          this.width += mouseX - (this.x + this.width);
        }
        else if (mouseX < (this.x + this.width)) {
          this.width -= (this.x + this.width) - mouseX;
        }

        if (mouseY > (this.y + this.height)) {
          this.height += mouseY - (this.y + this.height);
        }
        else if (mouseY < (this.y + this.height)) {
          this.height -= (this.y + this.height) - mouseY;
        }
        break;

    }
  },


  "drawShape": function () {
    var shapeColor = this.color.getColor()
      , lineColor = this.getLineColor().getColor()
      , lineWeight = this.lineWeight;

    if (this.overlay) {
      pjs.noFill();
    }
    else {
      pjs.fill(shapeColor.r, shapeColor.g, shapeColor.b);
    }

    pjs.stroke(lineColor.r, lineColor.g, lineColor.b);
    pjs.strokeWeight(lineWeight);
    var p1 = {
      "x": this.x,
      "y": this.y + this.height
    };

    var p2 = {
      "x": this.x + this.width,
      "y": this.y
    };

    pjs.line(p1.x, p1.y,
      p2.x, p2.y
    );
  },

  "draw": function () {
    !this.isGroup() && this.drawShape();
  },

  isMouseOver: function () {
    var mouseX = pjs.mouseX;
    var mouseY = pjs.mouseY;

    return mouseX >= this.x && mouseX <= this.x + this.width
       &&  mouseY >= this.y && mouseY <= this.y + this.height;
  },


  "findResizeCorner": function (pos) {
    var bounds = {
      "x" : 0,
      "y" : 0,
      "width" : 0,
      "height" : 0,
    };

    if (pos.lr === LEFT) {
      bounds.x = this.resizeRect.getLeftX(this.x);
      bounds.width = this.resizeRect.getLeftX(this.x) + this.resizeRect.getWidth();
    }
    else if (pos.lr === RIGHT) {
      bounds.x = this.resizeRect.getRightX(this.x, this.width);
      bounds.width = this.resizeRect.getRightX(this.x, this.width) + this.resizeRect.getWidth();
    }

    if (pos.tb === TOP) {
      bounds.y = this.resizeRect.getTopY(this.y);
      bounds.height = this.resizeRect.getTopY(this.y) + this.resizeRect.getHeight();
    }
    else if (pos.tb === BOTTOM) {
      bounds.y = this.resizeRect.getBottomY(this.y, this.height);
      bounds.height = this.resizeRect.getBottomY(this.y, this.height) + this.resizeRect.getHeight();
    }

    return bounds;
  },

  "shouldResize": function () {
    var i
      , coords = {
        "x": pjs.mouseX,
        "y": pjs.mouseY,
      };

    for (i = 0; i < CORNERS.length; i++) {
      bounds = this.findResizeCorner(PLACES[CORNERS[i]]);
      x1 = coords.x >= bounds.x;
      x2 = coords.x <= bounds.width;
      y1 = coords.y >= bounds.y;
      y2 = coords.y <= bounds.height;

      if (x1 && x2 && y1 && y2) {
        this.resizePoint = CORNERS[i];
        return true;
      }
    }

    return false;
  },

  "setWidth": function (aWidth) {
    this.width = aWidth;
  },

  "setHeight": function (aHeight) {
    this.height = aHeight;
  },

  "setMinCoords": function (aMaxCoords) {
    this.minCoords.x = this.x;
    this.minCoords.y = this.y;
  },

  "setMaxCoords": function (aMaxCoords) {
    this.maxCoords.x = this.x + this.width;
    this.maxCoords.y = this.y + this.height;
  },

  "setDimensions": function (aDimensions) {
    this.setWidth(aDimensions.width);
    this.setHeight(aDimensions.height);
    return this;
  },

  "setResizePoint": function (aResizePoint) {
    this.resizePoint = aResizePoint;
  },


  "getWidth": function () {
    return this.width;
  },

  "getHeight": function () {
    return this.height;
  },

  "getStartCoords": function () {
    return {
      "x": this.maxCoords.x,
      "y": this.maxCoords.y,
    };
  },

  "getDimensions": function () {
    return {
      "width": this.getWidth(),
      "height": this.getHeight(),
    };
  },

}); // End Rect
