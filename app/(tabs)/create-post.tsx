import { SafeAreaView, Text, View } from "react-native";
import Header from "../components/Header";

export default function CreatePost() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="Create Post" icon="notifications" />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Create Post</Text>
      </View>
    </SafeAreaView>
  );
}
