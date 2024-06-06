import mergeSort from 'mergesort-by-eli'
import { prettyPrint } from './prettyPrint.js'

function node(data) {
    return {
        data,
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

            while (tmp.left !== null || tmp.right !== null) {
                if (newNode.data < tmp.data) {
                    tmp = tmp.left
                } else {
                    tmp = tmp.right
                }
            }

            if (newNode.data < tmp.data) {
                tmp.left = newNode
            } else {
                tmp.right = newNode
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

rootNode.insert(10)
prettyPrint(rootNode.root)
