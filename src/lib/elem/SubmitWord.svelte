<script lang="ts">
	import { wordMap } from '$lib/util/word';
	import type { WordType } from '$lib/util/word';

	let selected: WordType;
</script>

<main>
	<div id="title">
		<h2>Submit a Word</h2>
	</div>
	<form id="word-form">
		<input type="text" placeholder="word.." autocomplete="off" />

		<select bind:value={selected}>
			<option value={null} disabled selected>select a word type</option>
			{#each wordMap as wordType}
				<option value={wordType}>
					{wordType.type}
				</option>
			{/each}
		</select>
		<textarea placeholder="word definition.." />
		<button id="submit-button" type="submit">submit</button>
	</form>
</main>

<style>
	#title {
		text-align: center;
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
	}
</style>
