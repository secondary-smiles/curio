<script lang="ts">
	import Header from '$lib/elem/Header.svelte';

	import { currentUser } from '$lib/util/firebase-auth';
	import { authStore } from '$lib/util/store';

	import { browser } from '$app/environment';

	import { contrast } from '$lib/util/color';

	import type { RGBColor } from '$lib/util/color';

	import { ColorHash } from '$lib/util/color';

	let bgColor: RGBColor = {
		r: 44,
		g: 47,
		b: 52
	};

	let color = '#c49a6d';
	authStore.subscribe(() => {
		getColor();
		browser && window.document.documentElement.style.setProperty('--accent-color', color);
	});

	$: {
		getColor();
		browser && window.document.documentElement.style.setProperty('--accent-color', color);
	}

	function getColor() {
		const colors = new ColorHash().rgb(currentUser ? currentUser.uid : '');
		const rgbColor: RGBColor = {
			r: colors[0],
			g: colors[1],
			b: colors[2]
		};

		const colorContrast = contrast(bgColor, rgbColor);
		if (colorContrast < 1.5) {
			console.info('uid color hash has too low of a contrast, using default..');
			color = '#c49a6d';
		} else {
			color = new ColorHash().hex(currentUser ? currentUser.uid : '');
		}
	}
</script>

<main>
	<div class="header">
		<Header />
	</div>
	<div class="content">
		<slot />
	</div>
	<hr />
	<div class="footer">
		<a href="https://trinket.icu">trinket</a>
	</div>
</main>

<style>
	.footer {
		text-align: center;
	}
</style>
