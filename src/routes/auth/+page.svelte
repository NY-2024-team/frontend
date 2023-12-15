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
            <input name="username" type="login" placeholder="Введите логин" />
        </div>
        <div class="input-group">
            <input name="password" type="password" placeholder="Введите пароль" />
        </div>
        <button class="button" type="submit">Войти</button>
		{#if form && form.error}
		<span class="error">Ошибочка</span>
		{/if}
    </div>
</form>

<style lang="scss">

.container {
    width: 600px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
};

h1 { 
    font-size: 25px;
    color: #333333;
}

.input-group {
    margin-top: 25px;
    color: white;
};

input {
    width: 250px;
    height: 30px;
    border-radius: 10px;   
    color: white;
    background-color: #110229;;
    font-size: 16px;
    font-family: Arial, sans-serif;
    padding: 5px 15px 5px 15px;
    transition: 1s;
};

input:hover {
    background-color: white; 
    color: #333333;
    transition: 1s;
};

input[type="login"]::-webkit-input-placeholder {
    color: white;
};

input[type="password"]::-webkit-input-placeholder {
    color: white;
};
.button {
    width: 150px;
    height: 40px;
    background-color: #110229;
    border-radius: 10px;
    color: white;
    font-size: 16px;
    font-family: Arial, sans-serif;
    cursor: pointer;
    padding: 5px;
    font-size: 16px;
    text-align: center;
    margin-top: 15px;
    transition: 1s;
};

button:hover {
    background-color: white;
    color: #333333;
    transition: 1s;
};

.error {
    color: red;
};

</style>