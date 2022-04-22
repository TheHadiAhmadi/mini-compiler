import { Token } from "./tokenize";

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

export type RootNode = {
  type: "Root";
  children: ExpressionNode[];
};

export type Node = ExpressionNode | NumberNode | RootNode | StringNode;

export function parse(tokens: Token[]): RootNode {
  function next(): Token {
    return tokens.shift()!;
  }

  function hasNext(): boolean {
    return tokens.length > 0;
  }

  function peek(): Token {
    return tokens[0];
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

  function parseExpression(): ExpressionNode {
    const children: Node[] = [];

    next(); // skip '('

    while (hasNext() && !(peek().type === "paren" && peek().value === ")")) {
      if (peek().type === "paren") {
        if (peek().value === "(") {
          children.push(parseExpression());
        } else if (peek().value === ")") {
          break;
        }
      } else if (peek().type === "text") {
        children.push(parseText());
      } else if (peek().type === "number") {
        children.push(parseNumber());
      }
    }
    next(); // skip ')'

    return {
      type: "Expression",
      children: children,
    };
  }

  const expressions: ExpressionNode[] = [];

  while (hasNext()) {
    expressions.push(parseExpression());
  }

  return {
    type: "Root",
    children: expressions,
  };
}
