<script lang="ts">
	export let open: boolean = false;
</script>

<dialog
	aria-hidden="true"
	class="modal_container"
	{open}
	on:click|preventDefault|stopPropagation={() => {}}
>
	<slot />
</dialog>

<style lang="scss">
	.modal_container {
		border: none;
		border-radius: 0.5rem;
		min-width: 380px;
	}
</style>
