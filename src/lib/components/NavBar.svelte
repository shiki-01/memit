<script lang="ts">
    import Icon from "$lib/components/Icon.svelte";
    import NavIcon from "$lib/components/NavIcon.svelte";
    import Color from "$lib/utils/colors";
    import { menupos } from "$lib/utils/interface";
    import { returnMousePosition } from "$lib/utils/mouse";

    const restProps = Object.fromEntries(
        Object.entries($$restProps).filter(([key]) => key !== 'class' && key !== 'style')
    );

    let isDragging: boolean = false;

    $: if (typeof window !== 'undefined') {
        if ($menupos.x < 40) menupos.set({ x: 40, y: $menupos.y });
        if ($menupos.y < 30) menupos.set({ x: $menupos.x, y: 30 });
        if ($menupos.x > window.innerWidth - 40) menupos.set({ x: window.innerWidth - 40, y: $menupos.y });
        if ($menupos.y > window.innerHeight - 20) menupos.set({ x: $menupos.x, y: window.innerHeight - 20 });
    }

    function handlePointerMove(e: PointerEvent) {
        if (isDragging && typeof window !== 'undefined') {
            menupos.set(returnMousePosition(e));
        }
    }

    function handlePointerUp() {
        isDragging = false;
        if (typeof window !== 'undefined') {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        }
    }

    function handlePointerDown() {
        isDragging = true;
        if (typeof window !== 'undefined') {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        }
    }
</script>

<header
    class="w-[80px] h-[400px] flex flex-col items-center py-6 rounded-full shadow-2xl { $$props.class }"
    style="
        -tw-shadow-color: { Color('stone','shadow','light') };
        --tw-shadow: var(--tw-shadow-colored);
        color: { Color('stone','text','light') };
        background: { Color('stone','background','light') };
        transform: translate( -40px, -30px);
        { $$props.style }
    "
    { ...restProps }
>
    <button
        class="cursor-grab {isDragging ? 'cursor-grabbing' : ''}"
        on:pointerdown={handlePointerDown}
    >
        <Icon icon="lucide:grip-horizontal" />
    </button>
    <div class="h-full flex flex-col justify-center gap-6">
        <NavIcon icon="lucide:home" text="Home" />
        <NavIcon icon="lucide:clipboard" text="Card" />
        <NavIcon icon="lucide:camera" text="Camera" />
        <NavIcon icon="lucide:image" text="File" />
    </div>
</header>