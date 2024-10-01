<script lang="ts">
    import '../app.css';
    import Color from "$lib/utils/colors";
    import NavBar from "$lib/components/NavBar.svelte";
    import { menupos } from "$lib/utils/interface";
</script>

<main
    class="w-[100svw] h-[100svh] overflow-hidden relative"
    style="background: { Color('teal','background','light') }"
>
    <NavBar
        class="absolute"
        style="top: {$menupos.y}px; left: {$menupos.x}px"
    />

    hello
</main>