<script lang="ts">
	import type { Canvas } from '$lib/types';
	import Color from '$lib/utils/colors';
	import { bgpos, bgscale, status } from '$lib/utils/interface';
	import { draggable } from '@neodrag/svelte';

	export let canvas: Canvas | null = null;

	let { width, height } = canvas?.size || { width: 150, height: 100 };
	let x = 100, y = 100;
	let { background, backgroundColor } = canvas?.style || {
		background: 'none',
		backgroundColor: 'stone'
	} as Canvas['style'];
	let text = canvas?.data?.text || '';

	let canvasEl: HTMLDivElement | null = null;
	let isTap = false;

	$: if (canvas) {
		({ width, height } = canvas.size);
		canvas.position.subscribe(({ x: dx, y: dy }) => {
			x = dx;
			y = dy;
		});
	}

	let dragging = { x: 0, y: 0 };

</script>

{#if canvas}
	<button
		class="absolute cursor-grab z-10 {$$props.class}"
		style="
			width: {width}px;
			height: {height}px;
      top: {y}px;
      left: {x}px;
      background: { Color(backgroundColor, 'background', 'light') };
    "
		use:draggable={{
			position: { x, y },
			onDragStart: () => {
				dragging = { x, y };
			},
			onDrag: ({ offsetX, offsetY }) => {
				canvas.position.update((pos) => {
					return {
						x: pos.x + offsetX - dragging.x,
						y: pos.y + offsetY - dragging.y
					};
				});
				dragging = { x: offsetX, y: offsetY };
			}
		}}
		on:click={(e) => {
      //if (!canvasEl || !isTap) return;
      if (!$status && e.button === 0) {
        status.set(canvas)
        isTap = false;
      }
    }}
	>
		{#if background === 'none'}
			{#if text}
				<p class="text-sm text-stone">{text}</p>
			{/if}
		{:else}
			<img
				src={background}
				alt={text}
				class="w-full h-full object-cover"
				style="background-size: {bgscale}; background-position: {bgpos};"
			/>
		{/if}
	</button>
{/if}