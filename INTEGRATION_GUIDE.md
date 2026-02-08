# Splash Screen Integration Guide

## Quick Start

The animated splash screen component has been successfully created for your startED-app!

## Files Created

1. **`app/components/SplashScreen.tsx`** - The main splash screen component
2. **`app/splash.tsx`** - Demo/example screen
3. **`SPLASH_SCREEN_README.md`** - Comprehensive documentation

## Integration Options

### Option 1: Replace the Root Layout Splash (Recommended)

Update your `app/_layout.tsx` to use the new animated splash screen:

```tsx
import { Stack } from "expo-router";
import { SplashScreen } from "./components/SplashScreen";
import { useState } from "react";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <SplashScreen
        onAnimationComplete={() => setShowSplash(false)}
        duration={2000}
      />
    );
  }

  return <Stack />;
}
```

### Option 2: Use as Initial Route

Keep the splash screen separate and navigate to it first:

1. The splash screen is already available at `/splash` route
2. You can navigate to it from anywhere in your app:

```tsx
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/splash');
```

### Option 3: Use as a Component

Import and use the splash screen anywhere in your app:

```tsx
import { SplashScreen } from './components/SplashScreen';

<SplashScreen
  onAnimationComplete={() => {
    // Handle completion
    console.log('Splash animation complete!');
  }}
  duration={2500}
/>
```

## Testing the Splash Screen

1. **Start your development server**:
   ```bash
   cd H:\Started\startED-app
   expo start
   ```

2. **Test the demo screen**:
   - Press `w` to open in web browser
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Navigate to `http://localhost:8081/splash` (for web)

3. **Integration test**:
   - Follow Option 1 above to integrate into root layout
   - Restart the app to see the splash screen on launch

## Customization Examples

### Adjust Animation Duration

```tsx
<SplashScreen
  onAnimationComplete={handleComplete}
  duration={3000}  // 3 seconds
/>
```

### Handle Navigation After Splash

```tsx
const handleAnimationComplete = () => {
  // Navigate to your main app
  router.replace('/(tabs)');
  // or
  router.replace('/home');
};
```

## Next Steps

1. Choose an integration option above
2. Test the splash screen in your app
3. Customize colors, sizes, or timing as needed
4. Remove any demo files once integrated

## Troubleshooting

**Splash screen not appearing?**
- Ensure the component is being rendered
- Check that `Boot_Screen.png` exists in `assets/images/`
- Clear cache: `expo start --clear`

**Animations not smooth?**
- Ensure react-native-reanimated is properly configured
- Check console for any worklet errors
- Test on a physical device for best performance

## Support

Refer to `SPLASH_SCREEN_README.md` for detailed documentation on:
- Component API
- Animation techniques
- Performance optimizations
- Customization options

---

The splash screen is ready to use! Select an integration option above to get started.
