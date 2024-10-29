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
				text: {
					content: 'Hello, World!',
					justify: 'start',
					align: 'start',
					color: 'stone',
					font: 'sans-serif',
					size: 8
				}
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

	import { draggable } from '@neodrag/svelte';

	let position = { x: 0, y: 0 };

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
			<div
				class="w-screen h-screen"
			>
				<div
					style="

						width: {$bgsize.width}px;
						height: {$bgsize.height}px;
						transform-origin: top left;
						touch-action: none;
						scale: {$bgscale};
					"
					use:draggable={{
						position,
						cancel: '.card',
						onDrag: ({ offsetX, offsetY }) => {
							 const width = ($bgsize.width * $bgscale - $uisize.width) * -1;
						 	 const height = ($bgsize.height * $bgscale - $uisize.height) * -1;
							 const x = Math.min(0, Math.max(offsetX, width));
							 const y = Math.min(0, Math.max(offsetY, height));
						 	 position = { x, y };
							 console.log(offsetX,offsetY,position);
						}
					}}
					on:wheel={e => {
						e.preventDefault();
						const min = Math.max($uisize.width / $bgsize.width, $uisize.height / $bgsize.height);
						const max = 2;
						const oldScale = $bgscale;
						const newScale = Math.min(max, Math.max(min, $bgscale + e.deltaY * -1 / 1000));
						const scaleChange = newScale / oldScale;

						const rect = e.currentTarget.getBoundingClientRect();
						const offsetX = e.clientX - rect.left;
						const offsetY = e.clientY - rect.top;
						position = {
							x: (position.x - offsetX) * scaleChange + offsetX,
							y: (position.y - offsetY) * scaleChange + offsetY
						};

						const width = ($bgsize.width * newScale - $uisize.width) * -1;
						const height = ($bgsize.height * newScale - $uisize.height) * -1;
						position = {
							x: Math.min(0, Math.max(position.x, width)),
							y: Math.min(0, Math.max(position.y, height))
						};

						$bgscale = newScale;
					}}
				>
					{#each canvaces as canvas}
						<CanvasCard class="card" {canvas} />
					{/each}
				</div>
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
