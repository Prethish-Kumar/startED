import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
  PanResponder,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');
const MODAL_HEIGHT = height * 0.6;

type Comment = {
  id: string;
  author: string;
  content: string;
  timestamp: string;
};

type CommentModalProps = {
  visible: boolean;
  onClose: () => void;
  postAuthor: string;
  initialComments?: Comment[];
};

// Helper function to get initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Helper function to get color for avatar
const getAvatarColor = (name: string) => {
  const colors = ['#FF1F7D', '#C4F54D', '#87CEEB', '#FFD700', '#FFB6C1', '#98FB98', '#DDA0DD'];
  const index = name.length % colors.length;
  return colors[index];
};

export default function CommentModal({
  visible,
  onClose,
  postAuthor,
  initialComments = [],
}: CommentModalProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        Animated.spring(translateY, {
          toValue: -e.endCoordinates.height,
          damping: 25,
          stiffness: 300,
          useNativeDriver: true,
        }).start();
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        Animated.spring(translateY, {
          toValue: 0,
          damping: 25,
          stiffness: 300,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: keyboardHeight > 0 ? -keyboardHeight : 0,
          damping: 25,
          stiffness: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Dismiss keyboard when closing
      Keyboard.dismiss();
      // Animate out
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: MODAL_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        const targetY = keyboardHeight > 0 ? -keyboardHeight : 0;
        if (gestureState.dy > 0) {
          translateY.setValue(targetY + gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const targetY = keyboardHeight > 0 ? -keyboardHeight : 0;
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          // Close modal
          handleClose();
        } else {
          // Snap back
          Animated.spring(translateY, {
            toValue: targetY,
            damping: 25,
            stiffness: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleClose = () => {
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: MODAL_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'You',
        content: newComment.trim(),
        timestamp: 'Just now',
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.modalWrapper}>
        {/* Animated Overlay */}
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayOpacity,
            },
          ]}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={handleClose}
          />
        </Animated.View>

        {/* Animated Modal Container */}
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.container}>
            {/* Handle Bar */}
            <View style={styles.handleBarContainer} {...panResponder.panHandlers}>
              <View style={styles.handleBar} />
            </View>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Comments</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Comments List */}
            <ScrollView
              style={styles.commentsList}
              showsVerticalScrollIndicator={false}
              bounces={true}
            >
              {comments.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="chatbubble-outline" size={48} color="#E0E0E0" />
                  <Text style={styles.emptyText}>No comments yet</Text>
                  <Text style={styles.emptySubtext}>Be the first to comment!</Text>
                </View>
              ) : (
                comments.map((comment) => (
                  <View key={comment.id} style={styles.comment}>
                    {/* Avatar */}
                    <View
                      style={[
                        styles.avatar,
                        { backgroundColor: getAvatarColor(comment.author) },
                      ]}
                    >
                      <Text style={styles.avatarText}>
                        {getInitials(comment.author)}
                      </Text>
                    </View>

                    {/* Comment Content */}
                    <View style={styles.commentBody}>
                      <View style={styles.commentHeader}>
                        <Text style={styles.commentAuthor}>{comment.author}</Text>
                        <Text style={styles.commentTime}>{comment.timestamp}</Text>
                      </View>
                      <Text style={styles.commentContent}>{comment.content}</Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>

            {/* Input */}
            <View style={[styles.inputContainer, { paddingBottom: 12 + insets.bottom }]}>
              {/* User Avatar for Input */}
              <View style={[styles.inputAvatar, { backgroundColor: '#0057FF' }]}>
                <Text style={styles.avatarText}>Y</Text>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Add a comment..."
                placeholderTextColor="#999"
                value={newComment}
                onChangeText={setNewComment}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !newComment.trim() && styles.sendButtonDisabled,
                ]}
                onPress={handleAddComment}
                disabled={!newComment.trim()}
              >
                <Ionicons
                  name="send"
                  size={18}
                  color={newComment.trim() ? '#0057FF' : '#999'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: MODAL_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handleBarContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    padding: 4,
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  comment: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  commentBody: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  commentTime: {
    fontSize: 12,
    color: '#999',
  },
  commentContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  inputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    maxHeight: 80,
    marginRight: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
