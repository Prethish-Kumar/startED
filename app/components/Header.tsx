import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onIconPress?: () => void;
};

export default function Header({ title, icon, onIconPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>{title}</Text>

      {icon && (
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={onIconPress}
        >
          <Ionicons name={icon} size={24} color="#000" />
        </TouchableOpacity>
      )}
    </View>
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
  notificationButton: {
    padding: 4,
  },
});
