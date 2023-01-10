<script lang="ts">
	let searchMode = false;

	function toggleSearchMode() {
		searchMode = !searchMode;
	}

	function initInput(el: HTMLInputElement) {
		el.focus();
	}

	function search() {
		console.log('test');
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
