<script lang="ts">
	import { wordMap } from '$lib/util/word';
	import type { WordType } from '$lib/util/word';

	let errorText: string;

	let word: string;
	let type: WordType;
	let def: string;

	function submit() {
		try {
			wordOk();
		} catch (err) {
			if (!(err instanceof Error)) {
				return;
			}
			errorText = err.message;
			return;
		}

		errorText = '';
	}

	function wordOk() {
		if (!word || !type || !def) {
			throw new Error('all fields must be filled');
		}

		if (word.length > 45) {
			throw new Error(`'${word.slice(0, 45)}..' is greater than 45 characters`);
		}

		if (!type) {
			throw new Error('word type must be selected');
		}

		if (def.length > 2000) {
			throw new Error('word definition is greater than 2000 characters');
		}

		return true;
	}
</script>

<main>
	<div id="title">
		<h2>Submit a Word</h2>
	</div>
	<div id="error-display">
		{#if errorText}
			<p class="error-text">{errorText}</p>
		{/if}
	</div>
	<form id="word-form" on:submit|preventDefault={submit}>
		<input type="text" placeholder="word.." autocomplete="off" bind:value={word} />

		<select bind:value={type}>
			<option value={null} disabled selected>select a word type</option>
			{#each wordMap as wordType}
				<option value={wordType}>
					{wordType.type}
				</option>
			{/each}
		</select>
		<textarea placeholder="word definition.." bind:value={def} />
		<button id="submit-button" type="submit">submit</button>
	</form>
</main>

<style>
	#title {
		text-align: center;
	}

	#error-display {
		text-align: center;
		overflow-wrap: break-word;
	}

	#word-form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#word-form > * {
		margin: 5px 0;
	}

	input {
		width: 15%;

		text-align: center;
	}

	textarea {
		width: 25%;

		max-width: 85%;
		min-height: 15px;

		resize: vertical;
		transition: none;
	}
</style>
