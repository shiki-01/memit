<script lang="ts">
	import type { Canvas } from '$lib/types';
	import { status, uisize } from '$lib/utils/interface';
	import Color from '$lib/utils/colors';
	import { fly } from 'svelte/transition';
	import type EditorJS from '@editorjs/editorjs';
	import { onMount } from 'svelte';
	import '$lib/styles/editor.scss'

	export let canvas: Canvas | null = null;

	let { width, height } = canvas?.size || { width: 150, height: 100 };
	let x = 0,
		y = 0,
		startX = 0,
		startY = 0;
	let isDragging = true;
	let { background, backgroundColor } =
	canvas?.style || ({ background: 'none', backgroundColor: 'stone' } as Canvas['style']);
	let text = canvas?.data?.text || null;

	let canvasEl: HTMLButtonElement | null = null;
	let cardscale = Math.min($uisize.width / width, $uisize.height / height);

	const transCSS = (is: boolean = false) => {
		return [
			`top ${is ? '0s' : '0.5s'}`,
			`left ${is ? '0s' : '0.5s'}`,
			'width 0.5s',
			'height 0.5s'
		].join(', ');
	};

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

	let isEditing = false;
	let editor: EditorJS | null = null;

	let editorJS: HTMLDivElement | null = null;

	$: if (editor) {
		editor.readOnly.toggle(isEditing);
	}

	onMount(async () => {
		if (!editorJS) return;
		const EditorJS = (await import('@editorjs/editorjs')).default;

		const Header = (await import('@editorjs/header')).default;
		const List = (await import('@editorjs/list')).default;

		editor = new EditorJS({
			holder: editorJS,
			tools: {
				header: Header,
				list: List
			},
			data: {
				blocks: [
					{
						type: 'header',
						data: {
							text: 'Hello, World!',
							level: 1
						}
					},
					{
						type: 'list',
						data: {
							style: 'unordered',
							items: ['Hello, World!']
						}
					}
				]
			}
		});
	});
</script>

<button
	bind:this={canvasEl}
	class="absolute z-10 py-1 px-2"
	style="
		width: {width}px;
		height: {height}px;
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
	on:dblclick={() => {
		isEditing = !isEditing;
	}}
>
	{#if background === 'none'}
		{#if text}
			<div
				style="
					width: 100%;
					height: 100%;
					display: grid;
				"
				class="overflow-hidden"
			>
				<div
					bind:this={editorJS}
					style="
						font-size: {text.size};
						place-items: {text.align} {text.justify};
					"
				></div>
			</div>
		{:else}
			<div class="text-center">
				No Background
			</div>
		{/if}
	{:else}
		<img
			src={background}
			alt="Background"
			class="w-full h-full object-cover"
		/>
	{/if}
</button>
