export function walk() {
    return 'todo'
}
// import { parse, ExpressionNode, Node } from "./parse.ts";
// import { tokenize } from "./tokenize.ts";



// function walkNode(
//   node: Node,
//   { enter, parent }: { enter: EnterFunction; parent: Node }
// ) {


//   if (!parent) parent = node;
//   node = enter({ type: node.type, node, parent }) ?? node;
//   if (node.type === "Expression" || node.type === "Root") {
//     node.children = node.children.map((child: Node) => {
//       return walkNode(child, { enter, parent: node });
//     });
//   } else if(node.type === 'If') {
//     node.expression = walkNode(node.expression, {enter, parent: node})
//     node.if = walkNode(node.if, {enter, parent: node})
//     node.else = walkNode(node.else, {enter, parent: node})
//   } else if(node.type === 'Eq') {
//     node.left = walkNode(node.left, {enter, parent: node})
//     node.right = walkNode(node.right, {enter, parent: node})
//   }
//   return node
// }

// type EnterFunction = (option: {
//   type: string;
//   node: Node;
//   parent?: Node;
// }) => void;

// function walk(node: Node, options: { enter: EnterFunction } | EnterFunction) {
//   if (typeof options === "object") {
//     return walkNode(node, { enter: options.enter, parent: node });
//   } else {
//     return walkNode(node, { enter: options, parent: node });
//   }
// }

// const ast = parse(tokenize("(print (if (eq (4 % 2) 0) even odd))"));

// const newAst = walk(ast, ({ type, node, parent }) => {
//   if (node.type === "Expression") {
//     if (node.children[0].type === "String") {
//       if (node.children[0].value === "if") {
//         console.log(node);
//         return {
//           type: "If",
//           expression: node.children[1],
//           if: node.children[2],
//           else: node.children[3],
//         };

//         // replace with if node
//       } else if (node.children[0].value === "eq") {
//         return {
//           type: "Eq",
//           left: node.children[1],
//           right: node.children[2],
//         };

//         // replace with if node
//       }
//     }
//   }

//   return node;
//   //   console.log("Parent: ", parent);
//   // console.log("Enter: ", type);
//   // console.log("Node: ", node);
// });


// let result = ''

// walk(newAst, ({type, node}) => {

//     function get(node: Node) {
//         if(node.type === 'Number') {
//             result += `${node.value}`
//         } else if(node.type === 'String') {
//             result += node.value
//         } else if(node.type === 'If') {
//             result += `if(${get(node.expression)}) {${get(node.if)}} else {${get(node.else)}}`
//         } else if(node.type === 'Eq') {
//             result += `${get(node.left)} === ${get(node.right)}`
//         } else if(node.type === 'Expression') {
//             result += node.children.map(child => get(child)).join(' ')
//         } else if(node.type === 'Root') {
//             result += node.children.map(child => get(child)).join(';\n')
//         } else {
//             console.log(node)
//         }
//     }

//     get(newAst)
//     console.log(result)
    
// })

// console.log(newAst);
// console.log(newAst.children[0].children);
