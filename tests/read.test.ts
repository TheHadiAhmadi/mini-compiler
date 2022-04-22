import fs from 'fs/promises'
import {read} from '../src/compiler'



describe("read", () => {
    it('should read contents of file', async () => {
        const src = "tests/test-source.mal"
        const content = await read(src)

        expect(content).toMatch('(add 2 4)')
    })

    it('should throw error if file not found', async () => {
        const src = "tests/not-found-source.mal"
        expect(() => read(src)).rejects.toThrow()
    })
})
