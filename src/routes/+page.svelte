<script lang="ts">
	import Modal from '$lib/features/modal/ui/Modal.svelte';
	let modal: Modal;
</script>

<div>Hello world</div>
<button on:click|preventDefault={() => modal.openModal()}>Show modal</button>
<Modal bind:this={modal} headingText="Hello world">
	<span>Hello World</span>
	<button on:click={() => modal.closeModal()}>Close modal</button>
</Modal>
