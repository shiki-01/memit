<script lang="ts">
	import { tap } from 'svelte-gestures';
	import type { Canvas } from '$lib/types';
	import Color from '$lib/utils/colors';
	import { draggable } from '$lib/utils/actions';
	import { bgpos, bgscale, status } from '$lib/utils/interface';

	export let canvas: Canvas | null = null;

	let { width, height } = canvas?.size || { width: 150, height: 100 };
	let x = 100, y = 100;
	let { background, backgroundColor } = canvas?.style || {
		background: 'none',
		backgroundColor: 'stone'
	} as Canvas['style'];
	let text = canvas?.data?.text || '';

	let canvasEl: HTMLCanvasElement | null = null;
	let isTap = false;

	$: if (canvasEl) {
		let ctx = canvasEl.getContext('2d');
		if (ctx) {
			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = Color(backgroundColor, 'background', 'light');
			ctx.fillRect(0, 0, width, height);
			ctx.fillStyle = Color('stone', 'text', 'light');
			ctx.font = '20px sans-serif';
			text = x + ', ' + y + ', \n' + x*$bgscale + ', ' + y*$bgscale;
			ctx.fillText(text, 10, 20);
		}
	}

	$: if (canvas) {
		({ width, height } = canvas.size);
		canvas.position.subscribe(({ x: dx, y: dy }) => {
			x = dx;
			y = dy;
		});
	}

</script>

{#if canvas}
	<canvas
		bind:this={canvasEl}
		width={width}
		height={height}
		class="absolute cursor-grab z-10"
		style="
      top: {y}px;
      left: {x}px;
      background: { Color(backgroundColor, 'background', 'light') };
    "
		use:draggable={{ params: canvas.position }}
		use:tap
		on:tap={() => isTap = !isTap}
		on:click={(e) => {
      if (!canvasEl || !isTap) return;
      if (!$status && e.button === 0) {
        status.set(canvas)
        isTap = false;
      }
    }}
	/>
{/if}