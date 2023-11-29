<main class="main_content">
	<slot />
</main>

<style lang="scss">
	@mixin background-opacity($color, $opacity: 0.3) {
		background: $color;
		background: rgba($color, $opacity);
	}

	.main_content {
        @include background-opacity(#f0f0f0, 0.9);
		max-width: 1600px;
		margin: 0px auto;
		padding: 1rem;
	}
</style>
