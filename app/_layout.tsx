import { Slot } from "expo-router";
import { useState } from "react";
import { SplashScreen as AnimatedSplashScreen } from "./components/SplashScreen";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <AnimatedSplashScreen
        onAnimationComplete={() => setShowSplash(false)}
        duration={1000}
      />
    );
  }

  return <Slot />;
}
