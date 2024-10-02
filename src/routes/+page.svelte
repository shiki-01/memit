<script lang="ts">
    import '../app.css';
    import Color from "$lib/utils/colors";
    import NavBar from "$lib/components/NavBar.svelte";
    import Canvas from "$lib/components/Canvas.svelte";
    import CanvasCard from '$lib/components/CanvasCard.svelte';
    import {menupos, bgpos, status} from "$lib/utils/interface";
    import type {Canvas as CanvasType} from "$lib/types";
    import {writable} from 'svelte/store';
    import {draggable} from "$lib/utils/actions";

    const position = writable({x: 200, y: 100});
    const position2 = writable({x: 500, y: 100});

    const canvaces: CanvasType[] = [
        {
            size: {
                width: 200,
                height: 150,
            },
            position,
            style: {
                background: 'none',
                backgroundColor: 'stone'
            },
            data: {
                text: 'Hello World',
            }
        },
        {
            size: {
                width: 200,
                height: 150,
            },
            position: position2,
            style: {
                background: 'none',
                backgroundColor: 'stone'
            }
        }
    ];
</script>

<main
        class="w-[100svw] h-[100svh] overflow-hidden"
>
    <NavBar
            class="absolute z-20"
            style="top: {$menupos.y}px; left: {$menupos.x}px"
    />

    <div
            class="w-[100svw] h-[100svh] relative touch-none"
            style="background: { Color('teal','background','light') }"
    >
        {#if $status}
            <Canvas canvas={$status} />
        {:else}
            <div
                    class="w-full h-full -z-10"
                    use:draggable={bgpos}
            />
            {#each canvaces as canvas}
                <CanvasCard {canvas}/>
            {/each}
        {/if}
    </div>
</main>