// Desafio bônus — Fiber simplificado (desafio oficial da fase)
//
// Fiber real do React usa: child, sibling, return (não next/prev).
// Um componente pode ter 1 filho direto, mas o filho pode ter irmãos.

class FiberNode {
  constructor(type) {
    this.type = type;
    this.child = null;
    this.sibling = null;
    this.return = null; // aponta pro pai
  }
}

// TODO: dado um objeto tipo:
// { type: 'div', children: [{type:'h1'}, {type:'p', children:[{type:'span'}]}] }
// construir a árvore de Fiber (child/sibling/return)
//const startNode = { type: 'div', children: [{type:'h1'}, {type:'p', children:[{type:'span'}]}] }
function createFiberTree(node, returnFiber = null) {

  if (!node) return;
  const fiber = new FiberNode(node.type)
  fiber.return = returnFiber

  if (node.children && node.children.length > 0) {
    const child = createFiberTree(node.children[0], fiber)//primeiro filho
    fiber.child = child
    let indexChild = 1
    let currentChild = child
    do {
      const sibling = createFiberTree(node.children[indexChild], fiber)
      currentChild.sibling = sibling
      currentChild = sibling;
      indexChild++
    } while (indexChild < node.children.length)
  }
  return fiber
}

const startNode = {
  type: 'div',
  children: [
    {
      type: 'header',
      children: [
        { type: 'h1' },
        { type: 'nav' },
        { type: 'button' }
      ]
    },
    {
      type: 'main',
      children: [
        { type: 'h2' },
        {
          type: 'section',
          children: [
            { type: 'p' },
            { type: 'span' }
          ]
        },
        { type: 'button' }
      ]
    },
    {
      type: 'footer',
      children: [
        { type: 'small' },
        { type: 'a' }
      ]
    }
  ]
};

console.log(createFiberTree(startNode))

export { FiberNode, createFiberTree };
