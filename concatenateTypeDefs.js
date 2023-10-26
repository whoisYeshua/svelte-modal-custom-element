import fs from 'fs/promises'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

async function concatenateTypeDefs() {
  const sourceDir = path.join(__dirname, '/dist/svelte')
  const targetFile = path.join(__dirname, '/dist/esm/index.d.ts')

  try {
    // Ensure the target directory exists
    const targetDir = path.dirname(targetFile)
    await fs.mkdir(targetDir, { recursive: true })

    // Read the files in the source directory
    const files = await fs.readdir(sourceDir)
    const typeDefFiles = files.filter(file => file.endsWith('svelte.d.ts'))

    let content = ''

    // Concatenate content of each .d.ts file
    for (let file of typeDefFiles) {
      const filePath = path.join(sourceDir, file)
      const fileContent = await fs.readFile(filePath, 'utf8')
      const processedContent = fileContent.replace('export default class', 'export class')
      content += processedContent + '\n\n' // Add a newline for separation
    }

    // Write the concatenated content to the target file
    await fs.writeFile(targetFile, content, 'utf8')

    console.log('All .d.ts files concatenated successfully!')
  } catch (error) {
    console.error('An error occurred:', error.message)
  }
}

concatenateTypeDefs()
