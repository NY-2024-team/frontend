<script lang="ts">
	import Modal from '$lib/features/modal/ui/Modal.svelte';
	let modal: Modal;

</script>

<div>
	<h1>Lorem ipsum dolor sit.</h1>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ut aspernatur quibusdam, assumenda quas quod incidunt dolor est accusantium, deleniti repellat, dignissimos corporis unde quasi similique perferendis! Alias sapiente a velit nulla debitis ducimus atque quos beatae, aspernatur ratione officia illum error modi omnis laboriosam totam placeat! Magnam, pariatur fugit.</p>
</div>

<div class="align_center">
	<button class="button align_center" on:click|preventDefault={() => modal.openModal()}>Show modal</button>
</div>

<Modal bind:this={modal} headingText="Hello world">
	<span>Hello World</span>
	<button on:click={() => modal.closeModal()}>Close modal</button>
</Modal>

<style lang="scss">
	.align_center {
		width: 100%;
		display: flex;
		justify-content: center;

		button {
			flex: 0 1 0;
		}
	}
</style>