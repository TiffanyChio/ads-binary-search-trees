class BSTNode {
  constructor({ key, value, parent = undefined, left = undefined, right = undefined }) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(Node = BSTNode) {
    this.Node = Node;
    this._count = 0;
    this._root = undefined;
  }

  findParent(key) {
    let curr = this._root;
    let prev = undefined;

    while (curr) {
      if (key < curr.key) {
        prev = curr
        curr = curr.left;
      } else if (key > curr.key) {
        prev = curr
        curr = curr.right;
      } else { // equal
        return curr;
      }
    }

    return prev
  }

  insert(key, value = true) {
    if (!this._root) {
      this._root = BSTNode.new(key, value)
    } else {
      const parent = findParent(key);

      if (parent.key < key) {
        parent.left = BSTNode.new(key, value, parent);
        this._count += 1;
      } else if (parent.key > key) {
        parent.right = BSTNode.new(key, value, parent);
        this._count += 1;
      } else {
        parent.value = value;
      }
    }

    return
  }

  lookup(key) {
    let node = this._root;

    while (node) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else { // equal
        return node.value;
      }
    }
  }

  delete(key) {
    // TODO (tests first!)
  }

  count() {
    return this._count;
  }

  forEach(callback) {
    // This is a little different from the version presented in the video.
    // The form is similar, but it invokes the callback with more arguments
    // to match the interface for Array.forEach:
    //   callback({ key, value }, i, this)
    const visitSubtree = (node, callback, i = 0) => {
      if (node) {
        i = visitSubtree(node.left, callback, i);
        callback({ key: node.key, value: node.value }, i, this);
        i = visitSubtree(node.right, callback, i + 1);
      }
      return i;
    }
    visitSubtree(this._root, callback)
  }
}

export default BinarySearchTree;