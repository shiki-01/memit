import { bgscale, uisize } from './interface';
import type { PinchCustomEvent } from 'svelte-gestures';

const handlePinch = (e: PinchCustomEvent | WheelEvent) => {
    let before = 0;
    if (typeof window === 'undefined') return;

    let [width, height] = [0, 0];
    uisize.subscribe(value => {
        width = value.width;
        height = value.height;
    });

    const minScale = Math.max(width, height) / 10000;

    if ('deltaY' in e) {
        bgscale.update(v => {
            const value = v + e.deltaY / 10000;
            return value > minScale ? value : minScale;
        });
    } else {
        bgscale.update(v => {
            const newScale = v + e.detail.scale - before - 1;
            before = e.detail.scale;
            return newScale > minScale ? newScale : minScale;
        });
    }
}

export { handlePinch };