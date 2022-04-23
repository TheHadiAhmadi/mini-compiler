import type {
  FunctionCallNode,
  Node,
  NumberNode,
  RootNode,
  StringNode,
} from "./parse.js";

let consoleResult = ""

type functionType<T> = (args: T) => string | number | (string | number)[];

const functionsMap = new Map<string, functionType<any>>();
const variablesMap = new Map<string, any>();

functionsMap.set("set", (args: any[]) => {
  variablesMap.set(args[0], args[1]);
  return args[1];
});
functionsMap.set("get", (args: any[]) => variablesMap.get(args[0]));
functionsMap.set("add", (args: number[]) => args[0] + args[1]);
functionsMap.set("sub", (args: number[]) => args[0] - args[1]);
functionsMap.set("mul", (args: number[]) => args[0] * args[1]);
functionsMap.set("div", (args: number[]) => args[0] / args[1]);
functionsMap.set("print", (args: any[]) => {
    consoleResult += args + '\n'
  return args.join(" ");
});

function interpretFunction(node: FunctionCallNode): any {
  // add,sub,mul,div,print,set
  if (functionsMap.has(node.name)) {
    // function call
    const args: Node[] = node.children.map(interpret);
    return functionsMap.get(node.name)?.(args);
  } else {
    return node.children.map(interpret);
  }
  // return node.children.map(interpret)
}

function interpretNumber(node: NumberNode): number {
  return node.value;
}

function interpretString(node: StringNode): string {
  if (variablesMap.has(node.value)) {
    return variablesMap.get(node.value);
  }
  return node.value;
}

function interpretRoot(node: RootNode): string {
  return node.children.map(interpret).join("\n");
}

function interpret(node: Node) {
  console.log("interpret", node);
  switch (node.type) {
    case "Root":
      return interpretRoot(node);
    case "Function":
      return interpretFunction(node);
    case "String":
      return interpretString(node);
    case "Number":
      return interpretNumber(node);
    default:
      throw new Error("Cannot interpret." + node.type);
  }
}

export function interpreter(ast: Node) {
  interpret(ast);

  return consoleResult;
}
