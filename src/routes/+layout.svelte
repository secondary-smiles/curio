<script lang="ts">
	import Header from '$lib/elem/Header.svelte';
</script>

<main>
	<div id="header">
		<Header />
	</div>
	<div id="content">
		<slot />
	</div>
</main>

<style global>
	@import url('https://fonts.googleapis.com/css2?family=Aleo:ital,wght@0,400;0,700;1,400;1,700&display=swap');

	* {
		--text-color: #c1c7c6;
		--alt-text-color: #4c535e;
		--accent-color: #c49a6d;
		--alt-accent-color: #4c535e;
		--bg-color: #2c2f34;

		font-family: 'Aleo', serif;

		color: var(--text-color);
		background: var(--bg-color);
	}

	hr {
		width: 75%;

		border: 0;
		border-top: 2px solid var(--alt-accent-color);
	}

	button {
		padding: 0.5em;
		border-radius: 4px;

		color: var(--text-color);
		font-weight: normal;

		border: 2px solid var(--alt-accent-color);

		transition: box-shadow 0.3s ease-in-out;
	}

	button:hover {
		box-shadow: inset 0 0 17px 1px var(--alt-accent-color);
	}

	button:active {
		font-weight: bold;
	}
</style>
