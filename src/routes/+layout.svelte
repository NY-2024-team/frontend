<script lang="ts">
	import { sessionModel } from '$lib/entities/session/model/session-model';
    import '$lib/styles/main.scss'
	import Layout from '$lib/widgets/layouts/main-layout/Layout.svelte';
	import type { PageData } from './$types';

    export let data: PageData
    sessionModel.set(data.user)
</script>

<Layout>
    <slot />
</Layout>