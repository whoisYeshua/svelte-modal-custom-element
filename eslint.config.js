// @ts-check
import prettier from 'eslint-config-prettier'
import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
  globalIgnores([
    // dependencies
    'package.json',
    'package-lock.json',
    // build
    'dist',
    'build',
    '.svelte-kit',
    'package',
    'public',
    'src/index.d.ts',
    // code editors
    '.idea',
    '.vscode',
    // misc
    '**/.DS_Store',
    'eslint.config.js'
  ]),
  js.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  }
]
