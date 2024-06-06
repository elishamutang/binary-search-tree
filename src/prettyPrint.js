// Pretty print to visualize BT.
export const prettyPrint = (newNode, prefix = '', isLeft = true) => {
    if (newNode === null) {
        return
    }
    if (newNode.right !== null) {
        prettyPrint(newNode.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${newNode.data}`)
    if (newNode.left !== null) {
        prettyPrint(newNode.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
}
