import { SafeAreaView, Text, View } from "react-native";
import Header from "../components/Header";

export default function Events() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="Events" icon="notifications" />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Events</Text>
      </View>
    </SafeAreaView>
  );
}
