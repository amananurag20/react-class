# D-ID API Setup Instructions

## 🔑 API Key Configuration

Your D-ID API key has been configured in the project. Here's how it works:

### Current Setup
- **API Key**: `dHJhY2V2ZW51ZUBnbWFpbC5jb20:v1Z1E2_aF1_U0nOH6_-Yu`
- **Location**: Stored in environment variable (`.env` file)
- **Usage**: Automatically loaded by the DIDVideoGenerator component

### Environment Variable Setup

1. Create a `.env` file in your project root (if not already present)
2. Add your D-ID API key:
```
VITE_DID_API_KEY=dHJhY2V2ZW51ZUBnbWFpbC5jb20:v1Z1E2_aF1_U0nOH6_-Yu
```

### 🛡️ Security Considerations

**Important:** For production applications:
- Move API calls to a backend server
- Never expose API keys in frontend code
- Use server-side proxy for D-ID API calls
- Implement proper authentication and rate limiting

### 💰 Pricing Information

D-ID charges approximately:
- **$0.05 - $0.20 per video** (depending on video length and quality)
- **Free tier**: Usually includes some free credits for testing
- **Pay-per-use**: Additional usage charged based on consumption

### 🚀 Features Included

Your D-ID integration includes:
- ✅ Image upload for avatar creation
- ✅ Text-to-speech video generation
- ✅ Real-time progress tracking
- ✅ Video download functionality
- ✅ Error handling and validation
- ✅ Professional UI with sample texts

### 🔧 API Endpoints Used

1. **Image Upload**: `POST https://api.d-id.com/images`
2. **Video Creation**: `POST https://api.d-id.com/talks`
3. **Status Check**: `GET https://api.d-id.com/talks/{id}`

### 📋 Usage Flow

1. User uploads an image (JPG/PNG, max 10MB)
2. Image is uploaded to D-ID servers
3. Text script is processed with Microsoft Azure voices
4. AI video is generated with lip-sync
5. User can download/share the final video

### 🐛 Troubleshooting

**Common Issues:**
- **CORS Errors**: D-ID API might block direct browser requests (need backend proxy)
- **API Limits**: Check your D-ID account usage limits
- **Image Quality**: Use clear, front-facing portraits for best results
- **Text Length**: Keep scripts under 500 characters for optimal processing

**Solutions:**
- Implement backend proxy for production
- Monitor API usage in D-ID dashboard
- Use high-quality, well-lit images
- Break long texts into shorter segments

---

**Note**: The current implementation works for development/testing. For production, consider implementing a backend service to handle D-ID API calls securely.