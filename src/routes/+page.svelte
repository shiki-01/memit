<script lang="ts">
	import '../app.css';
	import Color from '$lib/utils/colors';
	import NavBar from '$lib/components/NavBar.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import CanvasCard from '$lib/components/CanvasCard.svelte';
	import { menupos, uisize, bgpos, bgsize, bgscale, pinchPos, status } from '$lib/utils/interface';
	import type { Canvas as CanvasType, Size } from '$lib/types';
	import { writable } from 'svelte/store';
	import { pinch } from 'svelte-gestures';
	import { draggable } from '$lib/utils/actions';
	import { handlePinch } from '$lib/utils/mouse';
	import { onMount } from 'svelte';

	const position = writable({ x: 200, y: 100 });
	const position2 = writable({ x: 500, y: 100 });

	const canvaces: CanvasType[] = [
		{
			size: {
				width: 200,
				height: 150
			},
			position,
			style: {
				background: 'none',
				backgroundColor: 'stone'
			},
			data: {
				text: 'Hello World'
			}
		},
		{
			size: {
				width: 200,
				height: 400
			},
			position: position2,
			style: {
				background: 'none',
				backgroundColor: 'stone'
			}
		}
	];

	const size = (v: Size) => {
		uisize.set(v);
	};

	const pinched = (e: MouseEvent) => {
		const { clientX, clientY }: { clientX: number, clientY: number } = e;
		pinchPos.set({ x: clientX, y: clientY });
	};

	$: {
		const scaledWidth = $bgsize.width * $bgscale;
		const scaledHeight = $bgsize.height * $bgscale;

		const maxMoveX = Math.max((scaledWidth - $uisize.width) / 2, 0);
		const maxMoveY = Math.max((scaledHeight - $uisize.height) / 2, 0);

		$bgpos.x = Math.max(-maxMoveX, Math.min(maxMoveX, $bgpos.x));

		$bgpos.y = Math.max(-maxMoveY, Math.min(maxMoveY, $bgpos.y));
	}

	$: console.log($bgscale);

	onMount(() => {
		if (typeof window !== 'undefined') {
			size({ width: window.innerWidth, height: window.innerHeight });
		}
	});
</script>

<svelte:window
	on:resize={() => size({ width: window.innerWidth, height: window.innerHeight })}
	on:wheel={pinched}
/>

<main
	class="w-[100svw] relative h-[100svh] overflow-hidden"
>
	<NavBar
		class="absolute z-20"
		style="top: {$menupos.y}px; left: {$menupos.x}px"
	/>
	<div
		class="w-full h-full relative touch-none"
		style="
			background: { Color('teal','background','light') };
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		"
	>
		{#if $status}
			<Canvas canvas={$status} />
		{:else}
			<div
				class="absolute touch-none"
				style="
					top: calc(50% + {$bgpos.y}px);
					left: calc(50% + {$bgpos.x}px);
					width: {$bgsize.width}px;
					height: {$bgsize.height}px;
					transform: translate(-50%, -50%) scale({$bgscale});
				"
				on:wheel={handlePinch}
			>
				<div
					class="w-full h-full -z-10"
					use:draggable={bgpos}
					use:pinch
					on:pinch={handlePinch}
				/>
				{#each canvaces as canvas}
					<CanvasCard {canvas} />
				{/each}
			</div>
		{/if}
	</div>
</main>