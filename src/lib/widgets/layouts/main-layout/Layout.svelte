<script>
	import Snowfall from "$lib/features/background-snowfall/ui/Snowfall.svelte";
	import Content from "./Content.svelte";
	import Header from "./Header.svelte";
</script>
<Snowfall />
<Header />
<Content>
	<slot />
</Content>