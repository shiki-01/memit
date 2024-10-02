<script lang="ts">
    import type { Canvas } from "$lib/types";
    import Color from "$lib/utils/colors";
	import { handlePointerDown } from "$lib/utils/mouse";
	import type { Position } from "$lib/types";

    export let canvas: Canvas | null = null;

    let { width, height } = canvas?.size || { width: 150, height: 100 };
    let x = 100, y = 100;
    let { background, backgroundColor } = canvas?.style || { background: 'none', backgroundColor: 'stone'} as Canvas['style']

    $: if (canvas) {
        ({ width, height } = canvas.size);
        canvas.position.subscribe(v => {
            ({ x, y } = v)
        })
    }

    let isDragging = false;

    $: if (isDragging && canvas) {
        handlePointerDown(canvas.position);
    }
</script>

{#if canvas}
    <canvas
        {width} {height}
        class="absolute"
        style="
            top: {y}px;
            left: {x}px;
            background: { Color(backgroundColor, 'background', 'light') };
        "
        on:pointerdown={() => isDragging = true}
        on:pointerup={() => isDragging = false}
    ></canvas>{x} {y} {isDragging}
{/if}