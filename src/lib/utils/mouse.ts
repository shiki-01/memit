import { bgscale, bgpos, uisize } from './interface';
import type { PinchCustomEvent } from 'svelte-gestures';

const handlePinch = (e: PinchCustomEvent | WheelEvent) => {
	if (typeof window === 'undefined') return;

	let before = 0;

	let [width, height] = [0, 0];
	uisize.subscribe(value => {
		width = value.width;
		height = value.height;
	});

	const minScale = Math.max(width, height) / 10000;

	let centerX: number, centerY: number;
	let scaleDelta: number;

	if ('deltaY' in e) {
		centerX = e.clientX;
		centerY = e.clientY;
		scaleDelta = e.deltaY * -1 / 10000;
	} else {
		centerX = e.detail.center.x;
		centerY = e.detail.center.y;
		scaleDelta = (e.detail.scale - before - 1) * 0.05;
		before = e.detail.scale;
	}

	bgscale.update(currentScale => {
		const newScale = Math.max(currentScale + scaleDelta, minScale);

		console.log(newScale);

		bgpos.update(currentPos => {
			const scaleRatio = newScale / currentScale;
			return {
				x: centerX - (centerX - currentPos.x) * scaleRatio,
				y: centerY - (centerY - currentPos.y) * scaleRatio
			};
		});

		return newScale;
	});
};

export { handlePinch };