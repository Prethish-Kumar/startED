import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type NotificationType = 'like' | 'comment' | 'follow' | 'event' | 'achievement' | 'mention';

type NotificationCardProps = {
  id: string;
  type: NotificationType;
  userName: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  onPress: () => void;
};

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'like':
      return { name: 'heart' as const, color: '#FF3B30', bg: '#FFE4E1' };
    case 'comment':
      return { name: 'chatbubble' as const, color: '#0057FF', bg: '#E6F0FF' };
    case 'follow':
      return { name: 'person-add' as const, color: '#34C759', bg: '#E1F5E8' };
    case 'event':
      return { name: 'calendar' as const, color: '#FF9500', bg: '#FFF3E0' };
    case 'achievement':
      return { name: 'trophy' as const, color: '#FFD700', bg: '#FFFACD' };
    case 'mention':
      return { name: 'at' as const, color: '#5856D6', bg: '#EEEEFF' };
  }
};

// Helper function to get initials
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default function NotificationCard({
  type,
  userName,
  message,
  timestamp,
  isRead,
  onPress,
}: NotificationCardProps) {
  const iconConfig = getNotificationIcon(type);

  return (
    <TouchableOpacity
      style={[styles.card, !isRead && styles.unreadCard]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Avatar with Icon */}
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: iconConfig.bg }]}>
          <Text style={styles.avatarText}>{getInitials(userName)}</Text>
        </View>
        <View style={[styles.iconBadge, { backgroundColor: iconConfig.color }]}>
          <Ionicons name={iconConfig.name} size={14} color="#fff" />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.message}>
          <Text style={styles.userName}>{userName}</Text> {message}
        </Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>

      {/* Unread Indicator */}
      {!isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  unreadCard: {
    backgroundColor: '#F8F9FF',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0057FF',
  },
  iconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  content: {
    flex: 1,
    paddingTop: 2,
  },
  message: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 4,
  },
  userName: {
    fontWeight: 'bold',
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0057FF',
    marginLeft: 8,
    marginTop: 6,
  },
});
