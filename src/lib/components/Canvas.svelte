<script lang="ts">
	import type { Canvas } from '$lib/types';
	import { status, uisize } from '$lib/utils/interface';
	import Color from '$lib/utils/colors';
	import { fly } from 'svelte/transition';

	export let canvas: Canvas | null = null;

	let { width, height } = canvas?.size || { width: 150, height: 100 };
	let x = 0,
		y = 0,
		startX = 0,
		startY = 0;
	let isDragging = true;
	let { background, backgroundColor } =
	canvas?.style || ({ background: 'none', backgroundColor: 'stone' } as Canvas['style']);
	let text = canvas?.data?.text || '';

	let canvasEl: HTMLCanvasElement | null = null;
	let cardscale = Math.min($uisize.width / width, $uisize.height / height);

	const transCSS = (is: boolean = false) => {
		return [
			`top ${is ? '0s' : '0.5s'}`,
			`left ${is ? '0s' : '0.5s'}`,
			'width 0.5s',
			'height 0.5s'
		].join(', ');
	};

	$: if (canvasEl) {
		let ctx = canvasEl.getContext('2d');
		if (ctx) {
			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = Color(backgroundColor, 'background', 'light');
			ctx.fillRect(0, 0, width, height);
			ctx.fillStyle = Color('stone', 'text', 'light');
			ctx.font = '20px sans-serif';
			ctx.fillText(text, 10, 20);
		}
	}

	const handlePointerDown = (e: PointerEvent) => {
		isDragging = true;
		startX = e.clientX;
		startY = e.clientY;
		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerup', handlePointerUp);
		canvasEl?.style.setProperty('transition', transCSS(true));
		canvasEl?.style.setProperty('cursor', 'grabbing');
	};

	const handlePointerMove = (e: PointerEvent) => {
		if (!isDragging) return;
		const deltaX = e.clientX - startX;
		const deltaY = e.clientY - startY;

		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			x = 0;
			y = 0;
		} else {
			x = 0;
			y = deltaY;
		}
	};

	const handlePointerUp = () => {
		isDragging = false;
		window.removeEventListener('pointermove', handlePointerMove);
		window.removeEventListener('pointerup', handlePointerUp);
		canvasEl?.style.setProperty('transition', transCSS());
		canvasEl?.style.setProperty('cursor', 'grab');

		if (y > 100) {
			status.set(null);
		} else {
			x = 0;
			y = 0;
		}
	};
</script>

<canvas
	bind:this={canvasEl}
	{width}
	{height}
	class="absolute z-10"
	style="
		top: calc(50% + {y}px);
		left: calc(50% + {x}px);
		background: {Color(backgroundColor, 'background', 'light')};
		transition: {transCSS()};
		object-fit: cover;
		transform: translate(-50%, -50%) scale({cardscale});
		cursor: grab;
	"
	transition:fly={{ y: 100, duration: 200 }}
	on:pointerdown={handlePointerDown}
	on:wheel={e => {
		e.preventDefault();
		cardscale = cardscale + e.deltaY * -1 / 1000;
	}}
/>
