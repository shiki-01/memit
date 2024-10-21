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

	const pinched = (e: MouseEvent) => {
		const { clientX, clientY }: { clientX: number; clientY: number } = e;
		pinchPos.set({ x: clientX, y: clientY });
	};

	import InfiniteViewer from 'svelte-infinite-viewer';
	import { createGesture, dragAction, pinchAction, wheelAction, DragGesture, PinchGesture } from '@use-gesture/vanilla';
	import { spring } from 'svelte/motion';

	let canvas: HTMLDivElement;
	let cards: HTMLDivElement[] = [];
	let scale = 1;
	let x = 0;
	let y = 0;

	const MIN_SCALE = 0.5;
	const MAX_SCALE = 3;
	const SCALE_SENSITIVITY = 0.0005;

	onMount(() => {
		const dragGesture = new DragGesture(
			canvas,
			({ movement: [mx, my], offset: [ox, oy] }) => {
				x = ox;
				y = oy;
				updateCanvasPosition();
			}
		);

		const pinchGesture = new PinchGesture(
			canvas,
			({ origin: [ox, oy], offset: [s], movement: [ms], event }) => {
				scale = clamp(s, MIN_SCALE, MAX_SCALE);
				updateCanvasPosition(ox, oy);
			}
		);

		window.addEventListener('wheel', onWheel, { passive: false });

		return () => {
			dragGesture.destroy();
			pinchGesture.destroy();
			window.removeEventListener('wheel', onWheel);
		};
	});

	function onWheel(event: WheelEvent) {
		event.preventDefault();
		const delta = -event.deltaY * SCALE_SENSITIVITY;
		const newScale = clamp(scale * (1 + delta), MIN_SCALE, MAX_SCALE);

		if (newScale !== scale) {
			scale = newScale;
			updateCanvasPosition(event.clientX, event.clientY);
		}
	}

	function updateCanvasPosition(originX?: number, originY?: number) {
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		const canvasWidth = canvas.offsetWidth;
		const canvasHeight = canvas.offsetHeight;

		const scaledWidth = canvasWidth * scale;
		const scaledHeight = canvasHeight * scale;

		if (originX !== undefined && originY !== undefined) {
			const dx = (originX - windowWidth / 2) * (scale - 1);
			const dy = (originY - windowHeight / 2) * (scale - 1);
			x -= dx;
			y -= dy;
		}

		if (scaledWidth < windowWidth) {
			x = (windowWidth - scaledWidth) / 2;
		} else {
			// キャンバスが画面より大きい場合、端が見えないようにする
			const minX = windowWidth - scaledWidth;
			x = clamp(x, minX, 0);
		}

		if (scaledHeight < windowHeight) {
			y = (windowHeight - scaledHeight) / 2;
		} else {
			const minY = windowHeight - scaledHeight;
			y = clamp(y, minY, 0);
		}
		canvas.style.transform = `translate(${x}px, ${y}px)`;
	}

	function clamp(value: number, min: number, max: number): number {
		return Math.min(Math.max(value, min), max);
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
>--><div class="fixed z-50">
		</div>
			<div
				style="
				    position: relative;
				    width: 100%;
				    height: 100%;
				    touch-action: none;
				    scale: {scale};
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
					<div
						bind:this={canvas}
						style="
						border: 10px solid black;
						background: red;
							width: {$bgsize.width}px;
							height: {$bgsize.height}px;
							top: 50%;
							left: 50%;
							transform-origin: center center;
							touch-action: none;
						"
					>
						{#each canvaces as canvas}
							<CanvasCard {canvas} />
						{/each}
					</div>
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
