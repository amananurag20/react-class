import React, { useRef, useEffect, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import Card from '../common/Card';

export default function TalkingAvatar() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let camera = null;

    const initializeFaceTracking = async () => {
      try {
        const faceMesh = new FaceMesh({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        faceMesh.onResults((results) => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const canvasCtx = canvas.getContext("2d");
          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
          
          canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

          if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            const landmarks = results.multiFaceLandmarks[0];

            canvasCtx.fillStyle = "#00FF00";
            landmarks.forEach((landmark) => {
              canvasCtx.beginPath();
              canvasCtx.arc(
                landmark.x * canvas.width,
                landmark.y * canvas.height,
                2,
                0,
                2 * Math.PI
              );
              canvasCtx.fill();
            });

            canvasCtx.strokeStyle = "#FF0000";
            canvasCtx.lineWidth = 2;
            canvasCtx.beginPath();
            
            const faceOutline = [
              10, 151, 9, 8, 168, 6, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109, 10
            ];
            
            faceOutline.forEach((index, i) => {
              if (landmarks[index]) {
                const x = landmarks[index].x * canvas.width;
                const y = landmarks[index].y * canvas.height;
                if (i === 0) canvasCtx.moveTo(x, y);
                else canvasCtx.lineTo(x, y);
              }
            });
            canvasCtx.stroke();
          }

          canvasCtx.restore();
        });

        camera = new Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current) {
              await faceMesh.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });

        await camera.start();
        setIsLoading(false);
      } catch (err) {
        console.error("Error initializing face tracking:", err);
        setError("Failed to initialize camera or face tracking. Please ensure you have granted camera permissions.");
        setIsLoading(false);
      }
    };

    initializeFaceTracking();

    return () => {
      if (camera) {
        camera.stop();
      }
    };
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 flex items-center justify-center px-4">
        <Card variant="default" className="max-w-md mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Face Tracking Avatar Demo
            </h1>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="text-red-600 font-semibold mb-4">⚠️ {error}</div>
              <button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Try Again
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Real-Time Face Tracking Avatar
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This demo tracks your face in real-time using MediaPipe FaceMesh
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <Card variant="primary" className="mb-8">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-blue-600 mb-2">Loading camera and face tracking...</p>
              <p className="text-gray-600">Please allow camera access when prompted.</p>
            </div>
          </Card>
        )}

        {/* Camera Display */}
        <Card variant="default" className="mb-8">
          <div className="flex justify-center">
            <div className="relative">
              <video 
                ref={videoRef} 
                className="hidden" 
                width={640} 
                height={480} 
                playsInline 
                autoPlay 
                muted
              />
              <canvas 
                ref={canvasRef} 
                width={640} 
                height={480} 
                className={`border-4 border-blue-200 rounded-2xl shadow-lg bg-gray-100 transition-all duration-300 ${
                  isLoading ? 'hidden' : 'block hover:shadow-xl hover:scale-[1.02]'
                }`}
              />
            </div>
          </div>
        </Card>

        {/* Legend */}
        <Card variant="primary">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Face Tracking Legend</h3>
            <div className="flex justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Green dots: Face landmarks</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-1 bg-red-500"></div>
                <span className="text-gray-700 font-medium">Red line: Face outline</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}