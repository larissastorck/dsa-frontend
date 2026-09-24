import { createFiberTree } from './FiberNode.js';
import { workLoop } from './workLoop.js';

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

const rootFiber = createFiberTree(startNode);

//console.log(rootFiber);

const visited = [];

workLoop(rootFiber, (fiber) => {
  visited.push(fiber.type);
});

console.log(visited);