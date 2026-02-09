import { useState, useRef } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Follower = {
  id: string;
  name: string;
  username: string;
  school: string;
  followers: string;
  isFollowingBack: boolean;
  verified: boolean;
};

const DUMMY_FOLLOWERS: Follower[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    username: "@sarah_codes",
    school: "Lincoln High School",
    followers: "856",
    isFollowingBack: true,
    verified: false,
  },
  {
    id: "2",
    name: "Michael Chen",
    username: "@michael_tech",
    school: "St. Mary's Academy",
    followers: "2.1K",
    isFollowingBack: true,
    verified: true,
  },
  {
    id: "3",
    name: "Emma Wilson",
    username: "@emma_dev",
    school: "Greenwood High",
    followers: "1.3K",
    isFollowingBack: false,
    verified: false,
  },
  {
    id: "4",
    name: "Alex Thompson",
    username: "@alex_builds",
    school: "Cambridge School",
    followers: "945",
    isFollowingBack: true,
    verified: false,
  },
  {
    id: "5",
    name: "Priya Patel",
    username: "@priya_science",
    school: "Oxford International",
    followers: "1.8K",
    isFollowingBack: false,
    verified: true,
  },
  {
    id: "6",
    name: "David Kim",
    username: "@david_art",
    school: "Riverside Academy",
    followers: "3.2K",
    isFollowingBack: true,
    verified: true,
  },
  {
    id: "7",
    name: "Sofia Martinez",
    username: "@sofia_debate",
    school: "International School",
    followers: "678",
    isFollowingBack: false,
    verified: false,
  },
  {
    id: "8",
    name: "Ryan Davis",
    username: "@ryan_gamedev",
    school: "Tech Valley School",
    followers: "4.5K",
    isFollowingBack: true,
    verified: true,
  },
  {
    id: "9",
    name: "Aisha Khan",
    username: "@aisha_photo",
    school: "Global Academy",
    followers: "2.7K",
    isFollowingBack: true,
    verified: false,
  },
  {
    id: "10",
    name: "James Wilson",
    username: "@james_math",
    school: "St. Patrick's School",
    followers: "534",
    isFollowingBack: false,
    verified: false,
  },
];

export default function Followers() {
  const [followers, setFollowers] = useState(DUMMY_FOLLOWERS);
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const handleBack = () => {
    router.back();
  };

  const handleSwipeOpen = (followerId: string, name: string) => {
    Alert.alert(
      "Remove Follower",
      `Are you sure you want to remove ${name} from your followers?`,
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            // Close the swipeable
            swipeableRefs.current[followerId]?.close();
          },
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setFollowers(followers.filter((f) => f.id !== followerId));
          },
        },
      ]
    );
  };

  const handleFollowBack = (followerId: string) => {
    setFollowers(
      followers.map((f) =>
        f.id === followerId ? { ...f, isFollowingBack: !f.isFollowingBack } : f
      )
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.swipeActions,
          {
            transform: [{ translateX: trans }],
          },
        ]}
      >
        <View style={styles.removeSwipeButton}>
          <Ionicons name="trash-outline" size={24} color="#fff" />
          <Text style={styles.removeSwipeText}>Remove</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Followers</Text>
          <Text style={styles.headerSubtitle}>{followers.length} followers</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {followers.map((follower) => (
          <Swipeable
            key={follower.id}
            ref={(ref) => (swipeableRefs.current[follower.id] = ref)}
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX)
            }
            onSwipeableOpen={() => handleSwipeOpen(follower.id, follower.name)}
            overshootRight={false}
          >
            <View style={styles.followerCard}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {follower.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{follower.name}</Text>
                  {follower.verified && (
                    <Ionicons name="checkmark-circle" size={16} color="#0057FF" />
                  )}
                </View>
                <Text style={styles.username}>{follower.username}</Text>
                <Text style={styles.school}>{follower.school}</Text>
                <Text style={styles.followers}>{follower.followers} followers</Text>
              </View>

              <View style={styles.actionsContainer}>
                {follower.isFollowingBack ? (
                  <TouchableOpacity
                    style={styles.followingButton}
                    onPress={() => handleFollowBack(follower.id)}
                  >
                    <Ionicons name="checkmark" size={16} color="#0057FF" />
                    <Text style={styles.followingButtonText}>Following</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => handleFollowBack(follower.id)}
                  >
                    <Text style={styles.followButtonText}>Follow Back</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Swipeable>
        ))}

        {followers.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#E0E0E0" />
            <Text style={styles.emptyText}>No followers yet</Text>
            <Text style={styles.emptySubtext}>
              Start sharing your achievements to grow your network!
            </Text>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  followerCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0057FF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  username: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  school: {
    fontSize: 13,
    color: "#999",
    marginBottom: 2,
  },
  followers: {
    fontSize: 12,
    color: "#999",
  },
  actionsContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  followButton: {
    backgroundColor: "#0057FF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  followButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
  followingButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#f0f7ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#0057FF",
  },
  followingButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0057FF",
  },
  swipeActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  removeSwipeButton: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
    paddingHorizontal: 16,
  },
  removeSwipeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});
