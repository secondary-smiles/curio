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
		<input type="text" placeholder="word.." />

		<select bind:value={selected}>
			<option value="" disabled selected>select a word type</option>
			{#each wordMap as wordType}
				<option value={wordType}>
					{wordType.type}
				</option>
			{/each}
		</select>
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
</style>
