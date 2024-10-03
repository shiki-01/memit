import { writable, type Writable } from 'svelte/store';
import type { Position } from '$lib/types';
import { bgscale } from './interface';
import type { PinchCustomEvent } from 'svelte-gestures';

export const pos = writable({x: 0, y: 0})
const returnMousePosition = (e: PointerEvent) => {
    pos.set({x: e.clientX, y: e.clientY})
    return {
        x: e.clientX,
        y: e.clientY
    } as Position;
}

const handlePointerMove = (e: PointerEvent, store: Writable<Position> | Position) => {
    if (typeof window !== 'undefined') {
        if ('set' in store) {
            let x = e.clientX;
            let y = e.clientY;
            (store as Writable<Position>).set({x,y});
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

const handlePinch = (e: PinchCustomEvent) => {
    let before = 0
    if (typeof window !== 'undefined') {
        bgscale.update(v => v + e.detail.scale - before - 1)
        before = e.detail.scale
    }
}

const handlePointerMoveWrapper = (store: Writable<Position> | Position) => (e: PointerEvent) => handlePointerMove(e, store);
const handlePointerUpWrapper = (store: Writable<Position> | Position) => () => handlePointerUp(store);

export { returnMousePosition, handlePointerMove, handlePointerUp, handlePointerDown, handlePinch };