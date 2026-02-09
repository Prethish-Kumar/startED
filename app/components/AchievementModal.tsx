import { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Share,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';

type AchievementModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  date: string;
  description: string;
};

const { width, height } = Dimensions.get('window');

export default function AchievementModal({
  visible,
  onClose,
  title,
  subtitle,
  color,
  icon,
  date,
  description,
}: AchievementModalProps) {
  const confettiRef = useRef<any>(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Trigger confetti
      setTimeout(() => {
        confettiRef.current?.start();
      }, 300);

      // Start shake animation after confetti
      setTimeout(() => {
        startShakeAnimation();
      }, 1500);
    }
  }, [visible]);

  const startShakeAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
      ])
    ).start();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `🎉 I earned the "${title}" achievement on StartED!\n\n${description}\n\nJoin me on StartED and showcase your achievements too!`,
        title: title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.container}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={32} color="#fff" />
          </TouchableOpacity>

          {/* Achievement Card */}
          <View style={[styles.card, { backgroundColor: color }]}>
            <View style={styles.iconContainer}>
              <Ionicons name={icon} size={64} color="#fff" />
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.date}>{date}</Text>

            <View style={styles.divider} />

            <Text style={styles.description}>{description}</Text>

            <View style={styles.badge}>
              <Ionicons name="trophy" size={100} color="rgba(255,255,255,0.2)" />
            </View>
          </View>

          {/* Share Button */}
          <Animated.View
            style={[
              styles.shareButtonContainer,
              { transform: [{ translateX: shakeAnim }] },
            ]}
          >
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="share-social" size={24} color="#fff" />
              <Text style={styles.shareButtonText}>
                Share Your Achievement! 🎉
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Confetti */}
          <ConfettiCannon
            ref={confettiRef}
            count={200}
            origin={{ x: width / 2, y: height / 2 }}
            autoStart={false}
            fadeOut={true}
            fallSpeed={2500}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    width: width * 0.85,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  card: {
    width: '100%',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    opacity: 0.9,
  },
  date: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 20,
  },
  description: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.95,
  },
  badge: {
    position: 'absolute',
    bottom: -20,
    right: -20,
  },
  shareButtonContainer: {
    marginTop: 24,
    width: '100%',
  },
  shareButton: {
    backgroundColor: '#0057FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 12,
    shadowColor: '#0057FF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
  },
  shareButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
