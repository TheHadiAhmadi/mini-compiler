import './style.css'

import {parse, tokenize} from './compiler'

console.log('main')
console.log(parse(tokenize('(add 3 6)')))