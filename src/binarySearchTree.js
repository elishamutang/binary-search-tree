import mergeSort from 'mergesort-by-eli'
import { prettyPrint } from './prettyPrint.js'

function node(data) {
    return {
        data: parseInt(data),
        left: null,
        right: null,
    }
}

function tree(array) {
    return {
        root: buildTree(array),

        insert(value) {
            let newNode = node(value)
            let tmp = this.root

            const getRoot = (newNode, tmp) => {
                if (tmp.left === null && tmp.right === null) {
                    return tmp
                }

                // If tmp.left or tmp.right is null, return tmp. Else, call getRoot() function to traverse down the tree.
                if (newNode.data < tmp.data) {
                    tmp = tmp.left === null ? tmp : getRoot(newNode, tmp.left)
                } else if (newNode.data > tmp.data) {
                    tmp = tmp.right === null ? tmp : getRoot(newNode, tmp.right)
                }

                return tmp
            }

            let nodeRoot = getRoot(newNode, tmp)

            if (newNode.data < nodeRoot.data) {
                nodeRoot.left = newNode
            } else if (newNode.data > nodeRoot.data) {
                nodeRoot.right = newNode
            } else {
                throw new Error('Identical val')
            }
        },

        deleteItem(value) {
            let tmp = this.root
            let prev

            const findPrevNode = (value, tmp) => {
                if (value === tmp.data) {
                    return
                }

                if (value < tmp.data) {
                    prev = tmp
                    tmp = findPrevNode(value, tmp.left)
                } else {
                    prev = tmp
                    tmp = findPrevNode(value, tmp.right)
                }

                return prev
            }

            // prevNode is the node before the value that is deleted. (e.g prevNode of value 4 is 8.)
            let prevNode = findPrevNode(value, tmp)
            let nodeToDelete = this.find(value)

            // Case 1: No child
            if (nodeToDelete.right === null && nodeToDelete.left === null) {
                if (nodeToDelete.data < prevNode.data) {
                    prevNode.left = null
                } else {
                    prevNode.right = null
                }
            } else if (nodeToDelete.right === null || nodeToDelete.left === null) {
                // Case 2: One child
                let nodeToLink = nodeToDelete.right !== null ? nodeToDelete.right : nodeToDelete.left

                if (nodeToDelete.data < prevNode.data) {
                    prevNode.left = nodeToLink
                } else {
                    prevNode.right = nodeToLink
                }
            } else {
                // Case 3: Two children
                // Method: Take minimum of right subtree of node that is going to be deleted.
                let minNode = nodeToDelete.right

                while (minNode.left !== null) {
                    minNode = minNode.left
                }

                // Recursively call deleteItem on minNode
                this.deleteItem(minNode.data, tmp)
                nodeToDelete.data = minNode.data
            }
        },

        find(value) {
            let newNode = node(value)
            let tmp = this.root

            const traverse = (newNode, tmp) => {
                if (newNode.data === tmp.data) {
                    return tmp
                }

                if (newNode.data < tmp.data) {
                    tmp = traverse(newNode, tmp.left)
                } else {
                    tmp = traverse(newNode, tmp.right)
                }

                return tmp
            }

            try {
                return traverse(newNode, tmp)
            } catch {
                throw new Error('Value does not exist.')
            }
        },
    }
}

// Returns root element (level-0) of array.
function buildTree(array) {
    // Base case
    let start = 0
    let end = array.length - 1

    if (start > end) {
        return null
    }

    let midpoint = parseInt((array.length - 1) / 2)
    let newNode = node(array[midpoint])

    newNode.left = buildTree(array.slice(0, midpoint))
    newNode.right = buildTree(array.slice(midpoint + 1))

    return newNode
}

// BSTs work only for a sorted array, hence we will have to do a merge sort on the passed array and remove any duplicates.
const unsortedArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const sortedArr = mergeSort(unsortedArr)

const noDuplicates = sortedArr.filter((elem, idx) => {
    return sortedArr.indexOf(elem) === idx
})

const rootNode = tree(noDuplicates)

rootNode.insert(6)

// INSERTION
// rootNode.insert(10)
// rootNode.insert(0)
// rootNode.insert(2)
// rootNode.insert(11)
// rootNode.insert(200)

// REMOVAL
// rootNode.deleteItem(6)
// rootNode.deleteItem(23)
// rootNode.deleteItem(6345)
// rootNode.deleteItem(1)
// rootNode.deleteItem(9)
// rootNode.deleteItem(324)
// rootNode.deleteItem(5)
// rootNode.deleteItem(4)
// rootNode.deleteItem(67)
// rootNode.deleteItem(324)
// rootNode.deleteItem(8)
// rootNode.deleteItem(9)
// rootNode.deleteItem(67)
// rootNode.deleteItem(4)
// rootNode.deleteItem(5)
// rootNode.deleteItem(6)
// rootNode.deleteItem(67)
// rootNode.deleteItem(324)
// rootNode.deleteItem(8)
// rootNode.deleteItem(1)
// rootNode.deleteItem(5)
// rootNode.deleteItem(3)

// FIND
// console.log(rootNode.find(6))
prettyPrint(rootNode.root)
