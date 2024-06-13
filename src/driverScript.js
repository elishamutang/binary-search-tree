import binarySearchTree from './binarySearchTree.js'
import { prettyPrint } from './prettyPrint.js'
import mergeSort from 'mergesort-by-eli'

// Generates random numbers on refresh.
function randomNum(length) {
    let arr = []

    while (arr.length < length) {
        let num = Math.floor(Math.random() * 50)
        arr.push(num)
    }

    return arr
}

let randomArr = randomNum(20)

// BSTs only work for sorted array, hence we have to do a merge sort to produce a sorted array so we can pass into our buildTree function.
let sortedRandomArr = mergeSort(randomArr)

// Remove duplicates
sortedRandomArr = sortedRandomArr.filter((elem, idx) => {
    return sortedRandomArr.indexOf(elem) === idx
})

// Build tree
let tree = binarySearchTree(sortedRandomArr)

// Confirm if tree is balanced.
// console.log(tree.isBalanced())

// Print elements in pre-order, in-order, and post-order traversal.
// console.log(tree.preOrder())
// console.log(tree.inOrder())
// console.log(tree.postOrder())

// Add more numbers to unbalance the tree.
tree.insert(250)
tree.insert(400)

// prettyPrint(tree.root)
// console.log(tree.isBalanced())

// Rebalance tree
const rebalanced = tree.rebalance()
prettyPrint(rebalanced.root)
console.log(rebalanced.isBalanced())

// Re-print balanced tree in level, pre, post and in order traversals.
// console.log(rebalanced.levelOrder())
// console.log(rebalanced.preOrder())
// console.log(rebalanced.inOrder())
// console.log(rebalanced.postOrder())
