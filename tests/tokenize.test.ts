import {tokenize} from '../src/compiler'

describe('tokenize', () => {
    it('should return empty array for empty content', () => {
        const tokens = tokenize("")

        expect(Array.isArray(tokens)).toBe(true)
        expect(tokens).toHaveLength(0)
    })

    it('should detect paranthesis', () => {

        let tokens = tokenize('(')

        expect(tokens).toHaveLength(1)
        expect(tokens[0]).toMatchObject({
            type: 'paren',
            value: '('
        })

        tokens = tokenize('((()')

        expect(tokens).toHaveLength(4)
        expect(tokens[2]).toMatchObject({
            type: 'paren',
            value: '('
        }) 
        expect(tokens[3]).toMatchObject({
            type: 'paren',
            value: ')'
        })
    })

    it('should detect text string', () => {

        let tokens = tokenize('sdf');
        
        expect(tokens).toHaveLength(1)
        expect(tokens[0]).toMatchObject({
            type: 'text',
            value: 'sdf'
        })

        tokens = tokenize('(sdf)ress(');
        console.log(tokens)
        
        expect(tokens).toHaveLength(5)
        expect(tokens[0]).toMatchObject({
            type: 'paren',
            value: '('
        })

        expect(tokens[3]).toMatchObject({
            type: 'text',
            value: 'ress'
        })
    })

    it('should detect numbers', () => {
        const tokens = tokenize('43')

        expect(tokens).toHaveLength(1)
        expect(tokens[0]).toMatchObject({
            type: 'number',
            value: 43
        })
    })

    it('should support negative numbers', () => {
        const tokens = tokenize('(-432)');
        console.log(tokens)

        expect(tokens).toHaveLength(3);
        expect(tokens[1]).toMatchObject({
            type: 'number',
            value: -432

        })
    })
})