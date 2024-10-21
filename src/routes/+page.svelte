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
		const { clientX, clientY }: { clientX: number; clientY: number } = e;
		pinchPos.set({ x: clientX, y: clientY });
	};

	import InfiniteViewer from 'svelte-infinite-viewer';
	import { createGesture, dragAction, pinchAction } from '@use-gesture/vanilla';
	import { spring, type Spring } from 'svelte/motion';

	let element: HTMLElement | null = null;
	let scale = spring(1);
	let positionn = spring({ x: 0, y: 0 });

	const gesture = createGesture([dragAction, pinchAction]);

	$: minScale = Math.max($uisize.width / $bgsize.width, $uisize.height / $bgsize.height);

	function ensureBounds(pos: { x: number; y: number }, scl: number) {
		const maxX = Math.max(0, $uisize.width - $bgsize.width * scl);
		const maxY = Math.max(0, $uisize.height - $bgsize.height * scl);
		test = JSON.stringify(pos) + ' ' + maxX.toString() + ' ' + maxY.toString();
		return {
			x: Math.min(Math.max(pos.x, maxX), 0),
			y: Math.min(Math.max(pos.y, maxY), 0)
		};
	}

	function adjustPositionForPinch(
		pos: { x: number; y: number },
		oldScale: number,
		newScale: number,
		center: { x: number; y: number }
	) {
		const scaleRatio = newScale / oldScale;
		return {
			x: center.x - (center.x - pos.x) * scaleRatio,
			y: center.y - (center.y - pos.y) * scaleRatio
		};
	}

	function handleGestures(element: HTMLElement) {
		if (!element) return;
		const gestureHandler = gesture(
			element,
			{
				onDrag: ({ offset: [x, y] }) => {
					const newPosition = ensureBounds({ x, y }, $scale);
					positionn.set(newPosition);
					//test = newPosition.x.toString() + ' ' + newPosition.y.toString();
				},
				onPinch: ({ offset: [d], origin: [ox, oy] }) => {
					const newScale = Math.max(minScale, d)
					const center = { x: ox, y: oy };
					const newPosition = adjustPositionForPinch($positionn, $scale, newScale, center);
					scale.set(newScale);
					positionn.set(ensureBounds(newPosition, newScale));
				}
			},
			{
				drag: { from: () => [$positionn.x, $positionn.y] },
				pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true }
			}
		);

		return {
			destroy() {
				gestureHandler.destroy();
			}
		};
	}

	let viewer: InfiniteViewer | null = null;
	let viewport: HTMLDivElement | null = null;

	/**$: if (viewer) {
		let x: number = 0, y: number = 0;

		viewer.setZoom($bgscale)
		viewer.setTo({x: 0, y: 0})

		if ($isDragging) {
			viewer.setTo({x,y})
		} else {
			x = viewer.getScrollLeft();
			y = viewer.getScrollTop();
		}
	}**/

	$: {
		const scaledWidth = $bgsize.width * $bgscale;
		const scaledHeight = $bgsize.height * $bgscale;

		const maxMoveX = Math.max((scaledWidth - $uisize.width) / 2, 0);
		const maxMoveY = Math.max((scaledHeight - $uisize.height) / 2, 0);

		$bgpos.x = Math.max(-maxMoveX, Math.min(maxMoveX, $bgpos.x));

		$bgpos.y = Math.max(-maxMoveY, Math.min(maxMoveY, $bgpos.y));
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			size({ width: window.innerWidth, height: window.innerHeight });
		}
	});

	let before = 0;
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
			<!--<InfiniteViewer
			    bind:this={viewer}
				className="viewer"
				margin={0}
				threshold={0}
				rangeX={[0, $bgsize.width]}
				rangeY={[0, $bgsize.height]}
				useMouseDrag={true}
				usePinch={true}
				pinchThreshold={1}
				on:pinchStart={() => before = 1}
				on:pinch={(e) => {
					handlePinch(e,before)
					before = e.detail.scale
					test = (e.detail.scale / 10 - 0).toString()
				}}
>-->{$positionn.x}
			{$positionn.y}
			{$scale}
			{test}
			<div
				bind:this={element}
				use:handleGestures
				style="
				    position: relative;
				    background: red;
				    width: {$bgsize.width}px;
					height: {$bgsize.height}px;
				    transform: translate({$positionn.x}px, {$positionn.y}px) scale({$scale});
					
				"
			>
				<div
					class="viewport"
					style="
				"
				>
					<!--<div
					class="w-full h-full -z-10"
					use:draggable={{ params: bgpos, strict: true }}
					use:pinch
					on:pinch={handlePinch}
				/>-->
					{#each canvaces as canvas}
						<CanvasCard {canvas} />
					{/each}
				</div>
			</div>
			<!--</InfiniteViewer>-->
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
