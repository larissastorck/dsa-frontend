class Stack {
  constructor() {
    this.undo = [];
    this.redo = [];
  }

  /*add(value) {
    this.undo.push(value);
  }

  undoFn() {
    const action = this.undo.pop();
    action && this.redo.push(action);
  }

  redoFn() {
    const action = this.redo.pop();
    action && this.undo.push(action);
  }

  peekUndo() {
    return this.undo[this.undo.length - 1];
  }
  */

  add = (value) => {
    this.undo.push(value);
  }

  undoFn = () => {
    const action = this.undo.pop();
    action && this.redo.push(action);
  }

  redoFn = () => {
    const action = this.redo.pop();
    action && this.undo.push(action);
  }

  peekUndo = () => {
    return this.undo[this.undo.length - 1];
  }
}

/* Using regular function
function editor(value, fn) {
  fn(value)
}

const newStack = new Stack;

editor('a', newStack.undoFn.bind(newStack));
editor('b', newStack.undoFn.bind(newStack));
editor('c', newStack.undoFn.bind(newStack));
editor(null, newStack.redoFn.bind(newStack));
*/


function editor(value = null, fn) {
  fn(value)
}

const newStack = new Stack;

editor('a', newStack.add);
editor('b', newStack.add);
editor('c', newStack.add);
console.log(newStack.undo);
editor(null, newStack.undoFn);
console.log(newStack.undo);
console.log(newStack.redo);

//Testing

/*const editor = new Stack;

editor.add("a");
editor.add("b");
editor.add("c");
console.log(editor.undo);
// ["a", "b", "c"]

editor.undoFn();
console.log(editor.undo);
// ["a", "b"]
console.log(editor.redo);
// ["c"]

editor.redoFn();
console.log(editor.undo);
// ["a", "b", "c"]
console.log(editor.redo);
// []
*/