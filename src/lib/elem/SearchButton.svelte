<script lang="ts">
	import { goto } from '$app/navigation';

	let searchMode = false;

	let query = '';

	function toggleSearchMode() {
		searchMode = !searchMode;
	}

	function initInput(el: HTMLInputElement) {
		el.focus();
	}

	function search(e: Event) {
		e.preventDefault();
		if (query) {
			goto(`/r?query=${query}`, { invalidateAll: true });
			query = '';
		}
	}
</script>

<main>
	{#if !searchMode}
		<button id="search-button" on:click={toggleSearchMode}>search </button>
	{/if}
	{#if searchMode}
		<form on:submit={search}>
			<input
				id="search-box"
				type="text"
				name="query"
				placeholder="search for a word.."
				autocomplete="off"
				bind:value={query}
				on:focusout={toggleSearchMode}
				use:initInput
			/>
		</form>
	{/if}
</main>

<style>
	input {
		width: 65%;
		border: 2px solid var(--alt-accent-color);
		padding: 0.5em;

		color: var(--text-color);

		border-radius: 4px;
		transition: width 0.3s ease-in-out;
	}

	input:hover,
	input:focus {
		width: 95%;

		outline: none;
	}
</style>
