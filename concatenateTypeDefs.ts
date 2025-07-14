import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Concatenates all Svelte TypeScript definition files into a single index.d.ts file and place in the `esm` directory.
 *
 * This function:
 * 1. Reads all `svelte.d.ts` files from the `/dist/svelte` directory
 * 2. Processes each file to replace 'export default class' with 'export class'
 * 3. Concatenates all processed content with proper spacing
 * 4. Writes the result to `/dist/esm/index.d.ts`
 *
 * The processing step ensures compatibility with ES modules by converting
 * default class exports to named exports.
 */
async function concatenateTypeDefs() {
  const sourceDir = path.join(import.meta.dirname, '/dist/svelte')
  const targetFile = path.join(import.meta.dirname, '/dist/esm/index.d.ts')

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
