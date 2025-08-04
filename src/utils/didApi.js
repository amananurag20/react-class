// D-ID API utility functions
const DID_API_KEY = import.meta.env.VITE_DID_API_KEY || 'dHJhY2V2ZW51ZUBnbWFpbC5jb20:v1Z1E2_aF1_U0nOH6_-Yu';
const DID_API_URL = 'https://api.d-id.com/talks';

export const uploadImageToD_ID = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch('https://api.d-id.com/images', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${DID_API_KEY}`,
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to upload image: ${response.statusText}. ${errorData.description || ''}`);
    }

    const data = await response.json();
    
    // Ensure the URL ends with a proper image extension
    let imageUrl = data.url;
    if (!imageUrl.match(/\.(jpg|jpeg|png)$/i)) {
      // If the URL doesn't end with a proper extension, modify it
      imageUrl = imageUrl.replace(/\.[^.]+$/, '.jpg');
    }
    
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const createTalkingVideo = async (imageUrl, textInput, selectedVoiceData) => {
  const payload = {
    script: {
      type: 'text',
      input: textInput,
      provider: {
        type: selectedVoiceData?.provider || 'microsoft',
        voice_id: selectedVoiceData?.id || 'en-US-JennyNeural',
      },
    },
    source_url: imageUrl,
    config: {
      fluent: false,
      pad_audio: 0,
      stitch: true,
    },
  };

  try {
    const response = await fetch(DID_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${DID_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('D-ID API Error:', errorData);
      throw new Error(`Failed to create video: ${errorData.description || response.statusText}`);
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
};

export const checkVideoStatus = async (videoId) => {
  try {
    const response = await fetch(`${DID_API_URL}/${videoId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${DID_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to check video status: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking video status:', error);
    throw error;
  }
};