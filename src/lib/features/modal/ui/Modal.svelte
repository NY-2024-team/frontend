<script lang="ts">
	import ModalOverlay from './ModalOverlay.svelte';
	import ModalHeader from './ModalHeader.svelte';
	import ModalContainer from './ModalContainer.svelte';
	import ModalBody from './ModalBody.svelte';
	import { createEventDispatcher } from 'svelte';
	export let headingText: string = '';
	export let open: boolean = false;

	interface ModalEventDispatcher {
		onClose: null;
	}
	const dispatch = createEventDispatcher<ModalEventDispatcher>();

	export function closeModal() {
		open = false;
		dispatch('onClose');
	}
	export function openModal() {
		open = true;
	}
</script>

{#if open}
    <ModalOverlay on:clickOverlay={closeModal}>
        <ModalContainer bind:open>
            <ModalHeader on:closeButtonClick={closeModal} {headingText} />
			<ModalBody>
				<slot />
			</ModalBody>
		</ModalContainer>
    </ModalOverlay>
{/if}