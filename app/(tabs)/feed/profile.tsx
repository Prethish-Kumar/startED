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
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

type ProfileType = "student" | "institution";

type ProfileData = {
  id: string;
  name: string;
  username: string;
  type: ProfileType;
  verified: boolean;
  isPopular: boolean;
  followers: string;
  following: string;
  posts: string;
  bio: string;
  location: string;
  website?: string;
  joined: string;
  coverPhoto: string;
  profilePhoto: string;
  interests?: string[];
  achievements?: Array<{ title: string; date: string; color: string }>;
  recentPosts: string[];
  // Institution-specific fields
  notableAlumni?: Array<{ name: string; achievement: string }>;
  institutionAchievements?: Array<{ title: string; description: string; icon: string }>;
  programs?: string[];
  rankings?: Array<{ title: string; value: string }>;
};

const DUMMY_PROFILES: { [key: string]: ProfileData } = {
  "sarah-johnson": {
    id: "1",
    name: "Sarah Johnson",
    username: "@sarah_codes",
    type: "student",
    verified: false,
    isPopular: false,
    followers: "856",
    following: "324",
    posts: "47",
    bio: "17 | Aspiring software engineer 💻 | Love building apps and solving problems | Python & React enthusiast",
    location: "Lincoln High School, New York",
    joined: "Jan 2025",
    coverPhoto: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    profilePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    interests: ["Python", "React", "Web Dev", "AI/ML"],
    achievements: [
      { title: "Regional Hackathon Winner", date: "Dec 2025", color: "#FF1F7D" },
      { title: "Science Fair Bronze", date: "Nov 2025", color: "#87CEEB" },
    ],
    recentPosts: [
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    ],
  },
  "mit-ocw": {
    id: "2",
    name: "MIT OpenCourseWare",
    username: "@mitocw",
    type: "institution",
    verified: true,
    isPopular: true,
    followers: "2.5M",
    following: "128",
    posts: "1.2K",
    bio: "Free lecture notes, exams, and videos from MIT. No registration required. Share knowledge, empower learners worldwide. 🎓",
    location: "Cambridge, Massachusetts",
    website: "ocw.mit.edu",
    joined: "Founding Member",
    coverPhoto: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    profilePhoto: "https://images.unsplash.com/photo-1562774053-701939374585?w=400",
    notableAlumni: [
      { name: "Buzz Aldrin", achievement: "Apollo 11 Astronaut, 2nd person to walk on the Moon" },
      { name: "Kofi Annan", achievement: "Former UN Secretary-General, Nobel Peace Prize winner" },
      { name: "Benjamin Netanyahu", achievement: "Prime Minister of Israel" },
      { name: "Salman Khan", achievement: "Founder of Khan Academy" },
    ],
    institutionAchievements: [
      {
        title: "2.6K+ Free Courses",
        description: "Virtually all MIT courses available for free",
        icon: "book"
      },
      {
        title: "300M+ Learners",
        description: "Reached worldwide since 2001",
        icon: "people"
      },
      {
        title: "Open Education Pioneer",
        description: "First major university to share full courses free",
        icon: "rocket"
      },
    ],
    programs: [
      "Computer Science", "Mathematics", "Physics", "Engineering",
      "Biology", "Chemistry", "Economics", "Business"
    ],
    rankings: [
      { title: "QS World Ranking", value: "#1 Globally" },
      { title: "Best Engineering School", value: "#1 in USA" },
      { title: "Best Computer Science", value: "#1 Worldwide" },
    ],
    recentPosts: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400",
    ],
  },
  "nasa-students": {
    id: "3",
    name: "NASA Students",
    username: "@nasastudents",
    type: "institution",
    verified: true,
    isPopular: true,
    followers: "1.2M",
    following: "89",
    posts: "856",
    bio: "Official NASA student programs 🚀 | STEM opportunities for the next generation of space explorers | Dream big, reach for the stars! ⭐",
    location: "Washington D.C., USA",
    website: "nasa.gov/students",
    joined: "Founding Member",
    coverPhoto: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800",
    profilePhoto: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400",
    notableAlumni: [
      { name: "Neil Armstrong", achievement: "First person to walk on the Moon, Apollo 11" },
      { name: "Mae Jemison", achievement: "First African American woman in space" },
      { name: "Katherine Johnson", achievement: "Pioneering mathematician, NASA computing" },
      { name: "Elon Musk", achievement: "SpaceX Founder, revolutionizing space travel" },
    ],
    institutionAchievements: [
      {
        title: "Moon Landing",
        description: "Apollo 11 mission - First humans on the Moon, 1969",
        icon: "planet"
      },
      {
        title: "Mars Rovers",
        description: "Successful deployment of multiple rovers on Mars",
        icon: "car-sport"
      },
      {
        title: "ISS Operations",
        description: "International Space Station - 23+ years in orbit",
        icon: "earth"
      },
    ],
    programs: [
      "Student Launch", "CubeSat Launch Initiative", "Internships",
      "Fellowships", "Scholarships", "STEM Engagement"
    ],
    rankings: [
      { title: "Space Exploration", value: "World Leader" },
      { title: "Student Opportunities", value: "10,000+ annually" },
      { title: "Research Budget", value: "$25.4 Billion" },
    ],
    recentPosts: [
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400",
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400",
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    ],
  },
  "khan-academy": {
    id: "4",
    name: "Khan Academy",
    username: "@khanacademy",
    type: "institution",
    verified: true,
    isPopular: true,
    followers: "3.1M",
    following: "245",
    posts: "2.3K",
    bio: "Free world-class education for anyone, anywhere. 🌍 Practice exercises, videos, and personalized learning dashboard for all subjects!",
    location: "Mountain View, California",
    website: "khanacademy.org",
    joined: "Founding Member",
    coverPhoto: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    profilePhoto: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
    notableAlumni: [
      { name: "Salman Khan", achievement: "Founder, created 10,000+ educational videos" },
      { name: "Bill Gates", achievement: "Major supporter and board member" },
      { name: "Reed Hastings", achievement: "Netflix CEO, major donor" },
      { name: "Carlos Slim", achievement: "Philanthropist, funded Spanish translations" },
    ],
    institutionAchievements: [
      {
        title: "150M+ Learners",
        description: "Students worldwide have used Khan Academy",
        icon: "school"
      },
      {
        title: "Available in 50+ Languages",
        description: "Making education accessible globally",
        icon: "globe"
      },
      {
        title: "100% Free Forever",
        description: "Non-profit committed to free education",
        icon: "heart"
      },
    ],
    programs: [
      "Math (K-12)", "Science", "Computing", "Arts & Humanities",
      "SAT Prep", "AP Courses", "Teacher Tools", "Parent Resources"
    ],
    rankings: [
      { title: "Online Learning", value: "Top 5 Globally" },
      { title: "Video Library", value: "10,000+ videos" },
      { title: "Practice Problems", value: "70,000+ exercises" },
    ],
    recentPosts: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400",
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
    ],
  },
};

export default function ProfileView() {
  const params = useLocalSearchParams();
  const profileId = params.id as string;
  const profile = DUMMY_PROFILES[profileId];

  const [isFollowing, setIsFollowing] = useState(false);

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Profile not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backLink}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Photo */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: profile.coverPhoto }} style={styles.coverPhoto} />
          {profile.isPopular && (
            <LinearGradient
              colors={["rgba(255,215,0,0.9)", "rgba(255,165,0,0.9)"]}
              style={styles.foundingBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="medal" size={16} color="#fff" />
              <Text style={styles.foundingText}>Founding Member</Text>
            </LinearGradient>
          )}
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <View style={styles.backButtonCircle}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profilePhotoContainer}>
            <Image
              source={{ uri: profile.profilePhoto }}
              style={styles.profilePhoto}
            />
            {profile.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={24} color="#0057FF" />
              </View>
            )}
          </View>

          <View style={styles.nameContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{profile.name}</Text>
              {profile.type === "institution" && (
                <View style={styles.institutionBadge}>
                  <Ionicons name="business" size={14} color="#666" />
                  <Text style={styles.institutionText}>Institution</Text>
                </View>
              )}
            </View>
            <Text style={styles.username}>{profile.username}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profile.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profile.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profile.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          {/* Follow Button */}
          <TouchableOpacity
            style={[
              styles.followButton,
              isFollowing && styles.followingButton,
            ]}
            onPress={handleFollow}
          >
            <Ionicons
              name={isFollowing ? "checkmark" : "person-add"}
              size={18}
              color={isFollowing ? "#0057FF" : "#fff"}
            />
            <Text
              style={[
                styles.followButtonText,
                isFollowing && styles.followingButtonText,
              ]}
            >
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>

          {/* Bio */}
          <View style={styles.bioSection}>
            <Text style={styles.bio}>{profile.bio}</Text>
          </View>

          {/* Location & Website */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={16} color="#666" />
              <Text style={styles.infoText}>{profile.location}</Text>
            </View>
            {profile.website && (
              <View style={styles.infoRow}>
                <Ionicons name="globe" size={16} color="#666" />
                <Text style={styles.infoLink}>{profile.website}</Text>
              </View>
            )}
            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={16} color="#666" />
              <Text style={styles.infoText}>Joined {profile.joined}</Text>
            </View>
          </View>

          {/* Interests (Students only) */}
          {profile.type === "student" && profile.interests && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <View style={styles.interestsContainer}>
                {profile.interests.map((interest, index) => (
                  <View key={index} style={styles.interestTag}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Achievements (Students only) */}
          {profile.type === "student" && profile.achievements && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Achievements</Text>
              {profile.achievements.map((achievement, index) => (
                <View
                  key={index}
                  style={[
                    styles.achievementCard,
                    { borderLeftColor: achievement.color },
                  ]}
                >
                  <Text style={styles.achievementTitle}>
                    {achievement.title}
                  </Text>
                  <Text style={styles.achievementDate}>{achievement.date}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Institution Achievements */}
          {profile.type === "institution" && profile.institutionAchievements && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Major Achievements</Text>
              {profile.institutionAchievements.map((achievement, index) => (
                <View key={index} style={styles.institutionAchievementCard}>
                  <View style={styles.institutionAchievementIcon}>
                    <Ionicons name={achievement.icon as any} size={24} color="#0057FF" />
                  </View>
                  <View style={styles.institutionAchievementInfo}>
                    <Text style={styles.institutionAchievementTitle}>
                      {achievement.title}
                    </Text>
                    <Text style={styles.institutionAchievementDesc}>
                      {achievement.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Notable Alumni */}
          {profile.type === "institution" && profile.notableAlumni && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notable Alumni</Text>
              {profile.notableAlumni.map((alumni, index) => (
                <View key={index} style={styles.alumniCard}>
                  <View style={styles.alumniIcon}>
                    <Ionicons name="person-circle" size={40} color="#0057FF" />
                  </View>
                  <View style={styles.alumniInfo}>
                    <Text style={styles.alumniName}>{alumni.name}</Text>
                    <Text style={styles.alumniAchievement}>{alumni.achievement}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Rankings */}
          {profile.type === "institution" && profile.rankings && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rankings & Stats</Text>
              <View style={styles.rankingsContainer}>
                {profile.rankings.map((ranking, index) => (
                  <View key={index} style={styles.rankingCard}>
                    <Text style={styles.rankingValue}>{ranking.value}</Text>
                    <Text style={styles.rankingTitle}>{ranking.title}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Programs */}
          {profile.type === "institution" && profile.programs && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Programs & Subjects</Text>
              <View style={styles.programsContainer}>
                {profile.programs.map((program, index) => (
                  <View key={index} style={styles.programTag}>
                    <Text style={styles.programText}>{program}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Posts Grid */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Posts</Text>
            <View style={styles.postsGrid}>
              {profile.recentPosts.map((post, index) => (
                <View key={index} style={styles.postItem}>
                  <Image source={{ uri: post }} style={styles.postImage} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  coverContainer: {
    position: "relative",
    height: 200,
  },
  coverPhoto: {
    width: "100%",
    height: "100%",
  },
  foundingBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  foundingText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileSection: {
    paddingHorizontal: 16,
  },
  profilePhotoContainer: {
    marginTop: -50,
    position: "relative",
    alignSelf: "flex-start",
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  nameContainer: {
    marginTop: 12,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  institutionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  institutionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  username: {
    fontSize: 16,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    marginTop: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  statLabel: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
  },
  followButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#0057FF",
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  followButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  followingButton: {
    backgroundColor: "#f0f7ff",
    borderWidth: 2,
    borderColor: "#0057FF",
  },
  followingButtonText: {
    color: "#0057FF",
  },
  bioSection: {
    marginTop: 20,
  },
  bio: {
    fontSize: 15,
    lineHeight: 22,
    color: "#000",
  },
  infoSection: {
    marginTop: 16,
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
  },
  infoLink: {
    fontSize: 14,
    color: "#0057FF",
    fontWeight: "600",
  },
  section: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  interestTag: {
    backgroundColor: "#0057FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  interestText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
  achievementCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  achievementTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 13,
    color: "#666",
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  postItem: {
    width: (width - 40) / 3,
    height: (width - 40) / 3,
  },
  postImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  backLink: {
    fontSize: 16,
    color: "#0057FF",
    fontWeight: "600",
  },
  institutionAchievementCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  institutionAchievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f0f7ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  institutionAchievementInfo: {
    flex: 1,
  },
  institutionAchievementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  institutionAchievementDesc: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  alumniCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  alumniIcon: {
    marginRight: 12,
  },
  alumniInfo: {
    flex: 1,
  },
  alumniName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  alumniAchievement: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  rankingsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  rankingCard: {
    flex: 1,
    minWidth: "30%",
    backgroundColor: "#f0f7ff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0057FF",
  },
  rankingValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0057FF",
    marginBottom: 6,
    textAlign: "center",
  },
  rankingTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontWeight: "600",
  },
  programsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  programTag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  programText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
});
