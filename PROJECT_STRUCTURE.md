# Project Structure

This React avatar application is now organized with a clean, maintainable folder structure using Tailwind CSS.

## 📁 Folder Structure

```
src/
├── components/
│   ├── avatars/           # All avatar-related components
│   │   ├── TalkingAvatar.jsx        # MediaPipe face tracking
│   │   ├── TextToSpeechAvatar.jsx   # Basic text-to-speech with images
│   │   ├── AdvancedAvatar.jsx       # Viseme-based lip sync
│   │   └── DIDVideoGenerator.jsx    # D-ID AI video generation
│   └── common/            # Reusable UI components
│       ├── Button.jsx     # Styled button component
│       ├── Card.jsx       # Container card component
│       ├── ProgressBar.jsx # Progress indicator
│       └── Navigation.jsx # Top navigation bar
├── constants/             # Application constants
│   └── voiceOptions.js    # Voice options for D-ID API
├── utils/                # Utility functions
│   ├── didApi.js         # D-ID API functions
│   └── imageProcessor.js # Image processing utilities
├── styles/               # Global styles (currently minimal)
├── App.jsx              # Main application component
├── App.css              # Minimal custom CSS
├── index.css            # Tailwind imports + custom utilities
└── main.jsx             # Application entry point
```

## 🎨 Styling Approach

### Tailwind CSS
- **Primary Styling**: All components use Tailwind utility classes
- **Responsive Design**: Built-in responsive utilities
- **Consistent Theming**: Unified color palette and spacing
- **Performance**: Purged unused CSS in production

### Custom CSS
- **Minimal Usage**: Only for complex animations or browser-specific styles
- **Location**: `src/App.css` and `src/index.css`
- **Purpose**: Canvas-specific styles, custom scrollbars, range sliders

## 🧩 Component Architecture

### Avatar Components (`src/components/avatars/`)
Each avatar type is self-contained with its own logic and styling:

1. **TalkingAvatar.jsx** - Real-time face tracking using MediaPipe
2. **TextToSpeechAvatar.jsx** - Image-based avatars with basic speech
3. **AdvancedAvatar.jsx** - Professional characters with viseme lip-sync
4. **DIDVideoGenerator.jsx** - AI video generation with D-ID API

### Common Components (`src/components/common/`)
Reusable UI components with consistent styling:

- **Button.jsx** - Multiple variants (primary, secondary, danger, success, sample)
- **Card.jsx** - Container with variants (default, primary, success, purple)
- **ProgressBar.jsx** - Animated progress indicator
- **Navigation.jsx** - Fixed top navigation with active states

### Utilities (`src/utils/`)
Business logic separated from UI components:

- **didApi.js** - D-ID API integration (upload, create, status check)
- **imageProcessor.js** - Image conversion and processing

### Constants (`src/constants/`)
Configuration and data separated from components:

- **voiceOptions.js** - Voice provider configurations for D-ID

## 🚀 Key Improvements

### Organization
- ✅ Logical folder structure by feature/purpose
- ✅ Separation of concerns (UI, logic, data)
- ✅ Reusable components with consistent API

### Styling
- ✅ Tailwind CSS for 95% of styling needs
- ✅ Responsive design built-in
- ✅ Consistent color scheme and spacing
- ✅ Reduced CSS bundle size

### Maintainability
- ✅ Clear component boundaries
- ✅ Extracted business logic to utilities
- ✅ Configuration separated from implementation
- ✅ Easy to extend and modify

### Performance
- ✅ Code splitting ready
- ✅ Minimal CSS footprint
- ✅ Optimized component structure

## 🔧 Development

### Adding New Avatar Types
1. Create new component in `src/components/avatars/`
2. Import in `src/App.jsx`
3. Add route and navigation item

### Adding New UI Components
1. Create in `src/components/common/`
2. Follow Tailwind utility-first approach
3. Export for reuse across app

### Styling Guidelines
1. **Primary**: Use Tailwind utilities
2. **Custom**: Only when Tailwind can't achieve the design
3. **Consistency**: Follow existing color/spacing patterns
4. **Responsive**: Mobile-first approach

## 📱 Navigation Structure

The app uses a clean, fixed navigation bar with:
- 🎥 Face Tracking (MediaPipe)
- 🎤 Text-to-Speech (Image avatars)
- 🎭 Advanced Lip-Sync (Visemes)
- 🎬 AI Video Generator (D-ID)

Each section is self-contained and provides a complete avatar experience.