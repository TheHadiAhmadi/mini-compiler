import type {ExpressionNode, Node, NumberNode, RootNode, StringNode} from './parse.js'

type functionType<T> = (args: T) => string | number | (string|number)[]

const functionsMap = new Map<string,functionType<any>>()

functionsMap.set('add', (args: number[]) => args[0] + args[1])
functionsMap.set('sub', (args: number[]) => args[0] - args[1])
functionsMap.set('mul', (args: number[]) => args[0] * args[1])
functionsMap.set('div', (args: number[]) => args[0] / args[1])
functionsMap.set('print', (args: any[]) => {console.log(args); return args.join(' ')})


export function interpreter(ast: Node) {

    if(ast.type !== 'Root') {

        return interpret(ast);
    }

    // function call => 1: fn name, 2, 3, 4, 5,... => arguments
    function interpretExpression(node: ExpressionNode): any {
        // add,sub,mul,div,print
        if(node.children[0].type === 'String') {
            if(functionsMap.has(node.children[0].value)) {
                // function call
                const args: any[] = node.children.slice(1).map(node => interpret(node));
                return functionsMap.get(node.children[0].value)?.(args)
            } else {
                return node.children.map(interpret)
            }
        } else {
            return node.children.map(interpret)
        }
        
    }

    function interpretNumber(node: NumberNode): number {
        return node.value
    }

    function interpretString(node: StringNode): string {
        return node.value
    }

    function interpretRoot(node: RootNode): string {
        return node.children.map(interpret).join('\n')
    }

    function interpret(node: Node) {
        switch(node.type) {
            case 'Root': return interpretRoot(node);
            case 'Expression': return interpretExpression(node);
            case 'String': return interpretString(node);
            case 'Number': return interpretNumber(node);
            default: throw new Error("Cannot interpret.");
        }
    }

  
    return interpret(ast)
}