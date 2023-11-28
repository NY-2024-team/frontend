<script lang="ts">
	import { onMount } from 'svelte';
	import { Snowfall } from './snowfall';

	let canvasRef: HTMLCanvasElement;
	let snowfall: Snowfall | null = null;

	onMount(() => {
		try {
			snowfall = new Snowfall(canvasRef);
		} catch (err) {
			if (err && err instanceof Error) console.error(err.message);
			else console.error('Something went wrong while creating Snowfall element!');
		}
	});
</script>

<canvas class="snowfall_background" bind:this={canvasRef} />

<style lang="scss">
	.snowfall_background {
		position: absolute;
		pointer-events: none;
		width: 100vw;
		height: 100vh;
	}
</style>
