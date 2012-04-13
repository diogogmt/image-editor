CreateShapeCommand = function (canvas, shape)  {
  //console.log("createShapeCommand");
  return {
    "execute": function () {
      //console.log("createShapeCommand - execute");
      canvas.addShape(shape);
    },
    "undo": function () {
      //console.log("createShapeCommand - undo");
      canvas.removeShape(shape);
    }
  }
}

DeleteShapeCommand = function (canvas, shape)  {
  var shape;

  return {
    "execute": function () {
      canvas.removeShape(shape);

    },
    "undo": function () {
      canvas.insertShape(shape);
    }
  }
}


SetColorCommand = function (shapes, color)  {
  //console.log("SetColorCommand");
  var oldColor = []
    , i
    , end = shapes.length;

    for (i = 0; i < end; i++) {
      oldColor.push(shapes[i].getColor());
    }
    //console.log("oldColor: ", oldColor);


  return {
    "execute": function () {
      //console.log("execute SetColorCommand");
      for (i = 0; i < end; i++) {
        shapes[i].setColor(color);
      }
    },
    "undo": function () {
      //console.log("undo SetColorCommand");
      //console.log("oldColor: ", oldColor);
      for (i = 0; i < end; i++) {
        shapes[i].setColor(oldColor[i]);
      }
    }
  }
}

SetLineWeightCommand = function (canvas, lineWeight)  {
  var oldLineWeight = canvas.getLineWeight();

  return {
    "execute": function () {
      canvas.setLineWeight(lineWeight);
    },
    "undo": function () {
      canvas.setColor(oldLineWeight);
    }
  }
}


SetLineStyleCommand = function (canvas, lineStyle)  {
  var oldLineStyle = canvas.getLineStyle();

  return {
    "execute": function () {
      canvas.setLineStyle(lineStyle);
    },
    "undo": function () {
      canvas.setColor(oldLineStyle);
    }
  }
}

CreateShapeGroupCommand = function (canvas, shapes)  {
  var oldShapeGroup = canvas.getShapeGroup();

  return {
    "execute": function () {
      canvas.setShapeGroup(shapes);
    },
    "undo": function () {
      canvas.setShapeGroup(oldShapeGroup);
    }
  }
}

ResizeShapeCommand = function (shape, options)  {
  //console.log("ResizeShapeCommand");
  //console.log("shape: ", shape);
  //console.log("options: ", options);
  var dimensions = shape.getDimensions();
  var coords = shape.getCoords();

  return {
    "execute": function () {
      //console.log("ResizeShapeCommand");
      //console.log("execute");
      //console.log("dimensions: ", dimensions);
      //console.log("coords: ", coords);
      shape.setDimensions(dimensions)
        .setCoords(coords);
    },

    "undo": function () {
      //console.log("ResizeShapeCommand");
      //console.log("undo");
      //console.log("options: ", options);
      shape.setDimensions(options.oldDimensions)
        .setCoords(options.oldCoords);
    }
  }
}


PasteCommand = function (canvas, shape)  {
  return {
    "execute": function () {
      canvas.insertShape(shape);
    },
    "undo": function () {
      canvas.removeShape(shape);
    }
  }
}

MoveCommand = function (canvas, shape, options)  {

  // options object
  //{
    //"oldDimensions": {
      //"width": shape.getWidth(),
      //"height": shape.getHeight(),
    //},
    //"oldCoords": {
      //"x": shape.getX(),
      //"y": shape.getY(),
    //}
  //}


  // dimensions object
  //{
    //"width": shape.getWidth(),
    //"height": shape.getHeight()
  //}

  // coords object
  //{
    //"x": shape.getX(),
    //"y": shape.getY(),
  //}
  var dimensions = shape.getDimensions();
  var coords = shape.getCoords();

  return {
    "execute": function () {
      canvas.getShape(shape).setDimensions(dimensions)
        .setCoords(coords);
    },

    "undo": function () {
      canvas.getShape(shape).setDimensions(options.oldDimensions)
        .setCoords(options.oldCoords);
    }
  }
}