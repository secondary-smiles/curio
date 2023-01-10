<script lang="ts">
	import SearchButton from './SearchButton.svelte';
	import SubmitButton from './SubmitButton.svelte';
</script>

<main>
	<hr />
	<div id="header-inner">
		<div id="title">
			<a href="/"><p id="title-name">The Curio</p></a>
			<p id="title-meta">a collection of language</p>
		</div>
		<div id="header-buttons">
			<SearchButton />
			<SubmitButton />
		</div>
	</div>
	<hr />
</main>

<style>
	a {
		text-decoration: none;
	}

	#header-buttons {
		display: flex;
		align-items: center;
	}

	#header-inner {
		display: flex;
		justify-content: space-evenly;
	}

	#title {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	#title p {
		margin: 0;
		padding: 0.5em;
	}

	#title-name {
		font-weight: bold;
		color: var(--accent-color);
	}

	#title-meta {
		color: var(--alt-text-color);
	}
</style>
