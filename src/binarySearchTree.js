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

            let prevNode = findPrevNode(value, tmp)
            let nodeToDelete = this.find(value)

            // Case 1: No child
            if (nodeToDelete.right === null && nodeToDelete.left === null) {
                if (nodeToDelete.data < prevNode.data) {
                    prevNode.left = null
                } else {
                    prevNode.right = null
                }
            } else if (nodeToDelete.right !== null || nodeToDelete.left !== null) {
                // Case 2: One child
                let nodeToLink = nodeToDelete.right !== null ? nodeToDelete.right : nodeToDelete.left

                if (nodeToDelete.data < prevNode.data) {
                    prevNode.left = nodeToLink
                } else {
                    prevNode.right = nodeToLink
                }
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
// rootNode.deleteItem(9)
// rootNode.deleteItem(324)

// FIND
// console.log(rootNode.find(6))
prettyPrint(rootNode.root)
