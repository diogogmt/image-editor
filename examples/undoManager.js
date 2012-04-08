(function (Utils) {

  Utils.UndoManager = {};
  var _undoManager;

  function UndoManager() {
    var _undoStack = [],
        _redoStack = [];

    return {
      register: function( command ){
        //console.log("UndoManager - register");
        if ( command.execute && command.undo ){
          _undoStack.push( command );
          _redoStack.length = 0;
        } //if
      }, //register
      canUndo: function(){
        return _undoStack.length > 0;
      }, //canUndo
      canRedo: function(){
        return _redoStack.length > 0;
      }, //canRedo
      undo: function(){
        if ( this.canUndo() ){
          var command = _undoStack.pop();
          _redoStack.push( command );
          command.undo();
        } //if
      }, //undo
      redo: function(){
        if ( this.canRedo() ){
          var command =_redoStack.pop();
          _undoStack.push( command );
          command.execute();
        } //if
      }, //redo
      clear: function(){
        _undoStack.length = 0;
        _redoStack.length = 0;
      } //clear
    };
  } //UndoManager

  Utils.UndoManager.getInstance = function() {
    if (!_undoManager){
      _undoManager = new UndoManager();
    } //if
    return _undoManager;
  } //getInstance

}(window.Utils));

