import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type PostCardProps = {
  id: string;
  authorName: string;
  authorSchool: string;
  authorAvatar?: string;
  content: string;
  imageUrl?: string;
  initialLikes: number;
  commentsCount: number;
  clipPosition?: 'left' | 'right';
  onCommentPress: () => void;
};

export default function PostCard({
  authorName,
  authorSchool,
  authorAvatar,
  content,
  imageUrl,
  initialLikes,
  commentsCount,
  clipPosition = 'right',
  onCommentPress,
}: PostCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Author Info */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          {authorAvatar ? (
            <Image source={{ uri: authorAvatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder} />
          )}
        </View>
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{authorName}</Text>
          <Text style={styles.authorSchool}>{authorSchool}</Text>
        </View>
      </View>

      {/* Post Content */}
      <Text style={styles.content}>{content}</Text>

      {/* Post Image with Frame and Clip */}
      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/Paper_clip.png')}
            style={[
              styles.paperClip,
              clipPosition === 'left' ? styles.paperClipLeft : styles.paperClipRight,
            ]}
          />
          <View style={styles.frameContainer}>
            <Image
              source={require('../../assets/images/post_frame.png')}
              style={styles.frame}
              resizeMode="stretch"
            />
            <Image source={{ uri: imageUrl }} style={styles.postImage} />
          </View>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={isLiked ? '#FF3B30' : '#000'}
          />
          <Text style={[styles.actionText, isLiked && styles.likedText]}>
            {likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onCommentPress}>
          <Ionicons name="chatbubble-outline" size={22} color="#000" />
          <Text style={styles.actionText}>{commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
    backgroundColor: '#E0E0E0',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  authorSchool: {
    fontSize: 13,
    color: '#666',
  },
  content: {
    fontSize: 15,
    color: '#000',
    lineHeight: 20,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  frameContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  frame: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  paperClip: {
    position: 'absolute',
    width: 60,
    height: 60,
    zIndex: 3,
    top: -10,
  },
  paperClipLeft: {
    left: -10,
    transform: [{ rotate: '-15deg' }],
  },
  paperClipRight: {
    right: -10,
    transform: [{ rotate: '15deg' }],
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  likedText: {
    color: '#FF3B30',
  },
});
