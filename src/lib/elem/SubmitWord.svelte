<script lang="ts">
	import { serverTimestamp } from 'firebase/firestore';

	import { currentUser } from '$lib/util/firebase-auth';

	import { uploadWord, wordExistsCount } from '$lib/util/firebase';

	import { wordMap } from '$lib/util/word';
	import type { WordType } from '$lib/util/word';

	import type { Word } from '$lib/util/word';
	import { goto } from '$app/navigation';
	import { sanitize } from '$lib/util/sanitize';

	let errorText: string;

	export let word: string = '';
	let type: WordType;
	let def: string;

	async function submit() {
		errorText = 'uploading..';
		try {
			await wordOk();
		} catch (err) {
			if (!(err instanceof Error)) {
				return;
			}
			errorText = err.message;
			return;
		}

		errorText = '';

		let newWord: Word = {
			word: word,
			type: type,
			def: def,
			query: word.toLowerCase(),
			time: serverTimestamp(),
			uid: currentUser!.uid ?? 'unknown'
		};

		await uploadWord(newWord).then(() => {
			goto(`/w/${newWord.word}`);
		});
	}

	async function wordOk() {
		if (!word || !type || !def) {
			throw new Error('all fields must be filled');
		}

		word = word.trim().split(' ').join('-');
		word = sanitize(word);

		def = def.trim();
		def = sanitize(def);

		if (word.length > 45) {
			throw new Error(`word '${word.slice(0, 45)}..' must be shorter than 45 characters`);
		}

		if (word.length < 3) {
			throw new Error(`word '${word}' must be at least 3 characters`);
		}

		if (!type) {
			throw new Error('word type must be selected');
		}

		if (def.length > 2000) {
			throw new Error('definition must be shorter than 2000 characters');
		}

		if (def.split(' ').length < 3) {
			throw new Error('definition must be at least 3 words');
		}

		if ((await wordExistsCount(word.toLowerCase(), type)) > 0) {
			throw new Error(`'${word}' has already been defined`);
		}

		return true;
	}

	// Validate word-input as it's typed
	$: word = isValidChars(word);

	function isValidChars(data: string) {
		let returnWord = '';
		for (let i = 0; i < data.length; i++) {
			let code = data.charCodeAt(i);

			if (
				!(code > 47 && code < 58) && // numeric (0-9)
				!(code > 64 && code < 91) && // upper alpha (A-Z)
				!(code > 96 && code < 123) && // lower alpha (a-z)
				!(code == 45) // hyphen
			) {
				// discard char

				if (code == 32) {
					// replace space with hyphen
					returnWord += '-';
				}
			} else {
				returnWord += data[i];
			}
		}

		return returnWord;
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
