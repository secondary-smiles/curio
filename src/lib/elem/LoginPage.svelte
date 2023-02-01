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

	async function login() {
		errorText = 'loading';

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
				switchMode();
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
	<div class="title">
		<h2>{pageModes[currentMode]}</h2>
	</div>
	<div class="error-display">
		{#if errorText}
			{#key repeatCount}
				<p class="error-text">
					{errorText} (x{repeatCount})
				</p>
			{/key}
		{/if}
	</div>
	<div class="email-verify">
		{#if $authStore && !$verifiedStore}
			<button on:click={emailVerifyUser} class="verify-button">resend verification email</button>
		{/if}
	</div>
	<div class="email-password-form-wrapper">
		<form on:submit|preventDefault={login} class="email-password-form">
			<input type="text" bind:value={email} placeholder="email" autocomplete="off" />
			<input type="password" bind:value={password} placeholder="password" autocomplete="off" />
			<div class="signin-buttons">
				<button class="submit-button" type="submit">submit</button>
				<button on:click={googleAuthUser} type="button">Sign In With Google</button>
			</div>
		</form>
	</div>
	<div class="mode-buttons">
		<button on:click={switchMode}>{pageModes[Math.abs(currentMode - 1)]}</button>
	</div>
</main>

<style>
	input {
		outline: none;
	}

	h2 {
		margin-bottom: 0;
	}

	button {
		margin: 5px 0;
	}

	.email-password-form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.email-password-form > * {
		box-sizing: border-box;

		margin: 5px 0;
	}
</style>
