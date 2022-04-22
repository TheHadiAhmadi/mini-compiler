# mini-compiler

a simple compiler (actually interpreter) which can calculate basic mathematics expressions.

currently supports addition, subtraction, multiplications and division.

I have plan to add functions, loops and if statements in future
If you want to contribute, you can open new Issue or Pull Request.

## usage
you can use it from https://mini-compiler.surge.sh

```
(add 1 2) ; => 1 + 2


(mul (add 1 2) 2) ; => (1 + 2) * 2

...
```

for more examples you can view https://mini-compiler.surge.sh

## How it works?
first of all source code should split to tokens

```
(add 1 2) 
```
becomes
```
[
  {type: 'paren', value: '('},
  {type: 'text', value: "add"},
  {type: 'number', value: 1},
  {type: 'number', value: 2},
  {type: 'paren', value: ')'},
]
```

then parser will transform array of tokens to AST (Abstract Syntax Tree)

```
{
  type: "Root",
  children: [
    {
      type: "Expression",
      children: [
        {
          type: "String",
          value: "Add"
        },
        {
          type: "Number",
          value: 1
        },
        {
          type: "Number",
          value: 2
        }
      ]
    }
  ]
}
```

at the end interpreter will run the program  
``` 
3 
```

simple? :)

TODO: write how interpreter works
