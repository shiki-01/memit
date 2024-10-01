import {type Writable, writable} from "svelte/store";

const menupos: Writable<{x: number, y: number}> = writable({x: 0, y: 0});

export { menupos };