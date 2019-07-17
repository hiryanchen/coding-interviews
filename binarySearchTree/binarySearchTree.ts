interface BSTNode {
    value:number;
    left?: BSTNode;
    right?: BSTNode;
}

/**
 * Print an in-order traversal of the tree.
 * @param node starting node.
 */
function printTree(node?:BSTNode) {
    if (!node) {
        return;
    }
    printTree(node.left);
    console.log(node.value);
    printTree(node.right);
}

// Sample tree representation
const value11: BSTNode = { value: 11, left: undefined, right: undefined };
const value12: BSTNode = { value: 12, left: value11, right: undefined };
const value7: BSTNode = { value: 7, left: undefined, right: undefined };
const value5: BSTNode = { value: 5, left: undefined, right: undefined };
const value6: BSTNode = { value: 6, left: value5, right: value7 };
const value2: BSTNode = { value: 2, left: undefined, right: undefined };
const value3: BSTNode = { value: 3, left: value2, right: value6 };
const value10: BSTNode = { value: 10, left: undefined, right: value12 };
const root: BSTNode = { value: 8, left: value3, right: value10 };

printTree(root);
