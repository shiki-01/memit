import type { Writable } from 'svelte/store';
import type { Position } from '$lib/types';
import { bgscale } from '$lib/utils/interface';

const draggable = (node: HTMLElement, params: Writable<Position>) => {
	let position: Position;
	let scale: number = 1;

	params.subscribe(value => position = value);
	bgscale.subscribe(value => scale = value);

	let isDragging: boolean = false;
	let startX: number, startY: number;

	const handlePointerDown = (event: PointerEvent) => {
		if (event.button !== 0) return;
		isDragging = true;
		startX = (event.clientX - position.x　* scale) / scale;
		startY = (event.clientY - position.y * scale) / scale;
		node.setPointerCapture(event.pointerId);
		node.style.cursor = 'grabbing';
	};

	const handlePointerMove = (event: PointerEvent) => {
		if (!isDragging) return;
		params.set({
			x: event.clientX / scale - startX,
			y: event.clientY / scale - startY
		});
	};

	const handlePointerUp = (event: PointerEvent) => {
		if (event.button !== 0) return;
		isDragging = false;
		node.releasePointerCapture(event.pointerId);
		node.style.cursor = 'grab';
	};

	const handleContextMenu = (event: MouseEvent) => {
		if (isDragging) return;
		event.preventDefault();
	};

	node.addEventListener('pointerdown', handlePointerDown);
	node.addEventListener('pointermove', handlePointerMove);
	node.addEventListener('pointerup', handlePointerUp);
	node.addEventListener('pointercancel', handlePointerUp);
	node.addEventListener('contextmenu', handleContextMenu);

	return {
		destroy() {
			node.removeEventListener('pointerdown', handlePointerDown);
			node.removeEventListener('pointermove', handlePointerMove);
			node.removeEventListener('pointerup', handlePointerUp);
			node.removeEventListener('pointercancel', handlePointerUp);
			node.removeEventListener('contextmenu', handleContextMenu);
		}
	};
};

export { draggable };