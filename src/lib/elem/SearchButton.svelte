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
		<button class="search-button" on:click={toggleSearchMode}>search </button>
	{/if}
	{#if searchMode}
		<form on:submit={search}>
			<input
				class="search-box"
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
	input:hover,
	input:focus {
		width: 95%;
	}
</style>
