<script lang="ts">
	import { googleAuthUser, emailAuthUser, emailCreateUser } from '$lib/util/firebase-auth';

	let currentMode = 0;
	const pageModes = ['login', 'create account'];

	let email = '';
	let password = '';

	let errorText = '';

	function switchMode() {
		currentMode = currentMode == 0 ? 1 : 0;
	}

	async function login() {
		if (!email || !password) {
			errorText = 'email or password fields empty';
		}

		if (currentMode == 0) {
			emailAuthUser(email, password);
		} else if (currentMode == 1) {
			emailCreateUser(email, password);
		} else {
			errorText = 'math is broken';
		}
	}
</script>

<main>
	<div id="title">
		<h2>{pageModes[currentMode]}</h2>
	</div>
	<div id="error-display">
		<p id="error-text">{errorText}</p>
	</div>
	<div id="email-password-form">
		<form on:submit={login}>
			<input type="email" bind:value={email} />
			<input type="password" bind:value={password} />
			<button id="submit-button">submit</button>
		</form>
	</div>
	<div id="signin-buttons">
		<button on:click={googleAuthUser}>Sign In With Google</button>
	</div>
	<button on:click={switchMode}>{pageModes[Math.abs(currentMode - 1)]}</button>
</main>

<style>
	input {
		width: 50%;
		outline: none;
	}

	#error-text {
		color: var(--accent-color);
	}
</style>
