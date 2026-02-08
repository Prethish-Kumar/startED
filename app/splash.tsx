import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SplashScreen } from './components/SplashScreen';
import { useRouter } from 'expo-router';

export default function SplashExampleScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  const handleAnimationComplete = () => {
    // Splash animation is complete
    setShowSplash(false);

    // Navigate to main app or home screen
    // router.replace('/(tabs)');
  };

  const handleReplay = () => {
    setShowSplash(true);
  };

  if (showSplash) {
    return <SplashScreen onAnimationComplete={handleAnimationComplete} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Splash Screen Demo</Text>
      <Text style={styles.subtitle}>
        The animated splash screen has completed!
      </Text>
      <Pressable style={styles.button} onPress={handleReplay}>
        <Text style={styles.buttonText}>Replay Animation</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E5A8D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E5A8D',
  },
});
