import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="create-post"
        options={{
          title: "Create Post",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
