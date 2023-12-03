<script lang="ts">
	import { onMount } from 'svelte';
	import { App } from '../app/app';
	import ModalConstructor from './ModalConstructor.svelte';
	import type { TreeToyProperties } from '../app/objects/treeToy';
	let containerRef: HTMLDivElement;
	let app: App;
	let isConstructorOpen = false;
	onMount(async () => {
		app = new App(containerRef);
	});

	function handleConstructorFinish(event: CustomEvent<{toyProperties: TreeToyProperties}>) {
		console.log("Создание игрушки завершено! Свойства:", event.detail.toyProperties)
	}

	function openConstructorModal() {
		isConstructorOpen = true;
	}
</script>

<button class="button" on:click={openConstructorModal}>Создать игрушку</button>
<div bind:this={containerRef} class="canvas_tree_container"></div>
<ModalConstructor on:finish={handleConstructorFinish} bind:open={isConstructorOpen} />

<style lang="scss">
	.canvas_tree_container {
		height: calc(100vh - 12rem);
	}
</style>
