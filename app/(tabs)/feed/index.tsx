import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CommentModal from "../../components/CommentModal";
import PostCard from "../../components/PostCard";
import SuggestedAccountCard from "../../components/SuggestedAccountCard";
import { useStreak } from "../../context/StreakContext";

type Post = {
  id: string;
  authorName: string;
  authorSchool: string;
  authorAvatar?: string;
  content: string;
  imageUrl?: string;
  likes: number;
  commentsCount: number;
  clipPosition: "left" | "right";
};

type SuggestedAccount = {
  id: string;
  name: string;
  username: string;
  type: "student" | "institution";
  followersCount: string;
  isPopular: boolean;
};

const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    authorName: "Harwin Ramoj",
    authorSchool: "Don Bosco School",
    content:
      "Just completed building my first app using React native 🚀\n#codingforlife",
    imageUrl:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=400&fit=crop",
    likes: 120,
    commentsCount: 14,
    clipPosition: "right",
  },
  {
    id: "2",
    authorName: "Sarah Johnson",
    authorSchool: "Lincoln High School",
    content: "Excited to share my science project on renewable energy! ⚡️🌱",
    imageUrl:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=400&fit=crop",
    likes: 85,
    commentsCount: 8,
    clipPosition: "left",
  },
  {
    id: "3",
    authorName: "Michael Chen",
    authorSchool: "St. Mary's Academy",
    content: "Our robotics team just won the regional championship! 🤖🏆",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop",
    likes: 203,
    commentsCount: 27,
    clipPosition: "right",
  },
  {
    id: "4",
    authorName: "Priya Patel",
    authorSchool: "Oxford International",
    content:
      "Finally finished my research paper on AI ethics! Took 3 months but totally worth it 📚✨",
    imageUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=400&fit=crop",
    likes: 156,
    commentsCount: 19,
    clipPosition: "left",
  },
  {
    id: "5",
    authorName: "David Kim",
    authorSchool: "Riverside Academy",
    content:
      "My art piece got selected for the national exhibition! Dreams do come true 🎨🌟",
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop",
    likes: 234,
    commentsCount: 45,
    clipPosition: "right",
  },
  {
    id: "6",
    authorName: "Emma Wilson",
    authorSchool: "Greenwood High",
    content:
      "Organized a beach cleanup with 50+ students today! Together we can make a difference 🌊♻️",
    imageUrl:
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=400&fit=crop",
    likes: 178,
    commentsCount: 32,
    clipPosition: "left",
  },
  {
    id: "7",
    authorName: "Alex Thompson",
    authorSchool: "Cambridge School",
    content:
      "Built a weather station using Arduino! Real-time data is so cool 🌤️💻",
    imageUrl:
      "https://images.unsplash.com/photo-1559163499-413811fb2344?w=400&h=400&fit=crop",
    likes: 145,
    commentsCount: 21,
    clipPosition: "right",
  },
  {
    id: "8",
    authorName: "Sofia Martinez",
    authorSchool: "International School",
    content:
      "Won first place at the debate competition! Hard work pays off 🎤✨",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=400&fit=crop",
    likes: 167,
    commentsCount: 28,
    clipPosition: "left",
  },
  {
    id: "9",
    authorName: "Ryan Davis",
    authorSchool: "Tech Valley School",
    content:
      "Created my first mobile game! Download link in bio 🎮📱 #indiedev",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop",
    likes: 298,
    commentsCount: 56,
    clipPosition: "right",
  },
  {
    id: "10",
    authorName: "Aisha Khan",
    authorSchool: "Global Academy",
    content:
      "My photography series on street culture got published! 📸✨ #youngphotographer",
    imageUrl:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=400&fit=crop",
    likes: 312,
    commentsCount: 67,
    clipPosition: "left",
  },
  {
    id: "11",
    authorName: "James Wilson",
    authorSchool: "St. Patrick's School",
    content:
      "Completed a 30-day coding challenge! Learned so much about algorithms 💪💻",
    imageUrl:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=400&fit=crop",
    likes: 189,
    commentsCount: 34,
    clipPosition: "right",
  },
  {
    id: "12",
    authorName: "Lily Chen",
    authorSchool: "Harmony High School",
    content:
      "Performed at Carnegie Hall with our school orchestra! Best day ever 🎻🎶",
    imageUrl:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop",
    likes: 267,
    commentsCount: 48,
    clipPosition: "left",
  },
];

const SUGGESTED_ACCOUNTS_1: SuggestedAccount[] = [
  {
    id: "mit-ocw",
    name: "MIT OpenCourseWare",
    username: "@mitocw",
    type: "institution",
    followersCount: "2.5M",
    isPopular: true,
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    username: "@sarah_codes",
    type: "student",
    followersCount: "856",
    isPopular: false,
  },
  {
    id: "nasa-students",
    name: "NASA Students",
    username: "@nasastudents",
    type: "institution",
    followersCount: "1.2M",
    isPopular: true,
  },
  {
    id: "khan-academy",
    name: "Khan Academy",
    username: "@khanacademy",
    type: "institution",
    followersCount: "3.1M",
    isPopular: true,
  },
];

const SUGGESTED_ACCOUNTS_2: SuggestedAccount[] = [
  {
    id: "s5",
    name: "Stanford Online",
    username: "@stanfordonline",
    type: "institution",
    followersCount: "1.8M",
    isPopular: true,
  },
  {
    id: "s6",
    name: "Code Girl",
    username: "@codegirl_dev",
    type: "student",
    followersCount: "423K",
    isPopular: false,
  },
  {
    id: "s7",
    name: "Young Scientists",
    username: "@youngscientists",
    type: "student",
    followersCount: "267K",
    isPopular: false,
  },
  {
    id: "s8",
    name: "Harvard University",
    username: "@harvard",
    type: "institution",
    followersCount: "4.2M",
    isPopular: true,
  },
];

export default function Feed() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { currentStreak, hasCheckedInToday } = useStreak();
  const checkedInToday = hasCheckedInToday();

  const handleFollow = (accountId: string) => {
    console.log("Following account:", accountId);
  };

  const renderSuggestedAccounts = (
    accounts: SuggestedAccount[],
    title: string,
  ) => (
    <View style={styles.suggestedSection}>
      <View style={styles.suggestedHeader}>
        <Text style={styles.suggestedTitle}>{title}</Text>
        <Text style={styles.suggestedSubtitle}>People you might know</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.suggestedScroll}
      >
        {accounts.map((account) => (
          <SuggestedAccountCard
            key={account.id}
            name={account.name}
            username={account.username}
            type={account.type}
            followersCount={account.followersCount}
            isPopular={account.isPopular}
            onFollow={() => handleFollow(account.id)}
            onPress={() => router.push(`/(tabs)/feed/profile?id=${account.id}`)}
          />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Custom Header with Search and Notifications */}
      <View style={styles.header}>
        <Text style={styles.logo}>startED</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/(tabs)/feed/search")}
          >
            <Ionicons name="search" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/(tabs)/feed/notifications")}
          >
            <Ionicons name="notifications" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {/* Streak CTA Card */}
        <TouchableOpacity
          style={styles.streakCard}
          onPress={() => router.push("/(tabs)/feed/streak-checkin")}
        >
          <View style={styles.streakCardLeft}>
            <View style={styles.streakIconCircle}>
              <Ionicons name="flame" size={28} color="#FF9500" />
            </View>
            <View style={styles.streakInfo}>
              <Text style={styles.streakTitle}>Daily Streak</Text>
              <Text style={styles.streakSubtitle}>
                {checkedInToday
                  ? "Checked in today!"
                  : `${currentStreak} day streak - Check in now!`}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.streakBadge,
              checkedInToday && styles.streakBadgeDone,
            ]}
          >
            <Text
              style={[
                styles.streakBadgeText,
                checkedInToday && styles.streakBadgeTextDone,
              ]}
            >
              {checkedInToday ? "Done" : "Check In"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* First 3 posts */}
        {SAMPLE_POSTS.slice(0, 3).map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            authorName={post.authorName}
            authorSchool={post.authorSchool}
            authorAvatar={post.authorAvatar}
            content={post.content}
            imageUrl={post.imageUrl}
            initialLikes={post.likes}
            commentsCount={post.commentsCount}
            clipPosition={post.clipPosition}
            onCommentPress={() => setSelectedPost(post)}
          />
        ))}

        {/* First Suggested Accounts Section */}
        {renderSuggestedAccounts(SUGGESTED_ACCOUNTS_1, "Trending Accounts ✨")}

        {/* Posts 4-8 */}
        {SAMPLE_POSTS.slice(3, 8).map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            authorName={post.authorName}
            authorSchool={post.authorSchool}
            authorAvatar={post.authorAvatar}
            content={post.content}
            imageUrl={post.imageUrl}
            initialLikes={post.likes}
            commentsCount={post.commentsCount}
            clipPosition={post.clipPosition}
            onCommentPress={() => setSelectedPost(post)}
          />
        ))}

        {/* Second Suggested Accounts Section */}
        {renderSuggestedAccounts(
          SUGGESTED_ACCOUNTS_2,
          "Top Universities & Creators 🌟",
        )}

        {/* Remaining posts */}
        {SAMPLE_POSTS.slice(8).map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            authorName={post.authorName}
            authorSchool={post.authorSchool}
            authorAvatar={post.authorAvatar}
            content={post.content}
            imageUrl={post.imageUrl}
            initialLikes={post.likes}
            commentsCount={post.commentsCount}
            clipPosition={post.clipPosition}
            onCommentPress={() => setSelectedPost(post)}
          />
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>

      {selectedPost && (
        <CommentModal
          visible={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          postAuthor={selectedPost.authorName}
          initialComments={[
            {
              id: "1",
              author: "Emma Wilson",
              content: "This is amazing! Great work! 👏",
              timestamp: "2h ago",
            },
            {
              id: "2",
              author: "Alex Thompson",
              content: "Can you share more details about this?",
              timestamp: "1h ago",
            },
          ]}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0066FF",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  suggestedSection: {
    paddingVertical: 20,
    backgroundColor: "#f9f9f9",
    marginVertical: 8,
  },
  suggestedHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  suggestedTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  suggestedSubtitle: {
    fontSize: 13,
    color: "#666",
  },
  suggestedScroll: {
    paddingHorizontal: 16,
  },
  streakCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF9E6",
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  streakCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  streakIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF3CD",
    justifyContent: "center",
    alignItems: "center",
  },
  streakInfo: {
    gap: 2,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  streakSubtitle: {
    fontSize: 13,
    color: "#666",
  },
  streakBadge: {
    backgroundColor: "#0057FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  streakBadgeDone: {
    backgroundColor: "#4CAF50",
  },
  streakBadgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  streakBadgeTextDone: {
    color: "#fff",
  },
});
