import { bgscale, bgpos, uisize } from './interface';
import type { OnPinch } from 'infinite-viewer';

const handlePinch = (e: CustomEvent<OnPinch>, before: number) => {
	if (typeof window === 'undefined') return;

	let [width, height] = [0, 0];
	uisize.subscribe(value => {
		width = value.width;
		height = value.height;
	});

	const minScale = Math.max(width, height) / 10000;

	let centerX: number, centerY: number;
	let scaleDelta: number;

		centerX = 0
		centerY = 0;
		scaleDelta = (e.detail.scale - before) * 1;

	bgscale.update(currentScale => {
		const newScale = Math.max(currentScale + scaleDelta, minScale);

		console.log(newScale);

		/**bgpos.update(currentPos => {
			const scaleRatio = newScale / currentScale;
			return {
				x: centerX - (centerX - currentPos.x) * scaleRatio,
				y: centerY - (centerY - currentPos.y) * scaleRatio
			};
		});**/

		return newScale;
	});
};

export { handlePinch };