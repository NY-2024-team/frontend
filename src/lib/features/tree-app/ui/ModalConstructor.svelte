<script lang="ts">
	import Modal from '$lib/features/modal/ui/Modal.svelte';
	import { createEventDispatcher, tick } from 'svelte';
	import { Preview } from '../toy-preview/preview';
	import { TreeToy, type TreeToyProperties } from '../app/objects/treeToy';
	
    let previewContainer: HTMLDivElement;
	let previewApp: Preview;
	export let open = false;

    interface Events {
        'finish': {toyProperties: TreeToyProperties}
    }

    const dispatcher = createEventDispatcher<Events>();

    function onFinish() {
        open = false;
        dispatcher('finish', {toyProperties})
    }

    const toyProperties: TreeToyProperties = {
        baseColor: "blue",
        lineColor: 'green'
    }

	async function createPreview() {
		await tick();
		const treeToy = new TreeToy();
		previewApp = new Preview(previewContainer, treeToy);
        previewApp.updateToyTexture({baseColor: 'red', lineColor: 'green'})
	}

	$: open && createPreview();
    $: previewApp && previewApp.updateToyTexture(toyProperties)
</script>

<Modal bind:open headingText="Конструктор игрушки">
	<div>
		<div style="width: 400px; height: 300px;" class="toy_preview" bind:this={previewContainer} />
		<div class="toy_constructor_instruments">
			<label class="select">
                <span>Основной цвет игрушки</span>
				<select bind:value={toyProperties.baseColor}>
					<option value="red">Красный</option>
					<option value="blue">Синий</option>
				</select>
			</label>

            <label class="select">
                <span>Цвет узора</span>
				<select bind:value={toyProperties.lineColor}>
					<option value="#ff5010">Оранжевый</option>
					<option value="yellow">Жёлтый</option>
					<option value="green">Зелёный</option>
				</select>
			</label>
            <button on:click={() => previewApp.downloadTexture(toyProperties)}>Скачать текстуру</button>
            <button on:click={onFinish}>Завершить созадние</button>
        </div>
	</div>
</Modal>

<style lang="scss">
    .select {
        display: flex;
        flex-direction: column;
    }
</style>