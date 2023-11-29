<script lang="ts">
	import { onMount } from 'svelte';
	import { App } from '../app/app';
	let containerRef: HTMLDivElement;
	let app: App;
	onMount(() => {
		app = new App(containerRef);
	});
</script>

<div bind:this={containerRef} class="canvas_tree_container"></div>

<style lang="scss">
	.canvas_tree_container {
		height: calc(100vh - 12rem);
	}
</style>
