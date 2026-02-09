import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SuggestedAccount = {
  id: string;
  name: string;
  username: string;
  school: string;
  followersCount: number;
  isFollowing: boolean;
};

const SUGGESTED_ACCOUNTS: SuggestedAccount[] = [
  {
    id: "1",
    name: "Harwin Ramoj",
    username: "@harwin_codes",
    school: "Don Bosco School",
    followersCount: 1234,
    isFollowing: false,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    username: "@sarah_art",
    school: "Lincoln High School",
    followersCount: 856,
    isFollowing: false,
  },
  {
    id: "3",
    name: "Michael Chen",
    username: "@mike_robotics",
    school: "St. Mary's Academy",
    followersCount: 2103,
    isFollowing: false,
  },
  {
    id: "4",
    name: "Emma Wilson",
    username: "@emma_science",
    school: "Greenwood High",
    followersCount: 967,
    isFollowing: false,
  },
  {
    id: "5",
    name: "Alex Thompson",
    username: "@alex_music",
    school: "Riverside Academy",
    followersCount: 1542,
    isFollowing: false,
  },
  {
    id: "6",
    name: "Priya Patel",
    username: "@priya_writes",
    school: "Oxford International",
    followersCount: 723,
    isFollowing: false,
  },
];

export default function SuggestedAccounts() {
  const insets = useSafeAreaInsets();
  const [accounts, setAccounts] = useState(SUGGESTED_ACCOUNTS);

  const toggleFollow = (id: string) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === id
          ? { ...account, isFollowing: !account.isFollowing }
          : account
      )
    );
  };

  const handleContinue = () => {
    const followedCount = accounts.filter((a) => a.isFollowing).length;
    console.log(`Following ${followedCount} accounts`);
    router.replace("/(tabs)/feed");
  };

  const handleSkip = () => {
    router.replace("/(tabs)/feed");
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/started_logo.png")}
          style={{
            width: 50,
            height: 50,
          }}
        />
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.heading}>Suggested Accounts</Text>
        <Text style={styles.subText}>
          Follow accounts to personalize your feed
        </Text>

        <ScrollView
          style={styles.accountsList}
          showsVerticalScrollIndicator={false}
        >
          {accounts.map((account) => (
            <View key={account.id} style={styles.accountCard}>
              <View style={styles.accountInfo}>
                <View style={styles.avatar} />
                <View style={styles.accountDetails}>
                  <Text style={styles.accountName}>{account.name}</Text>
                  <Text style={styles.accountUsername}>{account.username}</Text>
                  <Text style={styles.accountSchool}>{account.school}</Text>
                  <Text style={styles.accountFollowers}>
                    {account.followersCount.toLocaleString()} followers
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.followButton,
                  account.isFollowing && styles.followingButton,
                ]}
                onPress={() => toggleFollow(account.id)}
              >
                <Text
                  style={[
                    styles.followButtonText,
                    account.isFollowing && styles.followingButtonText,
                  ]}
                >
                  {account.isFollowing ? "Following" : "Follow"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue to Feed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  skipText: {
    fontSize: 16,
    color: "#0057FF",
    fontFamily: "Garet-Book",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    marginBottom: 8,
    color: "#000",
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
  },
  subText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Garet-Book",
    marginBottom: 20,
  },
  accountsList: {
    flex: 1,
    marginBottom: 20,
  },
  accountCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  accountInfo: {
    flexDirection: "row",
    flex: 1,
    marginRight: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E0E0E0",
    marginRight: 12,
  },
  accountDetails: {
    flex: 1,
    justifyContent: "center",
  },
  accountName: {
    fontSize: 16,
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
    color: "#000",
    marginBottom: 2,
  },
  accountUsername: {
    fontSize: 13,
    fontFamily: "Garet-Book",
    color: "#0057FF",
    marginBottom: 4,
  },
  accountSchool: {
    fontSize: 12,
    fontFamily: "Garet-Book",
    color: "#666",
    marginBottom: 2,
  },
  accountFollowers: {
    fontSize: 11,
    fontFamily: "Garet-Book",
    color: "#999",
  },
  followButton: {
    backgroundColor: "#0057FF",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 100,
    alignItems: "center",
  },
  followButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
  },
  followingButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#0057FF",
  },
  followingButtonText: {
    color: "#0057FF",
  },
  continueButton: {
    backgroundColor: "#0057FF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 10,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
    textAlign: "center",
  },
});
