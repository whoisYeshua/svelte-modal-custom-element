<svelte:options
  customElement={{
    tag: 'svelte-modal',
    props: {
      open: { reflect: true, type: 'Boolean' }
    }
  }} />

<script>
  import { createBubbler } from 'svelte/legacy'
  const closeBubbler = createBubbler()('close')

  /** @type {{ open: boolean, onclose: () => void }} */
  let { open = false, onclose = () => {} } = $props()

  /** @type {HTMLDialogElement} */
  let dialog

  $effect(() => {
    if (dialog && open) dialog.showModal()
  })

  /** @param {{ clientX: number, clientY: number }} e */
  const closeDialogOnOutsideClick = e => {
    if ('closedBy' in HTMLDialogElement.prototype) return

    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close()
    }
  }

  const handleClose = (/** @type {Event} */ e) => {
    closeBubbler(e)
    onclose()
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} onclose={handleClose} onclick={closeDialogOnOutsideClick} closedby="any">
  <div class="header-container">
    <slot name="header" />
    <button onclick={() => dialog.close()} aria-label="Close">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 8 8"
        aria-hidden="true"
        role="img"
        fill="currentColor"
        width="14"
        height="14">
        <path
          d="M5.238 4l2.456-2.457A.875.875 0 106.456.306L4 2.763 1.543.306A.875.875 0 00.306 1.544L2.763 4 .306 6.457a.875.875 0 101.238 1.237L4 5.237l2.456 2.457a.875.875 0 101.238-1.237z" />
      </svg>
    </button>
  </div>
  <slot />
</dialog>

<style>
  dialog {
    width: var(--svelte-modal-dialog-w, clamp(20em, 33vw, 32em));
    padding: var(--svelte-modal-dialog-padding, 1em);
    border-radius: var(--svelte-modal-dialog-br, 1em);
    border: none;
    @media (prefers-contrast: more) and (prefers-color-scheme: dark) {
      border: 2px solid white;
    }
    @media (prefers-contrast: more) and (prefers-color-scheme: light) {
      border: 2px solid black;
    }

    &::backdrop {
      --lightness: 0%;

      @media (prefers-color-scheme: dark) {
        --lightness: 30%;
      }

      background: var(--svelte-modal-dialog-backdrop-bg, hsl(0 0% var(--lightness) / 30%));
      backdrop-filter: var(--svelte-modal-dialog-backdrop-filter, blur(10px));

      @media (prefers-reduced-transparency) {
        background: var(--svelte-modal-dialog-backdrop-bg, hsl(0 0% var(--lightness) / 50%));
        backdrop-filter: var(--svelte-modal-dialog-backdrop-filter, blur(100px));
      }
    }
  }

  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }

    &::backdrop {
      animation: fade 0.2s ease-out;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    }
  }

  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--svelte-modal-header-container-gap, 1em);
  }

  button {
    --lightness: 0%;
    @media (prefers-color-scheme: dark) {
      --lightness: 100%;
    }
    --button-bg: var(--svelte-modal-button-bg, hsl(0 0% var(--lightness) / 0%));
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--svelte-modal-button-w, 32px);
    height: var(--svelte-modal-button-h, 32px);
    padding: 0;
    border: none;
    border-radius: var(--svelte-modal-button-br, 100px);
    background-color: var(--button-bg);
    cursor: pointer;

    @media (prefers-contrast: more) and (prefers-color-scheme: dark) {
      border: 1px solid white;
    }
    @media (prefers-contrast: more) and (prefers-color-scheme: light) {
      border: 1px solid black;
    }
  }

  button:hover {
    background-color: hsl(from var(--button-bg) 32 s l / 10%);
  }

  button:active {
    background-color: hsl(from var(--button-bg) h s l / 25%);
  }
</style>
