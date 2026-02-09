import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type SuggestedAccountCardProps = {
  name: string;
  username: string;
  type: 'student' | 'institution';
  followersCount: string;
  isPopular?: boolean;
  onFollow: () => void;
};

export default function SuggestedAccountCard({
  name,
  username,
  type,
  followersCount,
  isPopular = false,
  onFollow,
}: SuggestedAccountCardProps) {
  return (
    <View style={[styles.card, isPopular && styles.popularCard]}>
      {isPopular && (
        <LinearGradient
          colors={['#FFD700', '#FFA500', '#FFD700']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.popularBorder}
        />
      )}

      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={[
            styles.avatar,
            isPopular && styles.popularAvatar
          ]}>
            <Ionicons
              name={type === 'institution' ? 'school' : 'person'}
              size={32}
              color={isPopular ? '#FFD700' : '#0057FF'}
            />
          </View>
          {isPopular && (
            <View style={styles.popularBadge}>
              <Ionicons name="star" size={14} color="#FFD700" />
            </View>
          )}
        </View>

        {/* Info */}
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            {type === 'institution' && (
              <Ionicons name="checkmark-circle" size={16} color="#0057FF" />
            )}
          </View>
          <Text style={styles.username} numberOfLines={1}>
            {username}
          </Text>
          <Text style={styles.followers}>{followersCount} followers</Text>
        </View>

        {/* Follow Button */}
        <TouchableOpacity
          style={[styles.followButton, isPopular && styles.popularFollowButton]}
          onPress={onFollow}
        >
          <Text style={[styles.followButtonText, isPopular && styles.popularFollowButtonText]}>
            Follow
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  popularCard: {
    borderColor: 'transparent',
  },
  popularBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  content: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 4,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  popularAvatar: {
    backgroundColor: '#FFF9E6',
    borderColor: '#FFD700',
  },
  popularBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  info: {
    alignItems: 'center',
    marginBottom: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    maxWidth: 200,
  },
  username: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  followers: {
    fontSize: 12,
    color: '#999',
  },
  followButton: {
    backgroundColor: '#0057FF',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  popularFollowButton: {
    backgroundColor: '#FFD700',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  popularFollowButtonText: {
    color: '#000',
  },
});
