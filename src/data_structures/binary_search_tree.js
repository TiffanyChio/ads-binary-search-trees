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

  findParents(key) {
    let node = this._root;
    let parent = undefined;

    while (node) {
      if (key < node.key) {
        parent = node;
        node = node.left;
      } else if (key > node.key) {
        parent = node;
        node = node.right;
      } else { // equal or undefined
        break;
      }
    }

    return { parent, node };
  }

  insert(key, value = true) {
    if (!this._root) {
      this._root = new BSTNode({ key: key, value: value });
      this._count += 1;
    } else {
      const result = this.findParents(key);

      if (result.node) {
        result.node.value = value;
        return
      }

      if (result.parent.key < key) {
        result.parent.right = new BSTNode({
          key: key, 
          value: value, 
          parent: result.parent
        });
        this._count += 1;
      } else if (result.parent.key > key) {
        result.parent.left = new BSTNode({
          key: key, 
          value: value, 
          parent: result.parent
        });
        this._count += 1;
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

  findSelf(key) {
    let node = this._root;

    while (node) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else { // equal
        return node;
      }
    }
  }

  findSuccessor(nodeToBeRemoved) {
    let curr = undefined;
    
    if (nodeToBeRemoved.right) {
      curr = nodeToBeRemoved.right;

      while (curr.left) {
        curr = curr.left;
      }
    } else if (nodeToBeRemoved.left) {
      curr = nodeToBeRemoved.left;

      while (curr.right) {
        curr = curr.right;
      }
    } 

    return curr;
  }

  severNode(child) {
    const parent = child.parent;

    if (!parent) {
      this._root = undefined;
      return;
    }

    if (parent.left === child) {
      parent.left = undefined
    } else {
      parent.right = undefined
    }

    return
  }

  delete(key) {
    const nodeToBeRemoved = this.findSelf(key);
    let removedVal;

    if (nodeToBeRemoved) {
      const successor = this.findSuccessor(nodeToBeRemoved);
      removedVal = nodeToBeRemoved.value; 

      if (!successor) {
        this.severNode(nodeToBeRemoved);
      } else {
        const successorKey = successor.key;
        const successorVal = successor.value;

        this.severNode(successor);

        nodeToBeRemoved.key = successorKey;
        nodeToBeRemoved.value = successorVal;
      }

      this._count -= 1;
    }

    return removedVal;
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