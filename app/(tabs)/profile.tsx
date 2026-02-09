import { SafeAreaView, Text, View } from "react-native";
import Header from "../components/Header";

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="Profile" icon="settings" />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Profile</Text>
      </View>
    </SafeAreaView>
  );
}
