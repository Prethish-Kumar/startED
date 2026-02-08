import { Stack } from "expo-router";
import { SplashScreen as AnimatedSplashScreen } from "./components/SplashScreen";
import { useState } from "react";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <AnimatedSplashScreen
        onAnimationComplete={() => setShowSplash(false)}
        duration={2000}
      />
    );
  }

  return <Stack />;
}
