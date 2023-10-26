# Svelte Modal Custom Element

This repository contains a project for a modal custom element created with Svelte.

[Codepen example](https://codepen.io/whoisyeshua/full/ExrVwvx)

## Installation

```bash
npm i @whoisyeshua-svelte/modal-custom-element
```

## Usage

### Svelte Projects

You can import and use it as normal svelte component (don\`t forget to add **`/svelte`** at the end of the package name):

```svelte
<script lang="ts">
  import { Modal } from '@whoisyeshua-svelte/modal-custom-element/svelte'

  let open = false
</script>

<Modal {open} on:close={() => open = false}>
  <h2 style="margin: 0" slot="header">Header</h2>
  <p>Main content</p>
</Modal>
<button on:click={() => open = true}>Show</button>
```

### ESM projects

You can connect and use it like custom element (`<svelte-modal>` tag):

your `html`:

```html
<body>
  <button id="open-modal">Open modal</button>
  <svelte-modal>
    <h2 slot="header" style="margin: 0">Header</h2>
    <p>This is some slotted content</p>
  </svelte-modal>
  <style>
    /* hide while the script is loading and element is not defined */
    svelte-modal:not(:defined) {
      display: none;
    }
  </style>
  <script type="module" src="/src/main.ts"></script>
</body>
```

your entrypoint `/src/main.ts` or `/src/main.js` file:

```ts
import '@whoisyeshua-svelte/modal-custom-element/esm'

const modal = document.querySelector('svelte-modal')!
const openModalBtn = document.querySelector('#open-modal')!

const handleOpen = () => {
  modal.open = true
}
const handleClose = () => {
  modal.open = false
}
openModalBtn.addEventListener('click', handleOpen)
modal.addEventListener('close', handleClose) // or modal.onClose = handleClose
```

_`@whoisyeshua-svelte/modal-custom-element` under the hood define custom component (`<svelte-modal>`), so you could use it from start_

or like regular svelte component construcotr:

```ts
import { Modal } from '@whoisyeshua-svelte/modal-custom-element/esm'

let open = false

new Modal({
  target: document.body,
  props: {
    // component props go here
    open,
    onClose: () => (open = true)
  }
})
```

- Note that this esm build relies on your bundler (vite, rollup, webpack and etc), it comes without the `svelte` package built in, so your builder will have to add it. For this purpose we set `svelte@^4.0.0` to `peerDependencies`.

### Vanila HTML / JS (through `<script>` tag)

CDN URL - https://cdn.jsdelivr.net/npm/@whoisyeshua-svelte/modal-custom-element@1.0.3

```html
<script src="https://cdn.jsdelivr.net/npm/@whoisyeshua-svelte/modal-custom-element@1.0.3"></script>
```

full code example:

```html
<body>
  <button id="open-modal">Open modal</button>
  <svelte-modal>
    <h2 slot="header" style="margin: 0">Header</h2>
    <p>This is some slotted content</p>
  </svelte-modal>
  <style>
    /* hide while the script is loading and element is not defined */
    svelte-modal:not(:defined) {
      display: none;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/@whoisyeshua-svelte/modal-custom-element@1.0.3"></script>
  <script>
    const modal = document.querySelector('svelte-modal')
    const openModalBtn = document.querySelector('#open-modal')

    const handleOpen = () => {
      modal.open = true
    }
    const handleClose = () => {
      modal.open = false
    }
    openModalBtn.addEventListener('click', handleOpen)
    modal.addEventListener('close', handleClose)
  </script>
</body>
```

## Customizing

**Customizing svelte-modal CSS**:
You can override the CSS custom properties within a parent component or your project's main CSS file to customize the appearance of the `svelte-modal` web component. Here's an example of how to override some of the custom properties:

```css
svelte-modal {
  --svelte-modal-dialog-w: 40em;
  --svelte-modal-dialog-br: 2em;
  --svelte-modal-dialog-backdrop-bg: rgba(0, 0, 0, 0.5);
}
```

**List of CSS Custom Properties**:

- `--svelte-modal-dialog-w`: Controls the width of the dialog. Default value is `clamp(20em, 33vw, 32em)`.
- `--svelte-modal-dialog-br`: Controls the border radius of the dialog. Default value is `1em`.
- `--svelte-modal-dialog-backdrop-bg`: Controls the background of the dialog's backdrop. Default value is `hsla(0 0% var(--lightness) / 30%)`.
- `--svelte-modal-dialog-backdrop-filter`: Controls the filter of the dialog's backdrop. Default value is `blur(10px)`.
- `--svelte-modal-dialog-padding`: Controls the padding inside the dialog's div. Default value is `1em`.
- `--svelte-modal-header-container-gap`: Controls the gap between items in the header container. Default value is `1em`.
- `--svelte-modal-button-w`: Controls the width of the close button. Default value is `32px`.
- `--svelte-modal-button-h`: Controls the height of the close button. Default value is `32px`.
- `--svelte-modal-button-br`: Controls the border radius of the close button. Default value is `100px`.
- `--svelte-modal-button-hover-bg`: Controls the background color of the close button on hover. Default value is `hsla(0 0% var(--lightness) / 10%)`.
- `--svelte-modal-button-active-bg`: Controls the background color of the close button on active. Default value is `hsla(0 0% var(--lightness) / 25%)`.

Each custom property provides a way to customize a specific aspect of the `svelte-modal` component's appearance. By overriding these custom properties, you can tailor the modal's look to better fit your project's design requirements.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Clone this repository to your local machine:

```bash
git clone https://github.com/whoisYeshua/svelte-modal-custom-element.git
```

Navigate to the project directory:

```bash
cd svelte-modal-custom-element
```

Install the necessary dependencies:

```bash
npm install
```

Build package:

```bash
npm run package
```

Publish package:

```bash
npm publish
```

## License

This project is licensed under the MIT License.
