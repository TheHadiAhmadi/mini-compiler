import { parse, tokenize } from "../src/compiler";

describe("parser", () => {
  it("should return Node", () => {
    const testTokens = tokenize("add(6, 4)");

    const ast = parse(testTokens);
    expect(ast.type).toBe("Root");
    expect(ast.children).toHaveLength(1);
  });

  it("sould parse expressions", () => {
    const testTokens = tokenize("add (2,5)");

    const ast = parse(testTokens);
    expect(ast.children[0]).toMatchObject({
      type: "Function",
      name: 'add',
      children: [
        {
          type: "Number",
          value: 2,
        },
        {
          type: "Number",
          value: 5,
        },
      ],
    });
  });

  it("sould parse a complex expressions", () => {
    const testTokens = tokenize(
      "add (2 sub (5 0 -2 test(123 42)) ds (123 -24))"
    );

    const ast = parse(testTokens);
    expect(ast).toMatchObject({
      type: "Root",
      children: [
        {
          type: "Function",
          name: 'add',
          children: [
            {
              type: "Number",
              value: 2,
            },
            {
              type: "Function",
              name: 'sub',
              children: [
                  {
                      type: "Number",
                      value: 5
                  },
                  {
                      type: "Number",
                      value: 0
                  },
                  {
                      type: "Number",
                      value: -2
                  },
                  {
                    type: "Function",
                    name: 'test',
                    children: [
                        {
                            type: "Number",
                            value: 123
                        },
                        {
                            type: "Number",
                            value: 42
                        },
                    ]
                  },
              ]
            },
            {
                type: "Function",
                name: 'ds',
                children: [
                    {
                        type: "Number",
                        value: 123
                    },
                    {
                        type: "Number",
                        value: -24
                    },
                ]
              }
          ],
        },
      ],
    });
  });
});
