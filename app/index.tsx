import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>

      <Pressable
        onPress={() => router.replace("/onboarding/Onboarding")}
        style={{
          marginTop: 20,
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: "#000",
          borderRadius: 6,
        }}
      >
        <Text style={{ color: "#fff" }}>Click me</Text>
      </Pressable>
    </View>
  );
}
