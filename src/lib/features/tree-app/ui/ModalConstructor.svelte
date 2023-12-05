<script lang="ts">
	import Modal from '$lib/features/modal/ui/Modal.svelte';
	import { createEventDispatcher, tick } from 'svelte';
	import { Preview } from '../toy-preview/preview';
	import { TreeToy, type TreeToyProperties } from '../app/objects/tree-toy';
	import { LinePattern } from '../app/objects/tree-toy/patterns/line';

	let previewContainer: HTMLDivElement;
	let previewApp: Preview;
	let colorPickerContainer: HTMLDivElement;
	let treeToy: TreeToy;
	export let open = false;

	interface Events {
		finish: { toyProperties: TreeToyProperties };
	}

	const dispatcher = createEventDispatcher<Events>();

	function onFinish() {
		open = false;
		dispatcher('finish', { toyProperties });
	}

	const toyProperties: TreeToyProperties = {
		baseColor: 'blue',
		lineColor: 'green',
		pattern: 'line_triangle'
	};

	async function createPreview() {
		await tick();
		treeToy = new TreeToy();

		const linePattern = new LinePattern({
			count: 1,
			color: 'gold',
			lineWidth: 75
		});

		const linePattern2 = new LinePattern({
			count: 6,
			color: 'green',
			lineWidth: 25,
			offsetY: 150 / 3
		});

		const linePattern3 = new LinePattern({
			count: 6,
			color: 'red',
			lineWidth: 25,
			offsetY: 150 / 2
		});

		// const linePattern4 = new LinePattern({
		// 	count: 6,
		// 	color: 'olive',
		// 	lineWidth: 25,
		// 	offsetY: 150
		// });

		treeToy.addPattern(linePattern, linePattern2, linePattern3);
		previewApp = new Preview(previewContainer, treeToy);
		previewApp.updateToyTexture();
	}

	function handlePropsChange(props: TreeToyProperties) {
		treeToy.baseColor = props.baseColor;
		previewApp.updateToyTexture();
	}

	$: open && createPreview();
	$: toyProperties && previewApp && handlePropsChange(toyProperties);
</script>

<Modal bind:open headingText="Конструктор игрушки">
	<div style="display: flex; gap: 0.5rem;">
		<section>
			<div style="width: 400px; height: 300px;" class="toy_preview" bind:this={previewContainer} />
			<div class="toy_constructor_instruments">
				<label class="select">
					<span>Основной цвет игрушки</span>
					<select bind:value={toyProperties.baseColor}>
						<option value="red">Красный</option>
						<option value="blue">Синий</option>
					</select>
				</label>
				<button on:click={() => previewApp.downloadTexture()}>Скачать текстуру</button>
				<button on:click={onFinish}>Завершить созадние</button>
			</div>
		</section>
		<section style="display: flex; flex-direction: column; gap: 0.25rem;">
			{#if treeToy}
				{#each treeToy.patterns as pattern}
					<span style="border: 1px solid black; padding: 0.25rem; border-radius: 0.5rem;"
						>{pattern.kind}</span
					>
				{/each}
			{/if}
		</section>
	</div>
</Modal>

<style lang="scss">
	.select {
		display: flex;
		flex-direction: column;
	}
</style>
