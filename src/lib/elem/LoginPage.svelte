<script lang="ts">
	import {
		googleAuthUser,
		emailAuthUser,
		emailCreateUser,
		emailVerifyUser
	} from '$lib/util/firebase-auth';

	import { verifiedStore, authStore } from '$lib/util/store';

	let repeatCount = 1;
	let backupErrorText = '';

	let currentMode = 0;
	const pageModes = ['login', 'create account'];

	let email = '';
	let password = '';

	let errorText = '';

	function switchMode() {
		currentMode = currentMode == 0 ? 1 : 0;
	}

	async function login(e: Event) {
		e.preventDefault();

		if (!email || !password) {
			errorText = 'loading';
			errorText = 'email or password fields empty';
			return;
		}

		if (currentMode == 0) {
			try {
				await emailAuthUser(email, password);
			} catch (err: any) {
				updateError(err);
			}
		} else if (currentMode == 1) {
			try {
				await emailCreateUser(email, password);
			} catch (err) {
				updateError(err);
			}
		} else {
			errorText = 'math is broken';
		}

		if ($authStore && !$verifiedStore) {
			errorText = 'loading';
			errorText = 'check email to verify account and then login';
		}
	}

	function updateError(err: any) {
		if ('code' in err) {
			errorText = 'loading';
			errorText = err.code;
		} else if ('message' in err) {
			errorText = 'loading';
			errorText = err.message;
		} else {
			errorText = 'loading';
			errorText = `unknown error: ${err}`;
		}

		console.error(err);
	}

	$: {
		if (backupErrorText == errorText) {
			repeatCount++;
		} else {
			repeatCount = 1;
		}

		backupErrorText = errorText;
	}
</script>

<main>
	<div id="title">
		<h2>{pageModes[currentMode]}</h2>
	</div>
	<div id="error-display">
		{#if errorText}
			{#key repeatCount}
				<p class="error-text">
					{errorText} (x{repeatCount})
				</p>
			{/key}
		{/if}
	</div>
	<div id="email-verify">
		{#if $authStore && !$verifiedStore}
			<button on:click={emailVerifyUser} id="verify-button">resend verification email</button>
		{/if}
	</div>
	<div id="email-password-form">
		<form on:submit={login}>
			<input type="text" bind:value={email} />
			<input type="password" bind:value={password} />
			<button id="submit-button">submit</button>
		</form>
	</div>
	<div id="signin-buttons">
		<button on:click={googleAuthUser}>Sign In With Google</button>
	</div>
	<div id="mode-buttons">
		<button on:click={switchMode}>{pageModes[Math.abs(currentMode - 1)]}</button>
	</div>
</main>

<style>
	input {
		width: 20%;
		outline: none;
	}

	.error-text {
		color: var(--accent-color);
	}
</style>
