<script lang="ts">
    import type { Canvas } from "$lib/types";
    import Color from "$lib/utils/colors";
    import { draggable } from "$lib/utils/actions";
    import { bgpos, status } from "$lib/utils/interface";

    export let canvas: Canvas | null = null;

    let { width, height } = canvas?.size || { width: 150, height: 100 };
    let x = 100, y = 100;
    let { background, backgroundColor } = canvas?.style || { background: 'none', backgroundColor: 'stone'} as Canvas['style']
    let text = canvas?.data?.text || '';

    let canvasEl: HTMLCanvasElement | null = null;

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

    $: if (canvas) {
        ({ width, height } = canvas.size);
        let baseX = $bgpos.x;
        let baseY = $bgpos.y;
        canvas.position.subscribe(({ x: dx, y: dy }) => {
            x = baseX + dx;
            y = baseY + dy;
        });
    }
</script>

{#if canvas}
    <canvas
        bind:this={canvasEl}
        {width} {height}
        class="absolute z-10"
        style="
            top: {y}px;
            left: {x}px;
            width: {width}px;
            background: { Color(backgroundColor, 'background', 'light') };
            transition: width 0.5s, height 0.5s;
        "
        use:draggable={canvas.position}
        on:click={() => {
            if (!canvasEl) return;
            if ($status) {
                const style = canvasEl.style;
                style.width = '100vw';
                style.height = '100vh';
                style.objectFit = 'cover';
                style.top = '0';
                style.left = '0';
                status.set(null);
            } else {
                const style = canvasEl.style;
                style.width = '100%';
                style.objectFit = 'contain';
                style.top = '50%';
                style.left = '50%';
                style.transform = 'translate(-50%, -50%)';
                status.set(canvas)
            }
        }}
    />
{/if}