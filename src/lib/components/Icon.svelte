<script lang="ts">
	import Icon from '@iconify/svelte';

	export let icon: string;
</script>

<Icon
	icon={icon}
	class="w-8 h-8 box-content {$$props.class}"
/>