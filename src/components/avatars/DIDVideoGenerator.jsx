import React, { useState, useRef } from 'react';
import { voiceOptions, sampleTexts } from '../../constants/voiceOptions';
import { uploadImageToD_ID, createTalkingVideo, checkVideoStatus } from '../../utils/didApi';
import { convertImageToProperFormat, createImagePreview } from '../../utils/imageProcessor';
import Button from '../common/Button';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';

export default function DIDVideoGenerator() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState('Hello! This is an AI-generated video created with D-ID technology.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [videoStatus, setVideoStatus] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('en-US-JennyNeural');
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Image file size should be less than 10MB');
        return;
      }
      
      try {
        const convertedFile = await convertImageToProperFormat(file);
        const preview = await createImagePreview(convertedFile);
        
        setSelectedImage(convertedFile);
        setImagePreview(preview);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError('Please select a valid image file (JPG, PNG, etc.)');
    }
  };

  const generateVideo = async () => {
    if (!selectedImage) {
      setError('Please upload an image first');
      return;
    }

    if (!text.trim()) {
      setError('Please enter text for the video');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setProgress(0);
    setVideoStatus('Uploading image...');

    try {
      // Step 1: Upload image to D-ID
      setProgress(20);
      const imageUrl = await uploadImageToD_ID(selectedImage);
      
      // Step 2: Create talking video
      setVideoStatus('Creating video...');
      setProgress(40);
      
      const selectedVoiceData = voiceOptions
        .flatMap(category => category.voices)
        .find(voice => voice.id === selectedVoice);
      
      const videoId = await createTalkingVideo(imageUrl, text, selectedVoiceData);
      
      // Step 3: Poll for video completion
      setVideoStatus('Processing video...');
      setProgress(60);
      
      const pollVideo = async () => {
        const status = await checkVideoStatus(videoId);
        
        if (status.status === 'done') {
          setVideoStatus('Video completed!');
          setProgress(100);
          setGeneratedVideo(status.result_url);
          setIsGenerating(false);
        } else if (status.status === 'error') {
          throw new Error(status.error?.description || 'Video generation failed');
        } else {
          setVideoStatus(`Processing... (${status.status})`);
          setProgress(Math.min(80, progress + 5));
          setTimeout(pollVideo, 3000);
        }
      };
      
      await pollVideo();
      
    } catch (error) {
      setError(error.message);
      setIsGenerating(false);
      setVideoStatus('');
      setProgress(0);
    }
  };

  const resetForm = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setGeneratedVideo(null);
    setError(null);
    setProgress(0);
    setVideoStatus('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getCurrentVoice = () => {
    return voiceOptions
      .flatMap(category => category.voices)
      .find(voice => voice.id === selectedVoice);
  };

  const getProviderIcon = (provider) => {
    switch (provider) {
      case 'microsoft': return '🔵';
      case 'amazon': return '🟠';
      case 'google': return '🔴';
      default: return '🎤';
    }
  };

  const getProviderName = (provider) => {
    switch (provider) {
      case 'microsoft': return 'Microsoft Azure';
      case 'amazon': return 'Amazon Polly';
      case 'google': return 'Google Cloud';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Video Generator with D-ID
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload a photo and text to create professional AI-generated talking videos
          </p>
        </div>

        {/* Step 1: Image Upload */}
        <Card title="Step 1: Upload Your Image" variant="primary" className="mb-8">
          <div className="flex justify-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              {imagePreview ? (
                <div className="relative group">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-80 h-52 object-cover rounded-2xl border-4 border-blue-200 shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">📷 Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="w-80 h-52 border-4 border-dashed border-blue-300 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 flex flex-col items-center justify-center hover:border-blue-400 hover:shadow-lg transform hover:-translate-y-1">
                  <div className="text-6xl text-blue-500 mb-4">📸</div>
                  <div className="text-xl font-semibold text-gray-700 mb-2">Click to upload image</div>
                  <div className="text-sm text-gray-500 text-center">
                    Supports JPG, PNG, WEBP, etc. (max 10MB)<br/>
                    <span className="text-blue-600">Auto-converted to JPEG for D-ID compatibility</span>
                  </div>
                </div>
              )}
            </label>
          </div>
        </Card>

        {/* Step 2: Text Input */}
        <Card title="Step 2: Enter Your Script" variant="default" className="mb-8">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want your avatar to speak..."
            className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none text-gray-700"
            maxLength={500}
          />
          <div className="text-right text-sm text-gray-500 mt-2">
            {text.length}/500 characters
          </div>
          
          {/* Sample Texts */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 mb-3">Quick Samples:</h4>
            <div className="flex flex-wrap gap-2">
              {sampleTexts.map((sample, index) => (
                <Button
                  key={index}
                  onClick={() => setText(sample)}
                  variant="sample"
                  size="sm"
                  disabled={isGenerating}
                >
                  Sample {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Step 3: Voice Selection */}
        <Card title="Step 3: Choose Voice Artist" variant="purple" className="mb-8">
          <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-xl p-4 bg-white">
            {voiceOptions.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8 last:mb-0">
                <h4 className="font-bold text-gray-800 text-lg mb-4 pb-2 border-b-2 border-blue-200">
                  {category.category}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.voices.map((voice) => (
                    <div
                      key={voice.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 relative ${
                        selectedVoice === voice.id
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg transform -translate-y-1'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5'
                      }`}
                      onClick={() => setSelectedVoice(voice.id)}
                    >
                      <div className="text-xs font-semibold text-gray-600 mb-1">
                        {getProviderIcon(voice.provider)} {getProviderName(voice.provider)}
                      </div>
                      <div className="font-semibold text-gray-800 mb-1 text-sm leading-tight">
                        {voice.name}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">
                        {voice.id}
                      </div>
                      {selectedVoice === voice.id && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          ✓ Selected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Current Selection Display */}
          <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-3">🎤 Current Selection:</h4>
            {(() => {
              const currentVoice = getCurrentVoice();
              return currentVoice ? (
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border-2 border-blue-200">
                  <div>
                    <div className="font-bold text-gray-800 text-lg">{currentVoice.name}</div>
                    <div className="text-gray-600 font-medium">
                      {getProviderIcon(currentVoice.provider)} {getProviderName(currentVoice.provider)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">No voice selected</div>
              );
            })()}
          </div>
        </Card>

        {/* Step 4: Generate Video */}
        <Card title="Step 4: Generate Video" variant="success" className="mb-8">
          <div className="flex space-x-4">
            <Button
              onClick={generateVideo}
              disabled={isGenerating || !selectedImage || !text.trim()}
              variant="primary"
              size="lg"
              className={isGenerating ? 'animate-pulse' : ''}
            >
              {isGenerating ? '🎬 Generating...' : '🎬 Generate AI Video'}
            </Button>
            
            <Button
              onClick={resetForm}
              variant="secondary"
              size="lg"
              disabled={isGenerating}
            >
              🔄 Reset
            </Button>
          </div>
        </Card>

        {/* Progress Section */}
        {isGenerating && (
          <Card variant="primary" className="mb-8">
            <ProgressBar progress={progress} status={videoStatus} />
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Card variant="default" className="mb-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="text-red-600 font-semibold text-center text-lg">
                ⚠️ {error}
              </div>
              {(error.includes('CORS') || error.includes('fetch')) && (
                <div className="mt-4 p-4 bg-red-100 rounded-lg">
                  <h4 className="font-semibold text-red-700 mb-2">🔧 CORS Issue Solution:</h4>
                  <p className="text-red-600 mb-2">D-ID API requires server-side implementation for production. For testing:</p>
                  <ol className="list-decimal list-inside text-red-600 text-sm space-y-1">
                    <li>Install a CORS browser extension (CORS Unblock)</li>
                    <li>Or use a backend proxy server</li>
                    <li>Or test with a CORS-enabled browser setup</li>
                  </ol>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Generated Video Display */}
        {generatedVideo && (
          <Card variant="success" className="mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-700 mb-6">
                ✅ Your AI-Generated Video is Ready!
              </h3>
              <div className="flex justify-center mb-6">
                <video
                  src={generatedVideo}
                  controls
                  autoPlay
                  muted
                  className="max-w-full max-h-96 rounded-xl shadow-lg"
                  poster={imagePreview}
                >
                  Your browser does not support video playback.
                </video>
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  as="a"
                  href={generatedVideo}
                  download="ai-generated-video.mp4"
                  variant="success"
                  size="lg"
                >
                  💾 Download Video
                </Button>
                {navigator.share && (
                  <Button
                    onClick={() => navigator.share({
                      title: 'My AI Generated Video',
                      url: generatedVideo
                    })}
                    variant="primary"
                    size="lg"
                  >
                    📱 Share Video
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Features Section */}
        <Card variant="default" className="mb-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            🚀 D-ID AI Video Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎭', title: 'Realistic Lip-Sync', desc: 'Advanced AI matches mouth movements to speech' },
              { icon: '🎤', title: 'Natural Voice', desc: 'Microsoft Azure neural voices for realistic speech' },
              { icon: '⚡', title: 'Fast Processing', desc: 'Videos generated in 1-3 minutes' },
              { icon: '🎨', title: 'Any Photo', desc: 'Works with portraits, artwork, or any face image' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <div className="font-bold text-gray-800 mb-2">{feature.title}</div>
                <div className="text-gray-600 text-sm">{feature.desc}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tips Section */}
        <Card variant="primary">
          <h4 className="text-xl font-bold text-gray-800 mb-4">💡 Tips for Best Results:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            {[
              '📸 Use clear, well-lit photos with the face clearly visible',
              '👤 Front-facing portraits work better than side profiles',
              '📝 Keep text under 500 characters for optimal processing',
              '🎯 Avoid very long sentences - break them into shorter phrases',
              '🔄 Auto-conversion: All images are converted to JPEG format for compatibility',
              '⚠️ Security Note: In production, move API calls to backend server',
              '🔑 API Key: Stored in environment variable (.env file)',
              '💰 Cost: D-ID charges per video generation (~$0.05-0.20 per video)'
            ].map((tip, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}