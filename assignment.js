import Tree from './Tree.js';

function generateSortedArray(max) {
  const arr = [];
  for (let i = 0; i < max; i++) {
    arr.push(parseInt(Math.random() * max));
  }
  return [...new Set(arr.sort((a, b) => a - b))];
}

// 1.
const arr = generateSortedArray(100);
const tree = new Tree(arr);
tree.prettyPrint();
console.log(arr);

// 2.
console.log(tree.isBalanced());

// 3.
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

// 4.
const numbersOver100 = [100, 101, 102, 103, 104, 105];
for (let num of numbersOver100) tree.insert(num);

// 5.
console.log(tree.isBalanced());

// 6.
tree.rebalance();

// 7.
console.log(tree.isBalanced());

// 8.
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
