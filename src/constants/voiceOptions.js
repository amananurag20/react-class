// Voice options for D-ID API
export const voiceOptions = [
  // Microsoft Azure Voices
  {
    category: 'Microsoft Azure - Female',
    voices: [
      { id: 'en-US-JennyNeural', name: 'Jenny (US English) - Friendly & Clear', provider: 'microsoft' },
      { id: 'en-US-AriaNeural', name: 'Aria (US English) - Professional', provider: 'microsoft' },
      { id: 'en-US-SaraNeural', name: 'Sara (US English) - Warm & Natural', provider: 'microsoft' },
      { id: 'en-GB-SoniaNeural', name: 'Sonia (British English) - Elegant', provider: 'microsoft' },
      { id: 'en-AU-NatashaNeural', name: 'Natasha (Australian) - Energetic', provider: 'microsoft' },
    ]
  },
  {
    category: 'Microsoft Azure - Male',
    voices: [
      { id: 'en-US-GuyNeural', name: 'Guy (US English) - Confident', provider: 'microsoft' },
      { id: 'en-US-DavisNeural', name: 'Davis (US English) - Professional', provider: 'microsoft' },
      { id: 'en-GB-RyanNeural', name: 'Ryan (British English) - Distinguished', provider: 'microsoft' },
      { id: 'en-AU-WilliamNeural', name: 'William (Australian) - Friendly', provider: 'microsoft' },
    ]
  },
  {
    category: 'Amazon Polly - Female',
    voices: [
      { id: 'Joanna', name: 'Joanna (US English) - News Anchor Style', provider: 'amazon' },
      { id: 'Salli', name: 'Salli (US English) - Clear & Articulate', provider: 'amazon' },
      { id: 'Kimberly', name: 'Kimberly (US English) - Professional', provider: 'amazon' },
      { id: 'Amy', name: 'Amy (British English) - Sophisticated', provider: 'amazon' },
      { id: 'Emma', name: 'Emma (British English) - Modern', provider: 'amazon' },
    ]
  },
  {
    category: 'Amazon Polly - Male',
    voices: [
      { id: 'Matthew', name: 'Matthew (US English) - Authoritative', provider: 'amazon' },
      { id: 'Joey', name: 'Joey (US English) - Youthful', provider: 'amazon' },
      { id: 'Brian', name: 'Brian (British English) - Classic', provider: 'amazon' },
      { id: 'Arthur', name: 'Arthur (British English) - Refined', provider: 'amazon' },
    ]
  },
  {
    category: 'Google Cloud - Premium',
    voices: [
      { id: 'en-US-Neural2-F', name: 'Neural2-F (US English) - Natural Female', provider: 'google' },
      { id: 'en-US-Neural2-A', name: 'Neural2-A (US English) - Expressive Female', provider: 'google' },
      { id: 'en-US-Neural2-D', name: 'Neural2-D (US English) - Professional Male', provider: 'google' },
      { id: 'en-US-Neural2-C', name: 'Neural2-C (US English) - Confident Male', provider: 'google' },
    ]
  }
];

export const sampleTexts = [
  "Hello! Welcome to our company. I'm excited to tell you about our amazing products and services.",
  "Thank you for watching this video. Don't forget to subscribe and hit the notification bell!",
  "Hi there! I'm here to help you with your questions. Feel free to reach out anytime.",
  "Welcome to today's presentation. Let's dive into the exciting world of artificial intelligence.",
  "Greetings! I hope you're having a wonderful day. Let me share some important information with you."
];