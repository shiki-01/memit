import type {Canvas, Position} from "$lib/types";
import {type Writable, writable} from "svelte/store";

const menupos: Writable<Position> = writable({x: 60, y: 60});

const bgpos: Writable<Position> = writable({x: 0, y: 0});
const bgscale: Writable<number> = writable(0);

const status: Writable<null | Canvas> = writable(null);

export { menupos, bgpos, bgscale, status };