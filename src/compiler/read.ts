import fs from 'fs/promises'

export async function read(src: string) {
    try{
        const content = await fs.readFile(src, 'utf-8')
        return content;
    } catch(err) {
        console.log("caught error")
        throw err
    }
}
