<script lang="ts">
	import Close from '$lib/shared/ui/icons/CloseIcon.svelte';
	import { createEventDispatcher } from 'svelte';
	export let headingText: string = '';

	interface ModalHeaderDispatchEvents {
		closeButtonClick: null;
	}
	const dispatch = createEventDispatcher<ModalHeaderDispatchEvents>();

	function handleCloseButtonClick() {
		dispatch('closeButtonClick');
	}
</script>

<header class="modal_header">
	<strong>{headingText}</strong>
	<button on:click={handleCloseButtonClick} class="close_button">
		<Close height={32} width={32} />
	</button>
</header>

<style lang="scss">
	.modal_header {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		align-items: center;
	}

	.close_button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		border-radius: 0.25rem;
		transition: transform 0.15s cubic-bezier(0.075, 0.82, 0.165, 1), background-color 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);

		&:active {
			transform: scale(0.85);
		}

		&:hover {
			background-color: rgba(230, 230, 230, 0.6);
		}
	}
</style>
