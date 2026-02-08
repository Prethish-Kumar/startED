import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface SplashScreenProps {
  onAnimationComplete?: () => void;
  duration?: number;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onAnimationComplete,
  duration = 2000,
}) => {
  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.5);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);

  // Trigger animations on mount
  useLayoutEffect(() => {
    // Logo animation sequence: fade in and scale up
    logoOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });

    logoScale.value = withSequence(
      withTiming(1.05, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      }),
      withTiming(1, {
        duration: 200,
        easing: Easing.inOut(Easing.quad),
      }),
    );

    // Text animation: fade in with slight delay and slide up
    textOpacity.value = withDelay(
      400,
      withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.cubic),
      }),
    );

    textTranslateY.value = withDelay(
      400,
      withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.cubic),
      }),
    );

    // Call completion callback after total duration
    if (onAnimationComplete) {
      const timeoutId = setTimeout(() => {
        runOnJS(onAnimationComplete)();
      }, duration);

      return () => clearTimeout(timeoutId);
    }
  }, [duration]);

  // Animated styles for logo
  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [
        {
          scale: logoScale.value,
        },
      ],
    };
  });

  // Animated styles for text
  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [
        {
          translateY: textTranslateY.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <AnimatedImage
          source={require("../../assets/images/started_logo.png")}
          style={[styles.logo, logoAnimatedStyle]}
          resizeMode="contain"
        />
      </View>

      {/* Text Container */}
      <View style={styles.textContainer}>
        <AnimatedText style={[styles.text, textAnimatedStyle]}>
          Started
        </AnimatedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0057FF",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 80,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 60,
  },
  logo: {
    width: 200,
    height: 200,
  },
  textContainer: {
    marginBottom: 60,
    alignItems: "center",
  },
  text: {
    fontSize: 42,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
    fontFamily: "System", // Modern sans-serif font
  },
});

export default SplashScreen;
