<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;

	export let form: ActionData;
	$: console.log({data, form})

    onMount(() => {
        console.log("Я очень важное изменение, пустите меня в гит")
    })
</script>

<form method="POST" action="?/login" use:enhance>
    <div class="container">
        <h1>Авторизация</h1>
        <div class="input-group">
            <label class="text_label">
                <span>Введите логин</span>
                <br>
                <input class="text_input" autocomplete="off" name="username" id="login" type="login">
            </label>
        </div>
        <div class="input-group">
            <label class="text_label">
                <span>Введите пароль</span>
                <br>
                <input class="text_input" autocomplete="off" name="password" id="password" type="password">
            </label>
        </div>
        <button class="button" type="submit">Войти</button>
		{#if form && form.error}
		<span class="error">Ошибочка</span>
		{/if}
    </div>
</form>

<style lang="scss">

.container {
    width: 37.5rem;
    height: 31.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
};

h1 { 
    font-size: 1.5rem;
    color: #333333;
};

.button {
    width: 9rem;
    height: 2.5rem;
    background-color: #110229;
    border-radius: 0.6rem;
    color: white;
    font-size: 1rem;
    font-family: Arial, sans-serif;
    cursor: pointer;
    padding: 0.25rem;
    text-align: center;
    margin-top: 2rem;
    transition: 0.3s;
};

button:hover {
    background-color: white;
    color: #333333;
    transition: 0.3s;
};

.error {
    color: red;
};

.text_label {
    color: black;
};

</style>