import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import AchievementCard from "../components/AchievementCard";
import AchievementModal from "../components/AchievementModal";

const { width } = Dimensions.get("window");

type Achievement = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  date: string;
  description: string;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "1",
    title: "Mathematical Genius",
    subtitle: "Olympiad Winner",
    color: "#FF1F7D",
    icon: "calculator",
    date: "Dec 2025",
    description:
      "Awarded for exceptional performance in the National Mathematics Olympiad, securing top position among 10,000+ participants nationwide!",
  },
  {
    id: "2",
    title: "International Maths",
    subtitle: "Olympiad Participant",
    color: "#C4F54D",
    icon: "globe",
    date: "Jan 2026",
    description:
      "Represented the country at the International Mathematics Olympiad, competing with the world's brightest young mathematicians!",
  },
  {
    id: "3",
    title: "Coding Champion",
    subtitle: "Hackathon Winner",
    color: "#87CEEB",
    icon: "code-slash",
    date: "Nov 2025",
    description:
      "First place winner at the National Student Hackathon, building an innovative solution to help students learn better!",
  },
  {
    id: "4",
    title: "Science Fair Star",
    subtitle: "Best Project Award",
    color: "#FFB6C1",
    icon: "flask",
    date: "Oct 2025",
    description:
      "Won Best Project Award at the State Science Fair for an innovative renewable energy project!",
  },
];

const POSTS = [
  "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
];

export default function Profile() {
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Your Profile" icon="settings" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>HR</Text>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
            </View>
          </View>
          <Text style={styles.name}>Harwin Ramoj</Text>
          <Text style={styles.username}>@harwin_codes</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>10</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1,089</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>275</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={18} color="#0057FF" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* About Me */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText}>
            I am a Grade student with a strong passion for mathematics,
            programming, and science. I love to solve problems, build cool
            projects, and focus on Arduino, Hacks, and continuous learning.
          </Text>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            <View style={[styles.interestTag, { backgroundColor: "#0057FF" }]}>
              <Ionicons name="logo-python" size={16} color="#fff" />
              <Text style={styles.interestText}>Python</Text>
            </View>
            <View style={[styles.interestTag, { backgroundColor: "#0057FF" }]}>
              <Ionicons name="logo-javascript" size={16} color="#fff" />
              <Text style={styles.interestText}>JavaScript</Text>
            </View>
            <View style={[styles.interestTag, { backgroundColor: "#0057FF" }]}>
              <Ionicons name="logo-react" size={16} color="#fff" />
              <Text style={styles.interestText}>React</Text>
            </View>
            <View style={[styles.interestTag, { backgroundColor: "#0057FF" }]}>
              <Ionicons name="hardware-chip" size={16} color="#fff" />
              <Text style={styles.interestText}>Arduino</Text>
            </View>
          </View>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.educationCard}>
            <View
              style={[styles.educationIcon, { backgroundColor: "#C4F54D" }]}
            >
              <Ionicons name="school" size={24} color="#0057FF" />
            </View>
            <View style={styles.educationInfo}>
              <Text style={styles.educationSchool}>St John's School</Text>
              <Text style={styles.educationDuration}>
                5 Years I was there
              </Text>
            </View>
          </View>

          <View style={styles.educationCard}>
            <View
              style={[styles.educationIcon, { backgroundColor: "#FFD700" }]}
            >
              <Ionicons name="school" size={24} color="#0057FF" />
            </View>
            <View style={styles.educationInfo}>
              <Text style={styles.educationSchool}>
                Don Bosco Senior Secondary School
              </Text>
              <Text style={styles.educationDuration}>
                Currently Studying Here
              </Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Achievements 🏆 ({ACHIEVEMENTS.length})
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsScroll}
          >
            {ACHIEVEMENTS.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                subtitle={achievement.subtitle}
                color={achievement.color}
                icon={achievement.icon}
                date={achievement.date}
                onPress={() => setSelectedAchievement(achievement)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Activity Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity This Week</Text>
          <View style={styles.activityContainer}>
            <View style={styles.activityItem}>
              <View
                style={[styles.activityIcon, { backgroundColor: "#FFB6C1" }]}
              >
                <Ionicons name="heart" size={20} color="#FF1F7D" />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityValue}>127</Text>
                <Text style={styles.activityLabel}>Likes Received</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View
                style={[styles.activityIcon, { backgroundColor: "#C4F54D" }]}
              >
                <Ionicons name="chatbubbles" size={20} color="#0057FF" />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityValue}>43</Text>
                <Text style={styles.activityLabel}>Comments</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View
                style={[styles.activityIcon, { backgroundColor: "#87CEEB" }]}
              >
                <Ionicons name="eye" size={20} color="#0057FF" />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityValue}>892</Text>
                <Text style={styles.activityLabel}>Profile Views</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Posts Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Posts ({POSTS.length})</Text>
          <View style={styles.postsGrid}>
            {POSTS.map((post, index) => (
              <TouchableOpacity key={index} style={styles.postItem}>
                <Image source={{ uri: post }} style={styles.postImage} />
                <View style={styles.postOverlay}>
                  <Ionicons name="heart" size={16} color="#fff" />
                  <Text style={styles.postStat}>
                    {Math.floor(Math.random() * 100) + 20}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Achievement Modal */}
      {selectedAchievement && (
        <AchievementModal
          visible={!!selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
          title={selectedAchievement.title}
          subtitle={selectedAchievement.subtitle}
          color={selectedAchievement.color}
          icon={selectedAchievement.icon}
          date={selectedAchievement.date}
          description={selectedAchievement.description}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#0057FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  statusBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  username: {
    fontSize: 15,
    color: "#0057FF",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0057FF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E0E0E0",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#0057FF",
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0057FF",
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  interestTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  interestText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  educationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  educationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  educationInfo: {
    flex: 1,
  },
  educationSchool: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  educationDuration: {
    fontSize: 13,
    color: "#666",
  },
  achievementsScroll: {
    paddingRight: 20,
  },
  activityContainer: {
    flexDirection: "row",
    gap: 12,
  },
  activityItem: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  activityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  activityInfo: {
    alignItems: "center",
  },
  activityValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  activityLabel: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  postItem: {
    width: (width - 56) / 3,
    height: (width - 56) / 3,
    position: "relative",
  },
  postImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  postOverlay: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  postStat: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },
});
