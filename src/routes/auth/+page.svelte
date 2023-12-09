<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;

	export let form: ActionData;
	$: console.log({data, form})
</script>

<div>
	<form method="POST" action="?/login" use:enhance>
		<label>
			<span>username</span>
			<input name="username" placeholder="Your username..." />
		</label>
		<label>
			<span>password</span>
			<input name="password" type="password" />
		</label>
		<button formaction="?/login">Login</button>
	</form>
</div>

<style lang="scss">
	// Стили здесь!
</style>