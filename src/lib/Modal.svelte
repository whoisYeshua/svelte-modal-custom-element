<svelte:options
  customElement={{
    tag: 'svelte-modal',
    props: {
      open: { reflect: true, type: 'Boolean' }
    }
  }} />

<script>
  /** @type {boolean} */
  export let open = false
  /** @type {() => void} */
  export let onClose = () => {}

  /** @type {HTMLDialogElement} */
  let dialog

  $: if (dialog && open) dialog.showModal()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={onClose} on:close on:click|self={() => dialog.close()}>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <div class="header-container">
      <slot name="header" />
      <button on:click={() => dialog.close()}>
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
  </div>
</dialog>

<style>
  dialog {
    width: var(--svelte-modal-dialog-w, clamp(20em, 33vw, 32em));
    padding: 0;
    border-radius: var(--svelte-modal-dialog-br, 1em);
    border: none;
  }
  dialog::backdrop {
    --lightness: 0%;

    background: var(--svelte-modal-dialog-backdrop-bg, hsla(0 0% var(--lightness) / 30%));
    backdrop-filter: var(--svelte-modal-dialog-backdrop-filter, blur(10px));
  }
  @media (prefers-color-scheme: dark) {
    dialog::backdrop {
      --lightness: 30%;
    }
  }
  dialog > div {
    padding: var(--svelte-modal-dialog-padding, 1em);
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--svelte-modal-button-w, 32px);
    height: var(--svelte-modal-button-h, 32px);
    padding: 0;
    border: none;
    border-radius: var(--svelte-modal-button-br, 100px);
    background-color: transparent;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--svelte-modal-button-hover-bg, hsla(0 0% var(--lightness) / 10%));
  }

  button:active {
    background-color: var(--svelte-modal-button-active-bg, hsla(0 0% var(--lightness) / 25%));
  }
</style>
