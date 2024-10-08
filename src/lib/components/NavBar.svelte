<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import NavIcon from '$lib/components/NavIcon.svelte';
	import Color from '$lib/utils/colors';
	import { menupos } from '$lib/utils/interface';
	import { draggable } from '$lib/utils/actions';

	const restProps = Object.fromEntries(
		Object.entries($$restProps).filter(([key]) => key !== 'class' && key !== 'style')
	);

	$: if (typeof window !== 'undefined') {
		if ($menupos.x < 40) menupos.set({ x: 40, y: $menupos.y });
		if ($menupos.y < 30) menupos.set({ x: $menupos.x, y: 30 });
		if ($menupos.x > window.innerWidth - 40) menupos.set({ x: window.innerWidth - 40, y: $menupos.y });
		if ($menupos.y > window.innerHeight - 20) menupos.set({ x: $menupos.x, y: window.innerHeight - 20 });
		window.localStorage.setItem('menupos', JSON.stringify($menupos));
	}
</script>

<header
	class="w-[400px] h-[80px] touch-none flex flex-row items-center px-6 rounded-full shadow-2xl { $$props.class }"
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
		class="cursor-grab"
		use:draggable={{ params: menupos, strict: true }}
	>
		<Icon icon="lucide:grip-horizontal" />
	</button>
	<div class="w-full flex flex-row justify-center items-center gap-8">
		<NavIcon icon="lucide:home" text="Home" />
		<NavIcon icon="lucide:clipboard" text="Card" />
		<NavIcon icon="lucide:camera" text="Camera" />
		<NavIcon icon="lucide:image" text="File" />
	</div>
</header>