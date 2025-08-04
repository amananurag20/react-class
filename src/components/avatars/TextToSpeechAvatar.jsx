import React, { useState, useRef, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

// Mouth shape components (Visemes)
const MouthShapes = {
  A: () => (
    <svg width="40" height="25" viewBox="0 0 40 25" className="transition-all duration-150">
      <ellipse cx="20" cy="12" rx="15" ry="10" fill="#d63031" stroke="#b71c1c" strokeWidth="1"/>
      <ellipse cx="20" cy="12" rx="10" ry="6" fill="#2d3436"/>
    </svg>
  ),
  E: () => (
    <svg width="40" height="25" viewBox="0 0 40 25" className="transition-all duration-150">
      <rect x="8" y="10" width="24" height="8" rx="4" fill="#d63031" stroke="#b71c1c" strokeWidth="1"/>
      <rect x="12" y="12" width="16" height="4" fill="#2d3436"/>
    </svg>
  ),
  I: () => (
    <svg width="40" height="25" viewBox="0 0 40 25" className="transition-all duration-150">
      <rect x="15" y="8" width="10" height="12" rx="2" fill="#d63031" stroke="#b71c1c" strokeWidth="1"/>
      <rect x="17" y="10" width="6" height="8" fill="#2d3436"/>
    </svg>
  ),
  O: () => (
    <svg width="40" height="25" viewBox="0 0 40 25" className="transition-all duration-150">
      <circle cx="20" cy="12" r="12" fill="#d63031" stroke="#b71c1c" strokeWidth="1"/>
      <circle cx="20" cy="12" r="7" fill="#2d3436"/>
    </svg>
  ),
  U: () => (
    <svg width="40" height="25" viewBox="0 0 40 25" className="transition-all duration-150">
      <ellipse cx="20" cy="12" rx="8" ry="10" fill="#d63031" stroke="#b71c1c" strokeWidth="1"/>
      <ellipse cx="20" cy="12" rx="4" ry="6" fill="#2d3436"/>
    </svg>
  ),
  M: () => (
    <svg width="40" height="25" viewBox="0 0 40 25" className="transition-all duration-150">
      <rect x="10" y="15" width="20" height="4" rx="2" fill="#d63031" stroke="#b71c1c" strokeWidth="1"/>
    </svg>
  ),
  Rest: () => (
    <svg width="40" height="25" viewBox="0 0 40 25" className="transition-all duration-150">
      <ellipse cx="20" cy="15" rx="12" ry="3" fill="#d63031" stroke="#b71c1c" strokeWidth="1"/>
    </svg>
  )
};

// Character head components
const CharacterHeads = {
  doctor: () => (
    <svg viewBox="0 0 200 200" width="180" height="180" className="drop-shadow-lg">
      <circle cx="100" cy="100" r="75" fill="#ffeaa7" stroke="#e17055" strokeWidth="2"/>
      <path d="M 40 70 Q 50 30 100 25 Q 150 30 160 70" fill="#636e72"/>
      <circle cx="80" cy="85" r="8" fill="white"/>
      <circle cx="120" cy="85" r="8" fill="white"/>
      <circle cx="80" cy="85" r="5" fill="#2d3436"/>
      <circle cx="120" cy="85" r="5" fill="#2d3436"/>
      <circle cx="82" cy="83" r="2" fill="white"/>
      <circle cx="122" cy="83" r="2" fill="white"/>
      <path d="M 70 75 Q 80 70 90 75" stroke="#636e72" strokeWidth="2" fill="none"/>
      <path d="M 110 75 Q 120 70 130 75" stroke="#636e72" strokeWidth="2" fill="none"/>
      <ellipse cx="100" cy="105" rx="3" ry="6" fill="#e17055"/>
      <circle cx="60" cy="160" r="8" fill="#74b9ff" stroke="#0984e3" strokeWidth="2"/>
      <path d="M 68 160 Q 85 150 100 160" stroke="#74b9ff" strokeWidth="3" fill="none"/>
      <path d="M 40 170 L 70 150 L 100 170 L 130 150 L 160 170 L 160 200 L 40 200 Z" fill="white" stroke="#ddd" strokeWidth="1"/>
    </svg>
  ),
  
  teacher: () => (
    <svg viewBox="0 0 200 200" width="180" height="180" className="drop-shadow-lg">
      <circle cx="100" cy="100" r="75" fill="#ffeaa7" stroke="#e17055" strokeWidth="2"/>
      <path d="M 35 80 Q 45 35 100 30 Q 155 35 165 80 Q 160 90 150 85 Q 140 40 100 40 Q 60 40 50 85 Q 40 90 35 80" fill="#6c5ce7"/>
      <circle cx="80" cy="85" r="15" fill="rgba(255,255,255,0.8)" stroke="#2d3436" strokeWidth="2"/>
      <circle cx="120" cy="85" r="15" fill="rgba(255,255,255,0.8)" stroke="#2d3436" strokeWidth="2"/>
      <line x1="95" y1="85" x2="105" y2="85" stroke="#2d3436" strokeWidth="2"/>
      <circle cx="80" cy="85" r="5" fill="#2d3436"/>
      <circle cx="120" cy="85" r="5" fill="#2d3436"/>
      <circle cx="82" cy="83" r="2" fill="white"/>
      <circle cx="122" cy="83" r="2" fill="white"/>
      <ellipse cx="100" cy="105" rx="3" ry="6" fill="#e17055"/>
      <rect x="40" y="170" width="120" height="30" fill="#a29bfe" stroke="#6c5ce7" strokeWidth="1"/>
    </svg>
  ),
  
  businessPerson: () => (
    <svg viewBox="0 0 200 200" width="180" height="180" className="drop-shadow-lg">
      <circle cx="100" cy="100" r="75" fill="#ffeaa7" stroke="#e17055" strokeWidth="2"/>
      <path d="M 45 75 Q 50 25 100 20 Q 150 25 155 75 Q 150 45 100 35 Q 50 45 45 75" fill="#2d3436"/>
      <circle cx="80" cy="85" r="8" fill="white"/>
      <circle cx="120" cy="85" r="8" fill="white"/>
      <circle cx="80" cy="85" r="5" fill="#2d3436"/>
      <circle cx="120" cy="85" r="5" fill="#2d3436"/>
      <circle cx="82" cy="83" r="2" fill="white"/>
      <circle cx="122" cy="83" r="2" fill="white"/>
      <path d="M 70 75 Q 80 70 90 75" stroke="#2d3436" strokeWidth="2" fill="none"/>
      <path d="M 110 75 Q 120 70 130 75" stroke="#2d3436" strokeWidth="2" fill="none"/>
      <ellipse cx="100" cy="105" rx="3" ry="6" fill="#e17055"/>
      <rect x="40" y="170" width="120" height="30" fill="#2d3436"/>
      <rect x="85" y="170" width="30" height="30" fill="white"/>
      <rect x="95" y="170" width="10" height="30" fill="#e17055"/>
    </svg>
  )
};

export default function TextToSpeechAvatar() {
  const [text, setText] = useState("Hello! I'm your advanced AI assistant with realistic lip synchronization. Watch my mouth move as I speak!");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMouth, setCurrentMouth] = useState('Rest');
  const [selectedCharacter, setSelectedCharacter] = useState('doctor');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [speechRate, setSpeechRate] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const getVisemeSequence = (text) => {
    const words = text.toLowerCase().split(' ');
    const sequence = ['Rest'];
    
    words.forEach((word, wordIndex) => {
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        
        if ('aeiou'.includes(char)) {
          switch (char) {
            case 'a': sequence.push('A'); break;
            case 'e': sequence.push('E'); break;
            case 'i': sequence.push('I'); break;
            case 'o': sequence.push('O'); break;
            case 'u': sequence.push('U'); break;
          }
        } else if ('bmp'.includes(char)) {
          sequence.push('M');
        } else if ('fv'.includes(char)) {
          sequence.push('E');
        } else if ('lr'.includes(char)) {
          sequence.push('I');
        } else {
          sequence.push(['A', 'E', 'O'][Math.floor(Math.random() * 3)]);
        }
      }
      
      if (wordIndex < words.length - 1) {
        sequence.push('Rest');
      }
    });
    
    sequence.push('Rest');
    return sequence;
  };

  const speak = () => {
    if (!text.trim()) {
      alert('Please enter some text to speak!');
      return;
    }

    speechSynthesis.cancel();
    setIsSpeaking(true);
    setCurrentMouth('Rest');

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voices[selectedVoice]) {
      utterance.voice = voices[selectedVoice];
    }
    utterance.rate = speechRate;
    utterance.pitch = 1;
    utterance.volume = 1;

    const visemeSequence = getVisemeSequence(text);
    let currentIndex = 0;

    utterance.onstart = () => {
      const baseInterval = 150;
      const adjustedInterval = baseInterval / speechRate;
      
      intervalRef.current = setInterval(() => {
        if (currentIndex < visemeSequence.length) {
          setCurrentMouth(visemeSequence[currentIndex]);
          currentIndex++;
        } else {
          currentIndex = 0;
        }
      }, adjustedInterval);
    };

    utterance.onend = () => {
      clearInterval(intervalRef.current);
      setCurrentMouth('Rest');
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      clearInterval(intervalRef.current);
      setCurrentMouth('Rest');
      setIsSpeaking(false);
      alert('Error occurred during speech synthesis');
    };

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    clearInterval(intervalRef.current);
    setCurrentMouth('Rest');
    setIsSpeaking(false);
  };

  const CurrentMouth = MouthShapes[currentMouth] || MouthShapes.Rest;
  const CurrentHead = CharacterHeads[selectedCharacter] || CharacterHeads.doctor;

  const characters = {
    doctor: { name: '👨‍⚕️ Dr. Smith', desc: 'Medical professional with stethoscope' },
    teacher: { name: '👩‍🏫 Prof. Johnson', desc: 'Educator with glasses and friendly demeanor' },
    businessPerson: { name: '👔 Alex Manager', desc: 'Executive in professional attire' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Advanced Lip-Sync Avatar
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Realistic mouth movements with viseme-based speech animation
          </p>
        </div>

        {/* Character Selection */}
        <Card title="Choose Your Professional Character" variant="primary" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(characters).map(([key, character]) => (
              <div
                key={key}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 text-center ${
                  selectedCharacter === key
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg transform -translate-y-1'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5'
                }`}
                onClick={() => setSelectedCharacter(key)}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-full p-2">
                    {React.createElement(CharacterHeads[key])}
                  </div>
                </div>
                <div className="font-bold text-gray-800 mb-2">{character.name}</div>
                <div className="text-gray-600 text-sm">{character.desc}</div>
                {selectedCharacter === key && (
                  <div className="mt-3 text-blue-600 font-semibold">✓ Selected</div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Avatar Display */}
        <Card variant="default" className="mb-8">
          <div className="flex flex-col items-center">
            <div className={`relative transition-all duration-300 ${isSpeaking ? 'animate-pulse' : ''}`}>
              <div className="relative">
                <CurrentHead />
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                  <CurrentMouth />
                </div>
              </div>
              
              {isSpeaking && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-gradient-to-t from-blue-500 to-purple-600 rounded-full animate-pulse`}
                      style={{
                        height: `${15 + i * 5}px`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '0.8s'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-6 px-4 py-2 bg-blue-100 rounded-full border border-blue-200">
              <span className="text-blue-700 font-semibold">Current Mouth Shape: {currentMouth}</span>
            </div>
          </div>
        </Card>

        {/* Text Input */}
        <Card title="Enter Your Script" variant="default" className="mb-8">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text for advanced lip-sync speech..."
            className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none text-gray-700"
            rows={4}
          />
        </Card>

        {/* Controls */}
        <Card title="Voice Controls" variant="purple" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Voice:</label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(parseInt(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              >
                {voices.map((voice, index) => (
                  <option key={index} value={index}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Speed: {speechRate}</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <Card variant="success" className="mb-8">
          <div className="flex justify-center space-x-4">
            <Button
              onClick={speak}
              disabled={isSpeaking || !text.trim()}
              variant="primary"
              size="lg"
              className={isSpeaking ? 'animate-pulse' : ''}
            >
              {isSpeaking ? 'Speaking...' : '🎤 Start Advanced Speech'}
            </Button>
            
            {isSpeaking && (
              <Button onClick={stopSpeaking} variant="danger" size="lg">
                ⏹️ Stop
              </Button>
            )}
          </div>
        </Card>

        {/* Viseme Demo */}
        <Card title="Mouth Shape Demo" variant="default" className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {Object.keys(MouthShapes).map((shape) => (
              <Button
                key={shape}
                onClick={() => !isSpeaking && setCurrentMouth(shape)}
                variant={currentMouth === shape ? 'primary' : 'secondary'}
                size="sm"
                disabled={isSpeaking}
              >
                {shape}
              </Button>
            ))}
          </div>
        </Card>

        {/* Features */}
        <Card variant="primary">
          <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">🎯 Advanced Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
            {[
              '👄 Viseme Technology: 7 different mouth shapes (A, E, I, O, U, M, Rest)',
              '🧠 Smart Lip-Sync: Analyzes text to predict mouth movements',
              '⚡ Real-time Animation: Synchronized with speech timing',
              '👨‍💼 Professional Characters: Doctor, Teacher, Business Professional',
              '🎛️ Speed Adaptation: Mouth timing adjusts with speech rate',
              '🔄 Live Demo: Test individual mouth shapes manually'
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}