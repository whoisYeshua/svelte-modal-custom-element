import { build } from 'esbuild'
import sveltePlugin from 'esbuild-svelte'

const svelte = sveltePlugin({
  compilerOptions: {
    css: 'injected',
    customElement: true
  }
})

/** @type {import('esbuild').BuildOptions} */
const commonBuildParams = {
  entryPoints: ['src/lib/index.js'],
  minify: true,
  sourcemap: false,
  plugins: [svelte],
  bundle: true
}

// Build IIFE with pack in svelte packages
build({
  ...commonBuildParams,
  outfile: 'dist/iife/svelte-modal-custom-element.min.js',
  format: 'iife'
  // globalName: '_svelteModal',   // Set the name of the global variable to access the module
  // footer: {
  //   js: `var Modal = _svelteModal.default`
  // }
})

// Build ESM without pack in svelte packages
build({
  ...commonBuildParams,
  outdir: 'dist/esm',
  format: 'esm',
  external: ['svelte*']
  // packages: 'external', // since we want to extern only svelte packages, doesnt use it
})
