import type {Writable} from "svelte/store";
import type {Position} from "$lib/types";

const draggable = (node: HTMLElement, params: Writable<Position>) => {
    let position: Position;
    params.subscribe(value => position = value);
    let isDragging: boolean = false;
    let startX: number, startY: number;

    const handlePointerDown = (event: PointerEvent) => {
        isDragging = true;
        startX = event.clientX - position.x;
        startY = event.clientY - position.y;
        node.setPointerCapture(event.pointerId);
    }

    const handlePointerMove = (event: PointerEvent) => {
        if (!isDragging) return
        params.set({
            x: event.clientX - startX,
            y: event.clientY - startY
        });
    }

    const handlePointerUp = (event: PointerEvent) => {
        console.log(event.button)
        if (event.button !== 0) return;
        isDragging = false;
        console.log('up')
        node.releasePointerCapture(event.pointerId);
    }

    const handleContextMenu = (event: MouseEvent) => {
        if (isDragging) return
        event.preventDefault();
    }

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
}

export {draggable};