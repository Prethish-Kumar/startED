import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Header from "../../components/Header";
import EventCard from "../../components/EventCard";
import EventDetailModal from "../../components/EventDetailModal";

type Event = {
  id: string;
  eventName: string;
  venue: string;
  location: string;
  category: string;
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
    location: "New York",
    category: "Science",
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
    location: "San Francisco",
    category: "Technology",
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
    location: "Boston",
    category: "Arts",
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
    location: "Seattle",
    category: "Technology",
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
    location: "Los Angeles",
    category: "Sports",
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
    location: "Chicago",
    category: "Arts",
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
    location: "Portland",
    category: "Community",
    date: "2026-03-20",
    month: "Mar",
    day: "20",
    timings: "7:00 AM - 12:00 PM",
    description:
      "Make a difference! Join us in cleaning up our local park. Learn about environmental conservation and sustainability.",
    color: "#90EE90",
  },
];

const CATEGORIES = ["All", "Technology", "Science", "Arts", "Sports", "Community"];
const LOCATIONS = ["All", "New York", "San Francisco", "Boston", "Seattle", "Los Angeles", "Chicago", "Portland"];

type TabType = "all" | "interested";

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [interestedEventIds, setInterestedEventIds] = useState<string[]>([]);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleInterested = (eventId: string) => {
    if (interestedEventIds.includes(eventId)) {
      setInterestedEventIds(interestedEventIds.filter((id) => id !== eventId));
    } else {
      setInterestedEventIds([...interestedEventIds, eventId]);
    }
  };

  const handleRegister = (eventId: string) => {
    setRegisteredEventIds([...registeredEventIds, eventId]);
  };

  const getFilteredEvents = () => {
    let filtered = EVENTS_DATA;

    // Filter by tab
    if (activeTab === "interested") {
      filtered = filtered.filter(
        (event) =>
          interestedEventIds.includes(event.id) ||
          registeredEventIds.includes(event.id)
      );
    }

    // Filter by search
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (event) =>
          event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((event) => event.category === selectedCategory);
    }

    // Filter by location
    if (selectedLocation !== "All") {
      filtered = filtered.filter((event) => event.location === selectedLocation);
    }

    return filtered;
  };

  const filteredEvents = getFilteredEvents();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Events"
        icon="notifications"
        onIconPress={() => router.push("/(tabs)/events/notifications")}
      />

      <View style={styles.content}>
        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "all" && styles.activeTab]}
            onPress={() => setActiveTab("all")}
          >
            <Ionicons
              name="calendar"
              size={18}
              color={activeTab === "all" ? "#fff" : "#666"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "all" && styles.activeTabText,
              ]}
            >
              All Events
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "interested" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("interested")}
          >
            <Ionicons
              name="heart"
              size={18}
              color={activeTab === "interested" ? "#fff" : "#666"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "interested" && styles.activeTabText,
              ]}
            >
              Interested ({interestedEventIds.length + registeredEventIds.length})
            </Text>
          </TouchableOpacity>
        </View>

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
          <TouchableOpacity
            style={styles.filterToggle}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons
              name="options"
              size={20}
              color={showFilters ? "#0057FF" : "#666"}
            />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        {showFilters && (
          <View style={styles.filtersContainer}>
            {/* Category Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Category</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterChips}
              >
                {CATEGORIES.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.filterChip,
                      selectedCategory === category &&
                        styles.filterChipActive,
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedCategory === category &&
                          styles.filterChipTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Location Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Location</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterChips}
              >
                {LOCATIONS.map((location) => (
                  <TouchableOpacity
                    key={location}
                    style={[
                      styles.filterChip,
                      selectedLocation === location &&
                        styles.filterChipActive,
                    ]}
                    onPress={() => setSelectedLocation(location)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedLocation === location &&
                          styles.filterChipTextActive,
                      ]}
                    >
                      {location}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Clear Filters */}
            {(selectedCategory !== "All" || selectedLocation !== "All") && (
              <TouchableOpacity
                style={styles.clearFilters}
                onPress={() => {
                  setSelectedCategory("All");
                  setSelectedLocation("All");
                }}
              >
                <Ionicons name="close-circle" size={16} color="#0057FF" />
                <Text style={styles.clearFiltersText}>Clear Filters</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

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
                onView={() => handleViewEvent(event)}
              />
            ))
          ) : activeTab === "interested" ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>😢</Text>
              <Text style={styles.emptyText}>
                No Interested Events Yet
              </Text>
              <Text style={styles.emptySubtext}>
                Start exploring events and mark the ones you're interested in!
              </Text>
              <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => setActiveTab("all")}
              >
                <Ionicons name="compass" size={20} color="#fff" />
                <Text style={styles.exploreButtonText}>Explore Events</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No events found</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your filters or search query
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          visible={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          eventName={selectedEvent.eventName}
          venue={selectedEvent.venue}
          date={selectedEvent.date}
          month={selectedEvent.month}
          day={selectedEvent.day}
          timings={selectedEvent.timings}
          description={selectedEvent.description}
          color={selectedEvent.color}
          isInterested={interestedEventIds.includes(selectedEvent.id)}
          isRegistered={registeredEventIds.includes(selectedEvent.id)}
          onInterested={() => handleInterested(selectedEvent.id)}
          onRegister={() => handleRegister(selectedEvent.id)}
        />
      )}
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
  tabContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  activeTab: {
    backgroundColor: "#0057FF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  filterToggle: {
    padding: 4,
  },
  filtersContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  filterChips: {
    flexDirection: "row",
    gap: 8,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  filterChipActive: {
    backgroundColor: "#0057FF",
    borderColor: "#0057FF",
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  filterChipTextActive: {
    color: "#fff",
  },
  clearFilters: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
  },
  clearFiltersText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0057FF",
  },
  eventsList: {
    flex: 1,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#0057FF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
