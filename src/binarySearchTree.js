function node(data) {
    return {
        data,
        left: null,
        right: null,
    }
}

function tree(array) {
    let root
}

function buildTree(array) {
    // BSTs work only for a sorted array, hence we will have to do a merge sort on the passed array.
}

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

console.log(buildTree(testArr))
