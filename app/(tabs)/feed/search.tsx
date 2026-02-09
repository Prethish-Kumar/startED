import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type SearchCategory =
  | "all"
  | "users"
  | "posts"
  | "events"
  | "schools"
  | "hashtags";

type SearchResult = {
  id: string;
  type: "user" | "post" | "event" | "school" | "hashtag";
  title: string;
  subtitle?: string;
  imageUrl?: string;
  verified?: boolean;
  followers?: string;
  date?: string;
};

const TRENDING_HASHTAGS = [
  { tag: "#CodingForLife", posts: "1.2K posts" },
  { tag: "#ScienceFair2026", posts: "856 posts" },
  { tag: "#StudentLife", posts: "3.4K posts" },
  { tag: "#MathOlympiad", posts: "654 posts" },
  { tag: "#RoboticsChallenge", posts: "432 posts" },
  { tag: "#ArtCompetition", posts: "789 posts" },
];

const SUGGESTED_USERS = [
  {
    id: "1",
    type: "user" as const,
    title: "Sarah Johnson",
    subtitle: "Lincoln High School",
    followers: "856 followers",
    verified: false,
  },
  {
    id: "2",
    type: "user" as const,
    title: "Michael Chen",
    subtitle: "St. Mary's Academy",
    followers: "2.1K followers",
    verified: true,
  },
  {
    id: "3",
    type: "user" as const,
    title: "MIT OpenCourseWare",
    subtitle: "Educational Institution",
    followers: "2.5M followers",
    verified: true,
  },
];

const POPULAR_SCHOOLS = [
  {
    id: "1",
    type: "school" as const,
    title: "Lincoln High School",
    subtitle: "New York, USA",
    followers: "12K students",
    verified: true,
  },
  {
    id: "2",
    type: "school" as const,
    title: "Don Bosco School",
    subtitle: "Mumbai, India",
    followers: "8.5K students",
    verified: true,
  },
];

const SAMPLE_SEARCH_RESULTS: SearchResult[] = [
  {
    id: "1",
    type: "user",
    title: "Harwin Ramoj",
    subtitle: "Don Bosco School",
    followers: "1.2K followers",
    verified: false,
  },
  {
    id: "2",
    type: "post",
    title: "Just completed my first React Native app!",
    subtitle: "by Sarah Johnson",
    date: "2 hours ago",
  },
  {
    id: "3",
    type: "event",
    title: "Science Fair 2026",
    subtitle: "Lincoln High School • Feb 15",
    date: "Upcoming",
  },
  {
    id: "4",
    type: "school",
    title: "MIT",
    subtitle: "Cambridge, Massachusetts",
    followers: "50K students",
    verified: true,
  },
  {
    id: "5",
    type: "hashtag",
    title: "#CodingForLife",
    subtitle: "1.2K posts",
  },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("all");
  const [recentSearches, setRecentSearches] = useState([
    "React Native",
    "Science Fair",
    "MIT",
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Add to recent searches if not empty
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches([query.trim(), ...recentSearches].slice(0, 5));
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "user":
        return "person-circle";
      case "post":
        return "document-text";
      case "event":
        return "calendar";
      case "school":
        return "school";
      case "hashtag":
        return "pricetag";
      default:
        return "search";
    }
  };

  const getResultColor = (type: string) => {
    switch (type) {
      case "user":
        return "#0057FF";
      case "post":
        return "#FF1F7D";
      case "event":
        return "#FF9500";
      case "school":
        return "#34C759";
      case "hashtag":
        return "#5856D6";
      default:
        return "#999";
    }
  };

  const filteredResults =
    activeCategory === "all"
      ? SAMPLE_SEARCH_RESULTS
      : SAMPLE_SEARCH_RESULTS.filter((r) => r.type === activeCategory);

  const showResults = searchQuery.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users, posts, events..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => handleSearch(searchQuery)}
            autoFocus
            returnKeyType="search"
            keyboardAppearance="light"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filters */}
      {showResults && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {(
            [
              "all",
              "users",
              "posts",
              "events",
              "schools",
              "hashtags",
            ] as SearchCategory[]
          ).map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                activeCategory === category && styles.activeCategoryChip,
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  activeCategory === category && styles.activeCategoryChipText,
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!showResults ? (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Recent</Text>
                  <TouchableOpacity onPress={handleClearRecentSearches}>
                    <Text style={styles.clearText}>Clear</Text>
                  </TouchableOpacity>
                </View>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recentItem}
                    onPress={() => setSearchQuery(search)}
                  >
                    <Ionicons name="time-outline" size={20} color="#666" />
                    <Text style={styles.recentText}>{search}</Text>
                    <Ionicons name="arrow-forward" size={18} color="#999" />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Trending Hashtags */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trending Hashtags 🔥</Text>
              {TRENDING_HASHTAGS.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.trendingItem}
                  onPress={() => setSearchQuery(item.tag)}
                >
                  <View
                    style={[styles.hashtagIcon, { backgroundColor: "#5856D6" }]}
                  >
                    <Ionicons name="pricetag" size={18} color="#fff" />
                  </View>
                  <View style={styles.trendingInfo}>
                    <Text style={styles.trendingTag}>{item.tag}</Text>
                    <Text style={styles.trendingCount}>{item.posts}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>
              ))}
            </View>

            {/* Suggested Users */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Suggested Users</Text>
              {SUGGESTED_USERS.map((user) => (
                <TouchableOpacity key={user.id} style={styles.userItem}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.avatarText}>
                      {user.title
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.userInfo}>
                    <View style={styles.userTitleRow}>
                      <Text style={styles.userName}>{user.title}</Text>
                      {user.verified && (
                        <Ionicons
                          name="checkmark-circle"
                          size={16}
                          color="#0057FF"
                        />
                      )}
                    </View>
                    <Text style={styles.userSubtitle}>{user.subtitle}</Text>
                    <Text style={styles.userFollowers}>{user.followers}</Text>
                  </View>
                  <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>Follow</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>

            {/* Popular Schools */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Schools</Text>
              {POPULAR_SCHOOLS.map((school) => (
                <TouchableOpacity key={school.id} style={styles.schoolItem}>
                  <View
                    style={[styles.schoolIcon, { backgroundColor: "#34C759" }]}
                  >
                    <Ionicons name="school" size={24} color="#fff" />
                  </View>
                  <View style={styles.schoolInfo}>
                    <View style={styles.schoolTitleRow}>
                      <Text style={styles.schoolName}>{school.title}</Text>
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color="#0057FF"
                      />
                    </View>
                    <Text style={styles.schoolLocation}>{school.subtitle}</Text>
                    <Text style={styles.schoolFollowers}>
                      {school.followers}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          /* Search Results */
          <View style={styles.resultsSection}>
            <Text style={styles.resultsCount}>
              {filteredResults.length} results found
            </Text>
            {filteredResults.map((result) => (
              <TouchableOpacity key={result.id} style={styles.resultItem}>
                <View
                  style={[
                    styles.resultIcon,
                    { backgroundColor: getResultColor(result.type) + "20" },
                  ]}
                >
                  <Ionicons
                    name={getResultIcon(result.type) as any}
                    size={24}
                    color={getResultColor(result.type)}
                  />
                </View>
                <View style={styles.resultInfo}>
                  <View style={styles.resultTitleRow}>
                    <Text style={styles.resultTitle}>{result.title}</Text>
                    {result.verified && (
                      <Ionicons
                        name="checkmark-circle"
                        size={14}
                        color="#0057FF"
                      />
                    )}
                  </View>
                  {result.subtitle && (
                    <Text style={styles.resultSubtitle}>{result.subtitle}</Text>
                  )}
                  {result.followers && (
                    <Text style={styles.resultMeta}>{result.followers}</Text>
                  )}
                  {result.date && (
                    <Text style={styles.resultMeta}>{result.date}</Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  categoriesContainer: {
    maxHeight: 60,
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  activeCategoryChip: {
    backgroundColor: "#0057FF",
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  activeCategoryChipText: {
    color: "#fff",
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  clearText: {
    fontSize: 14,
    color: "#0057FF",
    fontWeight: "600",
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  recentText: {
    flex: 1,
    fontSize: 15,
    color: "#000",
  },
  trendingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  hashtagIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  trendingInfo: {
    flex: 1,
  },
  trendingTag: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  trendingCount: {
    fontSize: 13,
    color: "#666",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0057FF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  userInfo: {
    flex: 1,
  },
  userTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
  },
  userName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  userSubtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  userFollowers: {
    fontSize: 12,
    color: "#999",
  },
  followButton: {
    backgroundColor: "#0057FF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  schoolItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  schoolIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  schoolInfo: {
    flex: 1,
  },
  schoolTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
  },
  schoolName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  schoolLocation: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  schoolFollowers: {
    fontSize: 12,
    color: "#999",
  },
  resultsSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    fontWeight: "600",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  resultIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  resultInfo: {
    flex: 1,
  },
  resultTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  resultSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  resultMeta: {
    fontSize: 12,
    color: "#999",
  },
});
