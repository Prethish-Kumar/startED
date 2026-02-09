import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type AchievementCardProps = {
  title: string;
  subtitle: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  date: string;
  onPress: () => void;
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;

export default function AchievementCard({
  title,
  subtitle,
  color,
  icon,
  date,
  onPress,
}: AchievementCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Ionicons name={icon} size={32} color="#fff" />
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.badge}>
        <Ionicons name="trophy" size={60} color="rgba(255,255,255,0.3)" />
      </View>

      <View style={styles.footer}>
        <Text style={styles.tapText}>Tap to view & share</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: 20,
    padding: 20,
    marginRight: 16,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  date: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  badge: {
    position: 'absolute',
    bottom: -10,
    right: -10,
  },
  footer: {
    alignItems: 'center',
  },
  tapText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
    opacity: 0.8,
  },
});
