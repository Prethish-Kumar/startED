import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import EventCard from "../components/EventCard";

type Event = {
  id: string;
  eventName: string;
  venue: string;
  date: string;
  month: string;
  day: string;
  timings: string;
  description: string;
  color: string;
};

const EVENTS_DATA: Event[] = [
  {
    id: "1",
    eventName: "Science Fair 2026",
    venue: "Lincoln High School",
    date: "2026-02-15",
    month: "Feb",
    day: "15",
    timings: "10:00 AM - 4:00 PM",
    description:
      "Showcase your innovative science projects! Join students from across the city for an exciting day of discovery and learning.",
    color: "#C4F54D",
  },
  {
    id: "2",
    eventName: "Coding Workshop for Kids",
    venue: "Tech Hub Community Center",
    date: "2026-02-20",
    month: "Feb",
    day: "20",
    timings: "2:00 PM - 5:00 PM",
    description:
      "Learn the basics of coding with fun games and activities. Perfect for beginners! Bring your laptop and creativity.",
    color: "#FFB6C1",
  },
  {
    id: "3",
    eventName: "Art & Craft Competition",
    venue: "St. Mary's Academy",
    date: "2026-02-25",
    month: "Feb",
    day: "25",
    timings: "11:00 AM - 3:00 PM",
    description:
      "Express your creativity through art! Compete in various categories and win exciting prizes. All materials provided.",
    color: "#87CEEB",
  },
  {
    id: "4",
    eventName: "Robotics Challenge",
    venue: "Innovation Lab",
    date: "2026-03-05",
    month: "Mar",
    day: "05",
    timings: "9:00 AM - 2:00 PM",
    description:
      "Build and program robots to complete challenges! Team event for students passionate about technology and engineering.",
    color: "#FFD700",
  },
  {
    id: "5",
    eventName: "Sports Day Extravaganza",
    venue: "City Sports Complex",
    date: "2026-03-10",
    month: "Mar",
    day: "10",
    timings: "8:00 AM - 6:00 PM",
    description:
      "Participate in various sports and games! Track events, team sports, and fun activities for all ages and skill levels.",
    color: "#98FB98",
  },
  {
    id: "6",
    eventName: "Music & Dance Fest",
    venue: "Riverside Academy Auditorium",
    date: "2026-03-15",
    month: "Mar",
    day: "15",
    timings: "5:00 PM - 9:00 PM",
    description:
      "Show off your talent on stage! Performances include singing, dancing, and instrumental music. Open to all students.",
    color: "#DDA0DD",
  },
  {
    id: "7",
    eventName: "Environmental Cleanup Drive",
    venue: "Green Park",
    date: "2026-03-20",
    month: "Mar",
    day: "20",
    timings: "7:00 AM - 12:00 PM",
    description:
      "Make a difference! Join us in cleaning up our local park. Learn about environmental conservation and sustainability.",
    color: "#90EE90",
  },
];

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(EVENTS_DATA);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setFilteredEvents(EVENTS_DATA);
    } else {
      const filtered = EVENTS_DATA.filter(
        (event) =>
          event.eventName.toLowerCase().includes(text.toLowerCase()) ||
          event.venue.toLowerCase().includes(text.toLowerCase()) ||
          event.description.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const handleRegister = (eventId: string, eventName: string) => {
    console.log(`Registered for event: ${eventName}`);
    // Add registration logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Events" icon="notifications" />

      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Events List */}
        <ScrollView
          style={styles.eventsList}
          showsVerticalScrollIndicator={false}
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                eventName={event.eventName}
                venue={event.venue}
                date={event.date}
                month={event.month}
                day={event.day}
                timings={event.timings}
                description={event.description}
                color={event.color}
                onRegister={() => handleRegister(event.id, event.eventName)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No events found</Text>
              <Text style={styles.emptySubtext}>
                Try searching with different keywords
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 16,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  eventsList: {
    flex: 1,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: "#999",
  },
});
