<script lang="ts">
    import '$lib/styles/main.scss'
	import Layout from '$lib/widgets/layouts/main-layout/Layout.svelte';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { sessionModel } from '$lib/entities/session/model/session-model';
    export let data: LayoutData;

    onMount(() => {
        sessionModel.set(data.user)
    })
</script>

<Layout>
    <slot />
</Layout>