import Node from './Node.js';

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    const middle = Math.ceil((start + end) / 2);

    const root = new Node(array[middle]);
    root.left = this.buildTree(array, start, middle - 1);
    root.right = this.buildTree(array, middle + 1, end);

    return root;
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  insert(value, root = this.root) {
    if (!root) root = new Node(value);
    else if (value < root.data) root.left = this.insert(value, root.left);
    else if (value > root.data) root.right = this.insert(value, root.right);
    return root;
  }

  deleteItem(value, root = this.root) {
    if (!root) return null;
    else if (value < root.data) root.left = this.deleteItem(value, root.left);
    else if (value > root.data) root.right = this.deleteItem(value, root.right);
    else {
      if (!root.right) return root.left;
      else if (!root.left) return root.right;
      else {
        let nextLarger = root.right;
        while (nextLarger.left) nextLarger = nextLarger.left;
        root.data = nextLarger.data;
        root.right = this.deleteItem(root.data, root.right);
      }
    }
    return root;
  }

  find(value, root = this.root) {
    if (!root) return null;
    else if (value < root.data) return this.find(value, root.left);
    else if (value > root.data) return this.find(value, root.right);
    return root;
  }

  levelOrder(callback, returnValue = []) {
    if (!callback) callback = (value) => returnValue.push(value);

    const queue = [];
    queue[0] = this.root;
    while (queue.length) {
      // Enqueue
      if (queue[0].left) queue.push(queue[0].left);
      if (queue[0].right) queue.push(queue[0].right);
      // Dequeue
      callback(queue.shift().data);
    }

    if (returnValue.length) return returnValue;
  }

  inOrder(callback, node = this.root, returnValue = []) {
    if (!callback) callback = (value) => returnValue.push(value);

    const traversal = (node) => {
      if (!node) return;
      traversal(node.left);
      callback(node.data);
      traversal(node.right);
    };
    traversal(node);

    if (returnValue.length) return returnValue;
  }

  preOrder(callback, node = this.root, returnValue = []) {
    if (!callback) callback = (value) => returnValue.push(value);

    const traversal = (node) => {
      if (!node) return;
      callback(node.data);
      traversal(node.left);
      traversal(node.right);
    };
    traversal(node);

    if (returnValue.length) return returnValue;
  }

  postOrder(callback, node = this.root, returnValue = []) {
    if (!callback) callback = (value) => returnValue.push(value);

    const traversal = (node) => {
      if (!node) return;
      traversal(node.left);
      traversal(node.right);
      callback(node.data);
    };
    traversal(node);

    if (returnValue.length) return returnValue;
  }

  height(node = this.root) {
    if (!node) return -1;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  depth(node = this.root, root = this.root) {
    if (!node) return null;
    else if (node === root) return 0;
    else if (node.data < root.data) return this.depth(node, root.left) + 1;
    else if (node.data > root.data) return this.depth(node, root.right) + 1;
  }

  isBalanced() {
    const root = this.root;
    let leftHeight = 0;
    let rightHeight = 0;
    if (root.left) leftHeight = this.height(root.left) + 1;
    if (root.right) rightHeight = this.height(root.right) + 1;
    return Math.abs(leftHeight - rightHeight) <= 1;
  }

  rebalance() {
    const values = this.inOrder();
    this.root = this.buildTree(values);
  }
}
