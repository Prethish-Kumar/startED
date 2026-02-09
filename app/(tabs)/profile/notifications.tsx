import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import NotificationCard from "../../components/NotificationCard";

type Notification = {
  id: string;
  type: "like" | "comment" | "follow" | "event" | "achievement" | "mention";
  userName: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  day: string;
};

const NOTIFICATIONS: Notification[] = [
  // Today
  {
    id: "1",
    type: "like",
    userName: "Sarah Johnson",
    message: "liked your post about React Native development",
    timestamp: "5 minutes ago",
    isRead: false,
    day: "Today",
  },
  {
    id: "2",
    type: "comment",
    userName: "Michael Chen",
    message: "commented: 'This is amazing! Can you share the code?'",
    timestamp: "15 minutes ago",
    isRead: false,
    day: "Today",
  },
  {
    id: "3",
    type: "achievement",
    userName: "StartED",
    message: "You earned the 'Coding Champion' achievement! 🏆",
    timestamp: "1 hour ago",
    isRead: false,
    day: "Today",
  },
  {
    id: "4",
    type: "follow",
    userName: "Emma Wilson",
    message: "started following you",
    timestamp: "2 hours ago",
    isRead: true,
    day: "Today",
  },
  {
    id: "5",
    type: "event",
    userName: "StartED Events",
    message: "Reminder: Science Fair 2026 starts tomorrow at 10:00 AM",
    timestamp: "3 hours ago",
    isRead: true,
    day: "Today",
  },
  {
    id: "6",
    type: "mention",
    userName: "Alex Thompson",
    message: "mentioned you in a comment: 'Hey @You, check this out!'",
    timestamp: "4 hours ago",
    isRead: true,
    day: "Today",
  },

  // Yesterday
  {
    id: "7",
    type: "like",
    userName: "Priya Patel",
    message: "liked your science project photo",
    timestamp: "Yesterday at 8:30 PM",
    isRead: true,
    day: "Yesterday",
  },
  {
    id: "8",
    type: "comment",
    userName: "David Kim",
    message: "commented: 'Great work on the robotics project!'",
    timestamp: "Yesterday at 6:15 PM",
    isRead: true,
    day: "Yesterday",
  },
  {
    id: "9",
    type: "follow",
    userName: "Sofia Martinez",
    message: "started following you",
    timestamp: "Yesterday at 4:20 PM",
    isRead: true,
    day: "Yesterday",
  },
  {
    id: "10",
    type: "event",
    userName: "Lincoln High School",
    message: "posted a new event: Coding Workshop for Kids",
    timestamp: "Yesterday at 2:00 PM",
    isRead: true,
    day: "Yesterday",
  },

  // This Week
  {
    id: "11",
    type: "achievement",
    userName: "StartED",
    message: "You reached 1000 followers milestone! 🎉",
    timestamp: "2 days ago",
    isRead: true,
    day: "This Week",
  },
  {
    id: "12",
    type: "like",
    userName: "Ryan Davis",
    message: "and 15 others liked your post",
    timestamp: "3 days ago",
    isRead: true,
    day: "This Week",
  },
  {
    id: "13",
    type: "comment",
    userName: "Aisha Khan",
    message: "replied to your comment",
    timestamp: "4 days ago",
    isRead: true,
    day: "This Week",
  },
  {
    id: "14",
    type: "event",
    userName: "StartED Events",
    message: "You registered for Robotics Challenge",
    timestamp: "5 days ago",
    isRead: true,
    day: "This Week",
  },
  {
    id: "15",
    type: "follow",
    userName: "James Wilson",
    message: "and 3 others started following you",
    timestamp: "6 days ago",
    isRead: true,
    day: "This Week",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const handleBack = () => {
    router.back();
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const handleNotificationPress = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Group notifications by day
  const groupedNotifications = filteredNotifications.reduce((acc, notif) => {
    if (!acc[notif.day]) {
      acc[notif.day] = [];
    }
    acc[notif.day].push(notif);
    return acc;
  }, {} as Record<string, Notification[]>);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={handleMarkAllRead} style={styles.markAllButton}>
          <Ionicons name="checkmark-done" size={24} color="#0057FF" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, filter === "all" && styles.activeFilterTab]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[
              styles.filterTabText,
              filter === "all" && styles.activeFilterTabText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            filter === "unread" && styles.activeFilterTab,
          ]}
          onPress={() => setFilter("unread")}
        >
          <Text
            style={[
              styles.filterTabText,
              filter === "unread" && styles.activeFilterTabText,
            ]}
          >
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.keys(groupedNotifications).length > 0 ? (
          Object.entries(groupedNotifications).map(([day, notifs]) => (
            <View key={day}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayHeaderText}>{day}</Text>
              </View>
              {notifs.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  id={notification.id}
                  type={notification.type}
                  userName={notification.userName}
                  message={notification.message}
                  timestamp={notification.timestamp}
                  isRead={notification.isRead}
                  onPress={() => handleNotificationPress(notification.id)}
                />
              ))}
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="notifications-off" size={64} color="#E0E0E0" />
            </View>
            <Text style={styles.emptyText}>No notifications</Text>
            <Text style={styles.emptySubtext}>
              {filter === "unread"
                ? "You're all caught up! 🎉"
                : "We'll notify you when something happens"}
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Showing notifications from the last 7 days
          </Text>
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
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  badge: {
    backgroundColor: "#0057FF",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: "center",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  markAllButton: {
    padding: 4,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  activeFilterTab: {
    backgroundColor: "#0057FF",
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  activeFilterTabText: {
    color: "#fff",
  },
  content: {
    flex: 1,
  },
  dayHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f9f9f9",
  },
  dayHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
  },
});
