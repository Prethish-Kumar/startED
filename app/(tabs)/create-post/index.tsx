import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import Header from "../../components/Header";

type MediaType = "photo" | "video" | "audio" | null;

type MediaItem = {
  uri: string;
  type: MediaType;
};

export default function CreatePost() {
  const [postText, setPostText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
  const [activeMediaType, setActiveMediaType] = useState<MediaType>(null);
  const maxCharacters = 500;

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please allow access to your photos to add media to your posts.",
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      const newMedia = result.assets.map((asset) => ({
        uri: asset.uri,
        type: "photo" as MediaType,
      }));
      setSelectedMedia([...selectedMedia, ...newMedia].slice(0, 5));
    }
  };

  const pickVideo = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedMedia([
        ...selectedMedia,
        { uri: result.assets[0].uri, type: "video" },
      ]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please allow camera access to take photos.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedMedia([
        ...selectedMedia,
        { uri: result.assets[0].uri, type: "photo" },
      ]);
    }
  };

  const removeMedia = (index: number) => {
    setSelectedMedia(selectedMedia.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (!postText.trim() && selectedMedia.length === 0) {
      Alert.alert(
        "Empty post",
        "Please add some text or media to create a post.",
      );
      return;
    }

    console.log("Creating post:", {
      text: postText,
      media: selectedMedia,
    });

    Alert.alert("Success! 🎉", "Your post has been created!", [
      {
        text: "OK",
        onPress: () => {
          setPostText("");
          setSelectedMedia([]);
          setActiveMediaType(null);
        },
      },
    ]);
  };

  const remainingChars = maxCharacters - postText.length;
  const isPostReady = postText.trim().length > 0 || selectedMedia.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Create Post"
        icon="notifications"
        onIconPress={() => router.push("/(tabs)/create-post/notifications")}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Text Input */}
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="What do you want to share? 💭"
              placeholderTextColor="#999"
              value={postText}
              onChangeText={setPostText}
              multiline
              maxLength={maxCharacters}
              textAlignVertical="top"
            />
            <Text
              style={[
                styles.characterCount,
                remainingChars < 50 && styles.characterCountWarning,
              ]}
            >
              {remainingChars} characters left
            </Text>
          </View>

          {/* Media Type Selector */}
          <View style={styles.mediaTypeContainer}>
            <Text style={styles.sectionTitle}>Add Media</Text>
            <View style={styles.mediaButtons}>
              <TouchableOpacity
                style={[
                  styles.mediaButton,
                  activeMediaType === "photo" && styles.mediaButtonActive,
                ]}
                onPress={() => {
                  setActiveMediaType("photo");
                  pickImage();
                }}
              >
                <View
                  style={[
                    styles.mediaIconCircle,
                    { backgroundColor: "#C4F54D" },
                  ]}
                >
                  <Ionicons name="image" size={24} color="#0057FF" />
                </View>
                <Text style={styles.mediaButtonText}>Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.mediaButton,
                  activeMediaType === "video" && styles.mediaButtonActive,
                ]}
                onPress={() => {
                  setActiveMediaType("video");
                  pickVideo();
                }}
              >
                <View
                  style={[
                    styles.mediaIconCircle,
                    { backgroundColor: "#FFB6C1" },
                  ]}
                >
                  <Ionicons name="videocam" size={24} color="#0057FF" />
                </View>
                <Text style={styles.mediaButtonText}>Video</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.mediaButton,
                  activeMediaType === "audio" && styles.mediaButtonActive,
                ]}
                onPress={() => {
                  setActiveMediaType("audio");
                  Alert.alert(
                    "Coming Soon",
                    "Audio recording feature coming soon!",
                  );
                }}
              >
                <View
                  style={[
                    styles.mediaIconCircle,
                    { backgroundColor: "#87CEEB" },
                  ]}
                >
                  <Ionicons name="mic" size={24} color="#0057FF" />
                </View>
                <Text style={styles.mediaButtonText}>Audio</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.mediaButton} onPress={takePhoto}>
                <View
                  style={[
                    styles.mediaIconCircle,
                    { backgroundColor: "#FFD700" },
                  ]}
                >
                  <Ionicons name="camera" size={24} color="#0057FF" />
                </View>
                <Text style={styles.mediaButtonText}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Selected Media Preview */}
          {selectedMedia.length > 0 && (
            <View style={styles.mediaPreviewContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Selected Media ({selectedMedia.length}/5)
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedMedia([])}
                  style={styles.clearButton}
                >
                  <Text style={styles.clearButtonText}>Clear All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.mediaPreviewScroll}
              >
                {selectedMedia.map((media, index) => (
                  <View key={index} style={styles.mediaPreviewItem}>
                    <Image
                      source={{ uri: media.uri }}
                      style={styles.mediaPreviewImage}
                    />
                    <TouchableOpacity
                      style={styles.removeMediaButton}
                      onPress={() => removeMedia(index)}
                    >
                      <Ionicons name="close-circle" size={24} color="#FF3B30" />
                    </TouchableOpacity>
                    {media.type === "video" && (
                      <View style={styles.videoIndicator}>
                        <Ionicons name="play-circle" size={32} color="#fff" />
                      </View>
                    )}
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Tips Section */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Quick Tips</Text>
            <Text style={styles.tipsText}>
              • Share your projects, achievements, or what you learned today
              {"\n"}• Be kind and respectful to everyone{"\n"}• You can add up
              to 5 photos or 1 video{"\n"}• Ask questions - the community is
              here to help!
            </Text>
          </View>
        </ScrollView>

        {/* Post Button */}
        <View style={styles.postButtonContainer}>
          <TouchableOpacity
            style={[
              styles.postButton,
              !isPostReady && styles.postButtonDisabled,
            ]}
            onPress={handlePost}
            disabled={!isPostReady}
          >
            <Text style={styles.postButtonText}>
              {isPostReady ? "Post Now 🚀" : "Add content to post"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
  },
  textInputContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: "#000",
    minHeight: 120,
    maxHeight: 200,
    borderWidth: 2,
    borderColor: "#f5f5f5",
  },
  characterCount: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 8,
  },
  characterCountWarning: {
    color: "#FF9500",
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  mediaTypeContainer: {
    marginBottom: 20,
  },
  mediaButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  mediaButton: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#f0f0f0",
  },
  mediaButtonActive: {
    borderColor: "#0057FF",
    backgroundColor: "#f0f7ff",
  },
  mediaIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  mediaButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  mediaPreviewContainer: {
    marginBottom: 20,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  clearButtonText: {
    fontSize: 12,
    color: "#FF3B30",
    fontWeight: "600",
  },
  mediaPreviewScroll: {
    flexDirection: "row",
  },
  mediaPreviewItem: {
    position: "relative",
    marginRight: 12,
  },
  mediaPreviewImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  removeMediaButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  videoIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
  tipsContainer: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },
  postButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  postButton: {
    backgroundColor: "#0057FF",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  postButtonDisabled: {
    backgroundColor: "#E0E0E0",
    shadowOpacity: 0,
    elevation: 0,
  },
  postButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
