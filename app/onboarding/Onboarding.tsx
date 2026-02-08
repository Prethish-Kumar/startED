import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Onboarding() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: "1",
      image: require("../../assets/images/onboard1.png"),
      title: "Welcome to starED ",
      text: "The professional network for students. Connect, showcase your achievements, and explore opportunities for growth.",
      backgroundColor: "#0057FF",
    },
    {
      id: "2",
      image: require("../../assets/images/onboard2.png"),
      title: "Build Your Network",
      text: "Meet like-minded students, find collaborators for projects, or just connect with peers who share your interests.",
      backgroundColor: "#D1E704",
    },
    {
      id: "3",
      image: require("../../assets/images/onboard3.png"),
      title: "Showcase Your Achievements",
      text: "Document projects, awards, and accomplishments. All in one professional digital portfolio.",
      backgroundColor: "#FF0457",
    },
    {
      id: "4",
      image: require("../../assets/images/onboard4.png"),
      title: "Discover Events",
      text: "Stay informed about workshops, competitions, culturals and programs that can enhance your skills and profile.",
      backgroundColor: "#D1E704",
    },
  ];

  const next = () => {
    if (currentIndex === 3) {
      console.log("Navigate to main app or home screen");
      router.replace("/splash");
      return;
    }
    if (currentIndex < slides.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      flatListRef.current?.scrollToIndex({
        index: newIndex,
        animated: true,
      });
    }
  };

  const back = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      flatListRef.current?.scrollToIndex({
        index: newIndex,
        animated: true,
      });
    }
  };

  const skip = () => {
    const newIndex = slides.length - 1;
    setCurrentIndex(newIndex);
    flatListRef.current?.scrollToIndex({
      index: newIndex,
      animated: true,
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor: slides[currentIndex].backgroundColor,
        },
      ]}
    >
      <View
        style={[
          styles.topBar,
          {
            top: insets.top + 10,
            width,
          },
        ]}
      >
        <TouchableOpacity
          onPress={back}
          disabled={currentIndex === 0}
          style={{ opacity: currentIndex === 0 ? 0.4 : 1 }}
        >
          <Text style={styles.topBarText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={skip}
          disabled={currentIndex === slides.length - 1}
          style={{ opacity: currentIndex === slides.length - 1 ? 0.4 : 1 }}
        >
          <Text style={styles.topBarText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.heroContainer,
          { backgroundColor: slides[currentIndex].backgroundColor },
        ]}
      >
        <Image
          source={require("../../assets/images/started_logo.png")}
          style={{
            width: 100,
            height: 100,
            marginBottom: 30,
          }}
        />

        <FlatList
          style={{ height: 400 }}
          ref={flatListRef}
          data={slides}
          horizontal
          pagingEnabled
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={(event) => {
            const index = Math.floor(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
          renderItem={({ item }) => (
            <View style={{ width, alignItems: "center" }}>
              <Image source={item.image} style={{ width: 400, height: 400 }} />
            </View>
          )}
        />
      </View>

      <View style={[styles.cardContainer, { paddingBottom: insets.bottom }]}>
        <Text style={styles.heading}>{slides[currentIndex].title}</Text>
        <Text style={[styles.text]}>{slides[currentIndex].text}</Text>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: slides[currentIndex].backgroundColor },
          ]}
          onPress={next}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0057FF",
  },
  topBar: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  topBarText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Garet-Book",
  },
  heroContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0057FF",
  },
  heading: {
    fontSize: 32,
    marginBottom: 20,
    color: "#000",
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "#000",
    fontFamily: "Garet-Book",
  },
  cardContainer: {
    flex: 2,
    marginTop: -60,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  button: {
    backgroundColor: "#0057FF",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
    textAlign: "center",
  },
});
