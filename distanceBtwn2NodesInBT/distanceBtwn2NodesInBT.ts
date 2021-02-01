class TreeNode {
    left:TreeNode|null;
    right:TreeNode|null;
    val:number;

    constructor(left:TreeNode|null, right:TreeNode|null, val:number) {
        this.left = left;
        this.right = right;
        this.val = val;
    }

    toString() {
        return this.val;
    }
}

const lowestCommonAncestor = (root:TreeNode|null, nodeA:TreeNode|null, nodeB:TreeNode|null):TreeNode|null => {
    if (root == null) {
        return null;
    }
    if (root == nodeA || root == nodeB) {
        return root;
    }
    const leftLCA:TreeNode|null = lowestCommonAncestor(root.left, nodeA, nodeB);
    const rightLCA:TreeNode|null = lowestCommonAncestor(root.right, nodeA, nodeB);
    if ((leftLCA != null) && (rightLCA != null)) {
        return root;
    }
    if ((leftLCA == null) && (rightLCA == null)) {
        return null;
    }
    return (leftLCA != null) ? leftLCA : rightLCA;
}

/**
 * Calculates the distance between rootNode and childNode.
 * @param rootNode The root node.
 * @param childNode The possible child node under root node.
 * @param level The current distance as calculated from the caller.
 */
const distance = (rootNode:TreeNode|null, childNode:TreeNode, level:number = 0):number => {
    if (rootNode == null) {
        return -1;
    } else if (rootNode == childNode) {
        return level;
    } else {
        const branchDistance = distance(rootNode.left, childNode, level+1);
        if (branchDistance == -1) {
            return distance(rootNode.right, childNode, level+1);
        }
        return branchDistance;
    }
}

// Example Tree
//         3
//        / \
//       6   8
//      / \   \
//     2   11  13
//        / \  /
//       9   5 7

const node2 = new TreeNode(null, null, 2);
const node9 = new TreeNode(null, null, 9);
const node5 = new TreeNode(null, null, 5);
const node11 = new TreeNode(node9, node5, 11);
const node6 = new TreeNode(node2, node11, 6);

const node7 = new TreeNode(null, null, 7);
const node13 = new TreeNode(node7, null, 13);
const node8 = new TreeNode(null, node13, 8);

const node3 = new TreeNode(node6, node8, 3);

const lca = lowestCommonAncestor(node3, node2, node5)
console.log(`Lowest Common Ancestor is ${lca!.toString()}`);
const distanceBetweenNodes = distance(lca, node2)+distance(lca, node5);
console.log(`Distance between two nodes are ${distanceBetweenNodes}`);
