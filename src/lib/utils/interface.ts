import type { Position } from "$lib/types";
import {type Writable, writable} from "svelte/store";

const menupos: Writable<Position> = writable({x: 60, y: 60});

export { menupos };