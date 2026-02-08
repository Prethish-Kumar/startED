# Splash Screen Component

A professional, animated splash screen component for the startED-app Expo React Native project.

## Features

- **Smooth 60fps animations** using react-native-reanimated
- **Fade-in and scale animations** for the logo
- **Staggered text animation** with slide-up effect
- **UI thread execution** for optimal performance
- **Fully typed** with TypeScript
- **Customizable duration** and callback support

## Animation Details

The splash screen features a sophisticated 2-second animation sequence:

1. **Logo Animation (0-800ms)**:
   - Fades in from 0 to 1 opacity
   - Scales up from 0.5 to 1.05 (overshoot)
   - Settles at scale 1.0 (subtle settle effect)
   - Uses cubic easing for smooth motion

2. **Text Animation (400-1000ms)**:
   - Starts after 400ms delay (staggered effect)
   - Fades in from 0 to 1 opacity
   - Slides up from 20px to 0 (subtle rise)
   - Uses cubic easing for natural movement

## Design Specifications

- **Background**: Royal/Cobalt blue (#1E5A8D)
- **Logo**: White abstract shapes from Boot_Screen.png
- **Text**: "Started" in white, modern sans-serif font
- **Layout**: Centered logo, bottom-centered text
- **Duration**: 2 seconds total

## Usage

### Basic Implementation

```tsx
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  const handleAnimationComplete = () => {
    // Navigate to main app
    router.replace('/(tabs)');
  };

  return <SplashScreen onAnimationComplete={handleAnimationComplete} />;
}
```

### With Custom Duration

```tsx
<SplashScreen
  onAnimationComplete={handleAnimationComplete}
  duration={3000} // 3 seconds instead of default 2
/>
```

### Integration with Root Layout

To use the splash screen on app startup, update your `app/_layout.tsx`:

```tsx
import { SplashScreen } from './components/SplashScreen';
import { useState } from 'react';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <SplashScreen
        onAnimationComplete={() => setShowSplash(false)}
      />
    );
  }

  return <Stack />;
}
```

## Component API

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onAnimationComplete` | `() => void` | No | `undefined` | Callback fired when animation completes |
| `duration` | `number` | No | `2000` | Total animation duration in milliseconds |

## Technical Implementation

### Performance Optimizations

1. **UI Thread Execution**: All animations run on the UI thread using Reanimated's worklets
2. **Native Driver**: Uses `useAnimatedStyle` for native performance
3. **Optimized Images**: Logo uses `require()` for bundling optimization
4. **Efficient Re-renders**: Minimal component updates during animation

### Animation Techniques

- **`useSharedValue`**: Stores animated values that can be read/written on UI thread
- **`useAnimatedStyle`**: Creates animated styles that update on UI thread
- **`withTiming`**: Smooth value transitions with custom easing
- **`withSequence`**: Chains multiple animations (scale overshoot effect)
- **`withDelay`**: Staggers animations for professional feel
- **`runOnJS`**: Safely calls JS callbacks from UI thread

### Easing Functions

- **Easing.out(Easing.cubic)**: Natural deceleration
- **Easing.inOut(Easing.quad)**: Smooth acceleration/deceleration for settle effect

## File Structure

```
app/
├── components/
│   └── SplashScreen.tsx    # Main splash screen component
├── splash.tsx              # Example/demo screen
└── _layout.tsx             # Root layout for integration
assets/
└── images/
    └── Boot_Screen.png     # Logo image
```

## Customization

### Adjusting Logo Size

Modify the `logo` style in `SplashScreen.tsx`:

```tsx
logo: {
  width: 250,  // Increase from 200
  height: 250, // Increase from 200
}
```

### Changing Text Styling

Modify the `text` style:

```tsx
text: {
  fontSize: 48,        // Larger text
  fontWeight: '800',   // Bolder
  letterSpacing: 2,    // More spacing
  fontFamily: 'System',
}
```

### Adjusting Animation Timing

Modify the duration values in the animation sequences:

```tsx
// Slower logo fade
logoOpacity.value = withTiming(1, {
  duration: 1200,  // Increase from 800
  easing: Easing.out(Easing.cubic),
});

// More delayed text appearance
textOpacity.value = withDelay(
  800,  // Increase from 400
  withTiming(1, {
    duration: 600,
    easing: Easing.out(Easing.cubic),
  })
);
```

## Troubleshooting

### Animation Not Playing

1. Ensure react-native-reanimated is properly installed
2. Clear cache: `expo start --clear`
3. Check that the splash screen is being rendered
4. Verify console for any errors

### Logo Not Appearing

1. Confirm `Boot_Screen.png` exists in `assets/images/`
2. Check the image path in the require statement
3. Verify the image file is not corrupted

### Poor Performance

1. Ensure animations are running on UI thread (check for worklet errors)
2. Verify device supports 60fps animations
3. Check for competing heavy operations during splash

## Testing

Run the demo screen to test the splash screen:

```bash
# Start the development server
expo start

# Navigate to the splash screen
# Press 's' to open in simulator
# Navigate to /splash route
```

## Future Enhancements

Potential improvements for the splash screen:

- Add particle effects or subtle background animations
- Include app version or loading indicator
- Support for dark/light mode variants
- Add sound effects on animation completion
- Implement skeleton loading state if assets take time to load
- Add progress bar for asset preloading

## Dependencies

- `react-native-reanimated` ~4.1.1
- `expo-status-bar` ~3.0.9
- `react-native` 0.81.5

## License

This component is part of the startED-app project.
