#!/usr/bin/env node
import { Command } from 'commander'
import { updateText, removeText } from 'markdown-multilevel-numbering'
import { readFile, writeFile } from 'node:fs/promises'

const version = '1.1.9'

const program = new Command()

program
  .name('mmn')
  .description('Markdown Multilevel Numbering CLI')
  .version(version, '-v, --version')

program
  .command('update', { isDefault: true })
  .description('Add multilevel numbering to markdown')
  .argument('[text]', 'Input markdown text')
  .option('-i, --input <file>', 'Read input from file')
  .option('-o, --output <file>', 'Output to file (default: stdout)')
  .action(async (text: string | undefined, opts: { input?: string; output?: string }) => {
    let content

    try {
      if (text !== undefined) {
        content = text
      } else if (opts.input) {
        content = await readFile(opts.input, 'utf-8')
      } else if (!process.stdin.isTTY) {
        content = await new Promise((resolve, reject) => {
          let data = ''
          process.stdin.on('data', chunk => data += chunk)
          process.stdin.on('end', () => resolve(data))
          process.stdin.on('error', reject)
        })
      } else {
        console.error('Error: Please provide text argument or use -i to specify input file')
        process.exit(1)
      }

      const result = updateText(content)

      if (opts.output) {
        await writeFile(opts.output, result, 'utf-8')
      } else {
        process.stdout.write(result)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.error(`Error: ${message}`)
      process.exit(1)
    }
  })

program
  .command('remove')
  .description('Remove multilevel numbering from markdown')
  .argument('[text]', 'Input markdown text')
  .option('-i, --input <file>', 'Read input from file')
  .option('-o, --output <file>', 'Output to file (default: stdout)')
  .action(async (text: string | undefined, opts: { input?: string; output?: string }) => {
    let content

    try {
      if (text !== undefined) {
        content = text
      } else if (opts.input) {
        content = await readFile(opts.input, 'utf-8')
      } else if (!process.stdin.isTTY) {
        content = await new Promise((resolve, reject) => {
          let data = ''
          process.stdin.on('data', chunk => data += chunk)
          process.stdin.on('end', () => resolve(data))
          process.stdin.on('error', reject)
        })
      } else {
        console.error('Error: Please provide text argument or use -i to specify input file')
        process.exit(1)
      }

      const result = removeText(content)

      if (opts.output) {
        await writeFile(opts.output, result, 'utf-8')
      } else {
        process.stdout.write(result)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.error(`Error: ${message}`)
      process.exit(1)
    }
  })

program.parse()
