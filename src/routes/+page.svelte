<script lang="ts">
	import '../app.css';
	import Color from '$lib/utils/colors';
	import NavBar from '$lib/components/NavBar.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import CanvasCard from '$lib/components/CanvasCard.svelte';
	import {
		menupos,
		uisize,
		bgpos,
		bgsize,
		bgscale,
		isDragging,
		pinchPos,
		status
	} from '$lib/utils/interface';
	import type { Canvas as CanvasType, Size } from '$lib/types';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	const position1 = writable({ x: 200, y: 100 });
	const position2 = writable({ x: 500, y: 100 });

	const canvaces: CanvasType[] = [
		{
			size: {
				width: 200,
				height: 150
			},
			position: position1,
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

	onMount(() => {
		if (typeof window === 'undefined') return;
		size({ width: window.innerWidth, height: window.innerHeight });
	});

	import Moveable from 'svelte-moveable';

	let canvas: HTMLDivElement | null = null;
	let test = '';
</script>

<svelte:window on:resize={() => size({ width: window.innerWidth, height: window.innerHeight })} />

<main class="w-[100svw] relative h-[100svh] overflow-hidden">
	<NavBar class="absolute z-20" style="top: {$menupos.y}px; left: {$menupos.x}px" />
	<div
		class="w-full h-full relative touch-none"
		style="
			background: {Color('teal', 'background', 'light')};
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		"
	>
		{#if $status}
			<Canvas canvas={$status} />
		{:else}
			<Moveable
				target={canvas}
				draggable={true}
				throttleDrag={1}
				edgeDraggable={false}
				on:drag={({ detail: e }) => {
					if ($isDragging) return;
					const [x, y] = e.translate;
					const [width, height] = [$bgsize.width * $bgscale, $bgsize.height * $bgscale];
					const max = {
						x: {
							min: width * -1,
							max: ($bgsize.width - width) / -2
						},
						y: {
							min: height * -1,
							max: ($bgsize.height - height) / -2
						}
					}
					const [tx, ty] = [Math.min(max.x.max, Math.max(max.x.min, x)), Math.min(max.y.max, Math.max(max.y.min, y))];
					e.target.style.transform = `translate(${tx}px, ${ty}px)`;
				}}
			/>
			<div
				bind:this={canvas}
				style="
				background: red;
							width: {$bgsize.width}px;
							height: {$bgsize.height}px;
							transform-origin: center center;
							touch-action: none;
							scale: {$bgscale};
						"
				on:wheel={e => {
					if (!canvas) return;
					e.preventDefault();
					$bgscale = $bgscale + e.deltaY * -1 / 1000;
				}}
			>
				{#each canvaces as canvas}
					<CanvasCard {canvas} />
				{/each}
			</div>
		{/if}
	</div>
</main>

<style>
    :global(.viewer) {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
