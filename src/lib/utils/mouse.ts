import { writable, type Writable } from 'svelte/store';
import type { Position } from '$lib/types';

const returnMousePosition = (e: PointerEvent) => {
    return {
        x: e.clientX,
        y: e.clientY
    } as Position;
}

const handlePointerMove = (e: PointerEvent, store: Writable<Position> | Position) => {
    if (typeof window !== 'undefined') {
        if ('set' in store) {
            (store as Writable<Position>).set(returnMousePosition(e));
        } else {
            return returnMousePosition(e);
        }
    }
}

const handlePointerUp = (store: Writable<Position> | Position) => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('pointermove', handlePointerMoveWrapper(store));
        window.removeEventListener('pointerup', handlePointerUpWrapper(store));
    }
}

const handlePointerDown = (store: Writable<Position> | Position) => {
    if (typeof window !== 'undefined') {
        window.addEventListener('pointermove', handlePointerMoveWrapper(store));
        window.addEventListener('pointerup', handlePointerUpWrapper(store));
    }
}

const handlePointerMoveWrapper = (store: Writable<Position> | Position) => (e: PointerEvent) => handlePointerMove(e, store);
const handlePointerUpWrapper = (store: Writable<Position> | Position) => () => handlePointerUp(store);

export { returnMousePosition, handlePointerMove, handlePointerUp, handlePointerDown };