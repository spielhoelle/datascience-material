var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
import * as handTrack from './node_modules/handtrackjs/src/index.js';
import { moveBall, movePlayer } from './pong';
var zPressed = false;
var sPressed = false;
var upPressed = false;
var downPressed = false;
(() => __awaiter(void 0, void 0, void 0, function* () {
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
    const model = yield handTrack.load(defaultParams);
    const video = document.getElementById('videoelement');
    const canvas = document.getElementById('result');
    const loader = document.getElementById('loader');
    if (video && canvas) {
        const ctx = canvas.getContext("2d");
        handTrack.startVideo(video);
        video.addEventListener('loadeddata', (event) => __awaiter(void 0, void 0, void 0, function* () {
            video.style.width = "100%";
            video.style.height = "100%";
            video.style.opacity = 0;
            loader.style.display = "none";
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
                const predictions = yield model.detect(video);
                const hands = predictions.filter((p) => p.label === "closed" || p.label === "point" || p.label === "open");
                if (hands) {
                    const leftHand = hands.find((hand) => (hand.bbox[0] + hand.bbox[2]) < canvas.clientWidth / 2);
                    const rightHand = hands.find((hand) => (hand.bbox[0] + hand.bbox[2]) > canvas.clientWidth / 2);
                    if (leftHand) {
                        sPressed = leftHand.label === "point";
                        zPressed = leftHand.label === "closed";
                    }
                    if (rightHand) {
                        upPressed = rightHand.label === "point";
                        downPressed = rightHand.label === "closed";
                    }
                    if (!rightHand && !leftHand) {
                        sPressed = false;
                        zPressed = false;
                    }
                    moveBall();
                    movePlayer(sPressed, zPressed, upPressed, downPressed);
                }
                else {
                    sPressed = false;
                    zPressed = false;
                }
                model.renderPredictions(predictions, canvas, ctx, video);
            }), 1);
        }));
    }
}))();
