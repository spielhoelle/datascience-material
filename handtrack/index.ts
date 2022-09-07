// @ts-ignore
import * as handTrack from './node_modules/handtrackjs/src/index.js';
import { moveBall, movePlayer } from './pong'
var zPressed = false;
var sPressed = false;
var upPressed = false;
var downPressed = false;
interface Prediction {
	bbox: number[]
	class: number
	label: string
	score: string
}
(async () => {
	const defaultParams = {
		flipHorizontal: true,
		outputStride: 16,
		imageScaleFactor: 1,
		maxNumBoxes: 20,
		iouThreshold: 0.2,
		scoreThreshold: 0.6,
		modelType: "ssd320fpnlite",
		modelSize: "small",
		bboxLineWidth: "2",
		fontSize: 17,
	};

	const model = await handTrack.load(defaultParams)
	const video = document.getElementById('videoelement');
	const canvas = document.getElementById('result');
	const loader = document.getElementById('loader');
	if (video && canvas) {
		const ctx = (canvas as any).getContext("2d")
		handTrack.startVideo(video);
		video.addEventListener('loadeddata', async (event) => {
			video.style.width = "100%"
			video.style.height = "100%"
			video.style.opacity = 0
			loader.style.display = "none"

			canvas.style.width = "100%"
			canvas.style.height = "100%"
			setInterval(async () => {
				const predictions = await model.detect(video);
				const hands = predictions.filter((p: Prediction) => p.label === "closed" || p.label === "point" || p.label === "open")
				if (hands) {
					const leftHand = hands.find((hand: Prediction) => (hand.bbox[0] + hand.bbox[2]) < canvas.clientWidth / 2)
					const rightHand = hands.find((hand: Prediction) => (hand.bbox[0] + hand.bbox[2]) > canvas.clientWidth / 2)
					if (leftHand) {
						sPressed = leftHand.label === "point"
						zPressed = leftHand.label === "closed"
					}
					if (rightHand) {
						upPressed = rightHand.label === "point"
						downPressed = rightHand.label === "closed"
					}
					if (!rightHand && !leftHand) {
						sPressed = false
						zPressed = false
					}
					moveBall()
					movePlayer(sPressed, zPressed, upPressed, downPressed)
				} else {
					sPressed = false
					zPressed = false
				}
				model.renderPredictions(predictions, canvas, ctx, video);
			}, 1)
		});
	}
})()