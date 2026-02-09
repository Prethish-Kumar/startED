import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            console.log("User logged out");
            // Navigate to auth screen
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log("Account deletion requested");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#C4F54D" }]}>
              <Ionicons name="person" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Edit Profile</Text>
              <Text style={styles.settingDescription}>
                Change your name, username, and bio
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#FFB6C1" }]}>
              <Ionicons name="lock-closed" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Change Password</Text>
              <Text style={styles.settingDescription}>
                Update your password
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#87CEEB" }]}>
              <Ionicons name="shield-checkmark" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Privacy</Text>
              <Text style={styles.settingDescription}>
                Manage who can see your content
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#FFD700" }]}>
              <Ionicons name="notifications" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.settingDescription}>
                Get notified about new posts and events
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#E0E0E0", true: "#0057FF" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#DDA0DD" }]}>
              <Ionicons name="mail" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Email Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive updates via email
              </Text>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: "#E0E0E0", true: "#0057FF" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>

          <View style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#98FB98" }]}>
              <Ionicons name="moon" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>
                Coming soon
              </Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              disabled
              trackColor={{ false: "#E0E0E0", true: "#0057FF" }}
              thumbColor="#fff"
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#FFB6C1" }]}>
              <Ionicons name="language" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Language</Text>
              <Text style={styles.settingDescription}>English</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Support</Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#87CEEB" }]}>
              <Ionicons name="help-circle" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Help Center</Text>
              <Text style={styles.settingDescription}>
                FAQs and support articles
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#C4F54D" }]}>
              <Ionicons name="chatbubbles" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Contact Us</Text>
              <Text style={styles.settingDescription}>
                Get in touch with our team
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#FFD700" }]}>
              <Ionicons name="bug" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Report a Problem</Text>
              <Text style={styles.settingDescription}>
                Let us know if something isn't working
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Legal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal & Policies</Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#DDA0DD" }]}>
              <Ionicons name="document-text" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Terms of Service</Text>
              <Text style={styles.settingDescription}>
                Read our terms and conditions
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#98FB98" }]}>
              <Ionicons name="shield-checkmark" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Privacy Policy</Text>
              <Text style={styles.settingDescription}>
                How we handle your data
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#FFB6C1" }]}>
              <Ionicons name="finger-print" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Cookie Policy</Text>
              <Text style={styles.settingDescription}>
                Learn about our cookie usage
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#87CEEB" }]}>
              <Ionicons name="people" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Community Guidelines</Text>
              <Text style={styles.settingDescription}>
                Rules for a safe community
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#C4F54D" }]}>
              <Ionicons name="information-circle" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>About StartED</Text>
              <Text style={styles.settingDescription}>
                Learn more about our mission
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <View style={[styles.iconContainer, { backgroundColor: "#FFD700" }]}>
              <Ionicons name="code-slash" size={20} color="#0057FF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>App Version</Text>
              <Text style={styles.settingDescription}>1.0.0 (Build 1)</Text>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleLogout}
          >
            <View style={[styles.iconContainer, { backgroundColor: "#FFE4E1" }]}>
              <Ionicons name="log-out" size={20} color="#FF3B30" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: "#FF3B30" }]}>
                Logout
              </Text>
              <Text style={styles.settingDescription}>
                Sign out of your account
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FF3B30" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleDeleteAccount}
          >
            <View style={[styles.iconContainer, { backgroundColor: "#FFE4E1" }]}>
              <Ionicons name="trash" size={20} color="#FF3B30" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: "#FF3B30" }]}>
                Delete Account
              </Text>
              <Text style={styles.settingDescription}>
                Permanently delete your account
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>

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
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: "#666",
  },
});
