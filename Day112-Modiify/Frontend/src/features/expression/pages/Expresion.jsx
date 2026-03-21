import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import "../../shared/style.scss";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const [emotion, setEmotion] = useState("Click 'Start Camera' to begin");
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const faceLandmarker = useRef(null);

  // 🎯 Initialize MediaPipe
  async function initModel() {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
      );

      faceLandmarker.current = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
        numFaces: 1,
      });
      console.log("Model initialized successfully");
    } catch (error) {
      console.error("Error initializing model:", error);
      setEmotion(`Failed to load face detection model: ${error.message}`);
    }
  }

  // 🎥 Start Webcam
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setIsCameraStarted(true);
      console.log("Camera started successfully");
    } catch (error) {
      console.error("Error accessing camera:", error);
      setEmotion("Camera access denied or not available");
    }
  }

  // 🧠 Emotion Logic
  function getEmotion(blendshapes) {
    const map = {};
    blendshapes.forEach((b) => {
      map[b.categoryName] = b.score;
    });

    if ((map.mouthSmileLeft || 0) + (map.mouthSmileRight || 0) > 0.8) {
      return "😊 Happy";
    }

    if ((map.mouthFrownLeft || 0) > 0.1 || (map.mouthFrownRight || 0) > 0.1) {
      return "😢 Sad";
    }

    if ((map.eyeWideLeft || 0) > 0.1 && (map.browInnerUp || 0) > 0.1) {
      return "😲 Surprised";
    }

    if ((map.browDownLeft || 0) > 0.1 && (map.browDownRight || 0) > 0.1) {
      return "😠 Angry";
    }

    return "😐 Neutral";
  }

  // 🔍 Detection Loop
  function detect() {
    if (!faceLandmarker.current || !videoRef.current || !isCameraStarted)
      return;

    const now = performance.now();
    const result = faceLandmarker.current.detectForVideo(videoRef.current, now);

    if (result.faceBlendshapes.length > 0) {
      const blendshapes = result.faceBlendshapes[0].categories;
      const detectedEmotion = getEmotion(blendshapes);
      setEmotion(detectedEmotion);
    } else {
      setEmotion("No face detected");
    }

    setTimeout(detect, 100);
  }

  // ⚙️ Lifecycle
  useEffect(() => {
    initModel();
  }, []);

  useEffect(() => {
    if (isCameraStarted) {
      detect();
    }
  }, [isCameraStarted]);

  return (
    <div className="face-expression-container">
      <h1 className="title">Face Expression Detection</h1>

      {!isCameraStarted && (
        <button className="start-button" onClick={startCamera}>
          Start Camera
        </button>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`video-feed ${isCameraStarted ? "visible" : ""}`}
      />

      <h2 className="emotion-display">Emotion: {emotion}</h2>
    </div>
  );
}
