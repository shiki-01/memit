<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	export let icon: string;
	export let text: string;
</script>

<div
	class="flex flex-col items-center gap-1 cursor-pointer"
>
	<Icon icon="{icon}" />
	<p class="text-sm">{text}</p>
</div>