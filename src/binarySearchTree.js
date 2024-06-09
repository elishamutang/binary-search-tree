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
            let tmp = rootNode.root

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

        deleteItem(value) {},

        find(value) {},
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
rootNode.insert(10)
rootNode.insert(0)
rootNode.insert(2)
rootNode.insert(11)
rootNode.insert(200)
prettyPrint(rootNode.root)
