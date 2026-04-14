import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useStreak, MediaType } from "../../context/StreakContext";

export default function StreakCheckIn() {
  const { checkIn } = useStreak();
  const [selectedUri, setSelectedUri] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<MediaType | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const requestCameraPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please allow camera access to capture your daily check-in.",
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.8,
      mediaTypes: ["images"],
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedUri(result.assets[0].uri);
      setSelectedType("photo");
    }
  };

  const recordVideo = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.8,
      mediaTypes: ["videos"],
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedUri(result.assets[0].uri);
      setSelectedType("video");
    }
  };

  const handleUpload = async () => {
    if (!selectedUri || !selectedType) return;

    setIsUploading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsUploading(false);

    checkIn({
      date: new Date().toISOString().split("T")[0],
      mediaType: selectedType,
      uri: selectedUri,
    });

    Alert.alert(
      "Streak Complete!",
      "Your daily check-in has been recorded. Keep up the great work!",
      [
        {
          text: "Awesome!",
          onPress: () => router.back(),
        },
      ],
    );
  };

  const clearSelection = () => {
    setSelectedUri(null);
    setSelectedType(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Check-In</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.mainCard}>
          <View style={styles.flameRow}>
            <View style={styles.flameCircle}>
              <Ionicons name="flame" size={32} color="#FF9500" />
            </View>
            <View style={styles.flameCircleSmall}>
              <Ionicons name="flame" size={20} color="#FFD700" />
            </View>
            <View style={styles.flameCircle}>
              <Ionicons name="flame" size={32} color="#FF9500" />
            </View>
          </View>

          <Text style={styles.mainTitle}>
            {selectedUri ? "Looking Good!" : "Ready to Check In?"}
          </Text>
          <Text style={styles.mainSubtitle}>
            {selectedUri
              ? "Review your capture and submit your daily streak"
              : "Capture a moment from your day to maintain your streak"}
          </Text>

          {selectedUri ? (
            <View style={styles.previewSection}>
              <View style={styles.previewWrapper}>
                <Image source={{ uri: selectedUri }} style={styles.previewImage} resizeMode="contain" />
                <View style={styles.previewBadge}>
                  <Ionicons
                    name={selectedType === "photo" ? "image" : "videocam"}
                    size={14}
                    color="#fff"
                  />
                </View>
                {selectedType === "video" && (
                  <View style={styles.playIcon}>
                    <Ionicons name="play-circle" size={48} color="#fff" />
                  </View>
                )}
              </View>
              <TouchableOpacity style={styles.retakeButton} onPress={clearSelection}>
                <Ionicons name="refresh" size={18} color="#FF3B30" />
                <Text style={styles.retakeText}>Retake</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.captureSection}>
              <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
                <View style={[styles.captureIconWrap, { backgroundColor: "#C4F54D" }]}>
                  <Ionicons name="camera" size={28} color="#0057FF" />
                </View>
                <View style={styles.captureTextWrap}>
                  <Text style={styles.captureLabel}>Take Photo</Text>
                  <Text style={styles.captureHint}>Snap a picture</Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#ccc" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.captureButton} onPress={recordVideo}>
                <View style={[styles.captureIconWrap, { backgroundColor: "#FFB6C1" }]}>
                  <Ionicons name="videocam" size={28} color="#0057FF" />
                </View>
                <View style={styles.captureTextWrap}>
                  <Text style={styles.captureLabel}>Record Video</Text>
                  <Text style={styles.captureHint}>Capture 5-30 seconds</Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#ccc" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
          <Text style={styles.infoText}>
            Complete daily check-ins to build your streak
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.uploadButton,
            (!selectedUri || isUploading) && styles.uploadButtonDisabled,
          ]}
          onPress={handleUpload}
          disabled={!selectedUri || isUploading}
        >
          {isUploading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Ionicons name="cloud-upload" size={22} color="#fff" />
              <Text style={styles.uploadButtonText}>Submit Check-In</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  mainCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  flameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    gap: 8,
  },
  flameCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF3CD",
    justifyContent: "center",
    alignItems: "center",
  },
  flameCircleSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF9E6",
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000",
    marginBottom: 6,
    textAlign: "center",
  },
  mainSubtitle: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 12,
    lineHeight: 18,
  },
  previewSection: {
    alignItems: "center",
    width: "100%",
  },
  previewWrapper: {
    width: 240,
    height: 320,
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  previewImage: {
    flex: 1,
    width: "100%",
    borderRadius: 16,
  },
  previewBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  playIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -24 }, { translateY: -24 }],
  },
  retakeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  retakeText: {
    fontSize: 15,
    color: "#FF3B30",
    fontWeight: "600",
  },
  captureSection: {
    width: "100%",
    gap: 12,
  },
  captureButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee",
  },
  captureIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  captureTextWrap: {
    flex: 1,
    marginLeft: 12,
  },
  captureLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
    marginBottom: 2,
  },
  captureHint: {
    fontSize: 12,
    color: "#888",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
  },
  infoText: {
    fontSize: 12,
    color: "#666",
  },
  footer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#0057FF",
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: "#0057FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  uploadButtonDisabled: {
    backgroundColor: "#E0E0E0",
    shadowOpacity: 0,
    elevation: 0,
  },
  uploadButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
});
