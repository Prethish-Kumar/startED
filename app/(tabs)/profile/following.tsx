import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Following = {
  id: string;
  name: string;
  username: string;
  school: string;
  followers: string;
  verified: boolean;
};

const DUMMY_FOLLOWING: Following[] = [
  {
    id: "1",
    name: "MIT OpenCourseWare",
    username: "@mitocw",
    school: "Educational Institution",
    followers: "2.5M",
    verified: true,
  },
  {
    id: "2",
    name: "Coding with Mosh",
    username: "@codingwithmosh",
    school: "Content Creator",
    followers: "856K",
    verified: true,
  },
  {
    id: "3",
    name: "NASA Students",
    username: "@nasastudents",
    school: "Educational Institution",
    followers: "1.2M",
    verified: true,
  },
  {
    id: "4",
    name: "Khan Academy",
    username: "@khanacademy",
    school: "Educational Institution",
    followers: "3.1M",
    verified: true,
  },
  {
    id: "5",
    name: "Stanford Online",
    username: "@stanfordonline",
    school: "Educational Institution",
    followers: "1.8M",
    verified: true,
  },
  {
    id: "6",
    name: "Code Girl",
    username: "@codegirl_dev",
    school: "Tech Valley School",
    followers: "423K",
    verified: false,
  },
  {
    id: "7",
    name: "Young Scientists",
    username: "@youngscientists",
    school: "Science Community",
    followers: "267K",
    verified: false,
  },
  {
    id: "8",
    name: "Harvard University",
    username: "@harvard",
    school: "Educational Institution",
    followers: "4.2M",
    verified: true,
  },
];

export default function Following() {
  const [following, setFollowing] = useState(DUMMY_FOLLOWING);

  const handleBack = () => {
    router.back();
  };

  const handleUnfollow = (userId: string, name: string) => {
    Alert.alert("Unfollow", `Are you sure you want to unfollow ${name}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Unfollow",
        style: "destructive",
        onPress: () => {
          setFollowing(following.filter((f) => f.id !== userId));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Following</Text>
          <Text style={styles.headerSubtitle}>{following.length} following</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {following.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{user.name}</Text>
                {user.verified && (
                  <Ionicons name="checkmark-circle" size={16} color="#0057FF" />
                )}
              </View>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.school}>{user.school}</Text>
              <Text style={styles.followers}>{user.followers} followers</Text>
            </View>

            <TouchableOpacity
              style={styles.unfollowButton}
              onPress={() => handleUnfollow(user.id, user.name)}
            >
              <Text style={styles.unfollowButtonText}>Following</Text>
            </TouchableOpacity>
          </View>
        ))}

        {following.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="person-add-outline" size={64} color="#E0E0E0" />
            <Text style={styles.emptyText}>Not following anyone yet</Text>
            <Text style={styles.emptySubtext}>
              Discover amazing students and institutions to follow!
            </Text>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
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
  userCard: {
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
  unfollowButton: {
    backgroundColor: "#f0f7ff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#0057FF",
  },
  unfollowButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0057FF",
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
