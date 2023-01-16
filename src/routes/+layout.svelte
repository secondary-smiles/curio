<script lang="ts">
	import Header from '$lib/elem/Header.svelte';
	import { currentUser } from '$lib/util/firebase-auth';
	import { authStore } from '$lib/util/store';

	import { browser } from '$app/environment';

	import ColorHash from 'color-hash';
	import { contrast } from '$lib/util/color';

	import type { RGBColor } from '$lib/util/color';

	let bgColor: RGBColor = {
		r: 44,
		g: 47,
		b: 52
	};

	let color = '#c49a6d';
	authStore.subscribe((value) => {
		if (value) {
			getColor();
			browser && window.document.documentElement.style.setProperty('--accent-color', color);
		}
	});

	$: {
		getColor();
		browser && window.document.documentElement.style.setProperty('--accent-color', color);
	}

	function getColor() {
		const gc = new ColorHash().rgb(currentUser ? currentUser.uid : 'gfg');
		const rgbColor: RGBColor = {
			r: gc[0],
			g: gc[1],
			b: gc[2]
		};

		const colorContrast = contrast(bgColor, rgbColor);

		if (colorContrast < 2.5) {
			color = '#c49a6d';
		} else {
			color = new ColorHash().hex(currentUser ? currentUser.uid : 'gfg');
		}
	}
</script>

<main>
	<div id="header">
		<Header />
	</div>
	<div id="content">
		<slot />
	</div>
</main>
