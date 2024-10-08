import type { Canvas, Size, Position } from '$lib/types';
import { type Writable, writable } from 'svelte/store';

const menupos: Writable<Position> = writable({ x: 60, y: 60 });

const uisize: Writable<Size> = writable({ width: 0, height: 0 });

const bgpos: Writable<Position> = writable({ x: 0, y: 0 });
const bgsize: Writable<Size> = writable({ width: 10000, height: 10000 });
const bgscale: Writable<number> = writable(1);

const pinchPos: Writable<Position> = writable({ x: 0, y: 0 });

const status: Writable<null | Canvas> = writable(null);

export { menupos, uisize, bgpos, bgsize, bgscale, pinchPos, status };