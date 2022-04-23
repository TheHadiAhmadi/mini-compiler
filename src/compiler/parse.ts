import { Token, tokenize } from "./";

export type ExpressionNode = {
  type: "Expression";
  children: Node[];
};

export type StringNode = {
  type: "String";
  value: string;
};

export type NumberNode = {
  type: "Number";
  value: number;
};

export type FunctionCallNode = {
  type: "Function";
  name: string;
  children: Node[];
};

export type RootNode = {
  type: "Root";
  children: Node[];
};

export type EqNode = {
  type: "Eq";
  left: ExpressionNode;
  right: ExpressionNode;
};

export type IfNode = {
  type: "If";
  expression: ExpressionNode;
  if: Node;
  else: Node;
};
export type Node =
  | ExpressionNode
  | NumberNode
  | RootNode
  | StringNode
  | IfNode
  | FunctionCallNode
  | EqNode;

export function parse(tokens: Token[]): RootNode {
  console.log({ tokens });
  function next(): Token {
    return tokens.shift()!;
  }

  function hasNext(): boolean {
    return tokens.length > 0;
  }

  function peek(index = 0): Token {
    return tokens[index];
  }

  function parseText(): StringNode {
    return {
      type: "String",
      value: next().value as string,
    };
  }

  function parseNumber(): NumberNode {
    return {
      type: "Number",
      value: next().value as number,
    };
  }

  function parseArguments() {
    const result = [];
    next()
    while (hasNext() && !(peek().type === "paren" && peek().value === ")")) {
      const nextToken = peek();
      if (nextToken.type === "number") result.push(parseNumber());
      else if (nextToken.type === "text") {
        result.push(parseExpression());
      }
    }
    next()
    return result;
  }

  function parseFunctionCall(): FunctionCallNode {
        return {
          type: 'Function',
          name: next().value as string,
          children: parseArguments() 
        }
      
  }

  function parseExpression(): Node {

    if (peek().type === "text") {
      if (peek(1).type === "paren" && peek(1).value === "(") {
        return parseFunctionCall()
      }
      else {
        return parseText()
      }
    } else if(peek().type === 'number') {
      return parseNumber()
    } else {
      throw new Error('Not Handled' + JSON.stringify(tokens))
    }
  }

  const expressions: Node[] = [];

  while (hasNext()) {
    expressions.push(parseExpression());
  }

  return {
    type: "Root",
    children: expressions,
  };
}

const ast = parse(tokenize("add (1 add(3 2))"));
console.log(ast)
console.log(ast.children)
