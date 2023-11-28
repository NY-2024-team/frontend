<script>
	import HeaderNavigation from "./HeaderNavigation.svelte";

</script>
<header class="header">
	<span class="logo"> Hello Header </span>
    <HeaderNavigation />
</header>

<style lang="scss">
	.header {
		background-color: var(--background-header);
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		z-index: -2;
	}

	.logo {
		color: var(--accent-gold);
		font-size: 24px;
		font-weight: bold;
		text-decoration: none;
	}
</style>
