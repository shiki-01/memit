<script lang="ts">
    import '../app.css';
    import Color from "$lib/utils/colors";
    import NavBar from "$lib/components/NavBar.svelte";
    import Canvas from '$lib/components/Canvas.svelte';
    import { menupos } from "$lib/utils/interface";
	import { writable } from 'svelte/store';

    const position = writable({x: 100, y: 100})
</script>

<main
    class="w-[100svw] h-[100svh] overflow-hidden relative touch-none"
    style="background: { Color('teal','background','light') }"
>
    <NavBar
        class="absolute"
        style="top: {$menupos.y}px; left: {$menupos.x}px"
    />

    <Canvas canvas={
        {
            size: {
                width: 200,
                height: 150,
            },
            position,
            style: {
                background: 'none',
                backgroundColor: 'stone'
            }
        }
    }
    />
    hello{$menupos.x} {$menupos.y}
</main>