export type Token =
  | { type: "number"; value: number }
  | { type: "text"; value: string }
  | { type: "paren"; value: "(" | ")" };


function isString(char: string) : boolean {
  return !!char.match(/[A-Z_]/i);
}
function isNumber(char: string) : boolean {
  return !!char.match(/[-0-9]/i);
}

function isParenthesis(char: string) : boolean {
  return char === "(" || char === ")";
}

function isComment(char: string): boolean {
  return char === ';'
}

export function tokenize(source: string) {
  let content = source;

  function nextChar() {
    const result = content[0];
    content = content.slice(1);
    return result;
  }
  function nextLine() {
    content = content.slice(content.indexOf('\n'))
    return 0;
  }

  function nextPattern(pattern: RegExp) {
      const result = content.match(pattern)?.[0];
      content = content.slice(result?.length);
    return result;
  }

  const tokens: Token[] = [];

  while (content.length > 0) {
    const char = content[0];
    if (isParenthesis(char)) {
      tokens.push({ type: "paren", value: nextChar() as '(' || ')' });
    } else if (isString(char)) {
      const value = nextPattern(/\w*/g);
      tokens.push({
        type: "text",
        value: value ?? '',
      });
    } else if (isNumber(char)) {
      const value = nextPattern(/-?[0-9]\d*/g);
      tokens.push({
        type: "number",
        value: Number(value),
      });
    } else if([' ', '\t', '\n', '\r'].includes(char)) {
      nextChar();
    }
    else if(isComment(char)) {
      nextLine()
      
    } else {
      content = content.slice(1);
    }
  }
  return tokens;
}
