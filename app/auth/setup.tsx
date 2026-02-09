import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

type UserType = "student" | "institution" | null;
type Step = "role" | "details";

export default function Setup() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<Step>("role");
  const [userType, setUserType] = useState<UserType>(null);
  const [slideAnim] = useState(new Animated.Value(0));

  // Form fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [grade, setGrade] = useState("");
  const [city, setCity] = useState("");

  // Errors
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [gradeError, setGradeError] = useState("");
  const [cityError, setCityError] = useState("");

  const handleRoleSelect = (role: UserType) => {
    setUserType(role);
    // Slide out current content
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setStep("details");
      slideAnim.setValue(width);
      // Slide in details screen
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    } else if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (userType === "student") {
      if (!grade.trim()) {
        setGradeError("Grade is required");
        isValid = false;
      } else {
        setGradeError("");
      }
    } else if (userType === "institution") {
      if (!city.trim()) {
        setCityError("City is required");
        isValid = false;
      } else {
        setCityError("");
      }
    }

    return isValid;
  };

  const handleComplete = () => {
    if (validateForm()) {
      console.log("Setup complete:", {
        userType,
        name,
        username,
        grade: userType === "student" ? grade : undefined,
        city: userType === "institution" ? city : undefined,
      });
      // Navigate to suggested accounts
      router.replace("/auth/suggested-accounts");
    }
  };

  const handleBack = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setStep("role");
      setUserType(null);
      slideAnim.setValue(-width);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: "#0057FF",
          },
        ]}
      >
        <View style={[styles.heroContainer, { backgroundColor: "#0057FF" }]}>
          <Image
            source={require("../../assets/images/started_logo.png")}
            style={{
              width: 100,
              height: 100,
              marginBottom: 30,
            }}
          />
          <Image
            source={require("../../assets/images/onboard2.png")}
            style={{ width: 400, height: 400 }}
          />
        </View>

        <View style={[styles.cardContainer, { paddingBottom: insets.bottom }]}>
          <Animated.View
            style={[
              styles.formContainer,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            {step === "role" ? (
              <>
                <Text style={styles.heading}>Who are you?</Text>
                <Text style={styles.subText}>
                  Choose your account type to get started
                </Text>

                <View style={styles.roleContainer}>
                  <TouchableOpacity
                    style={styles.roleCard}
                    onPress={() => handleRoleSelect("student")}
                  >
                    <View style={styles.roleIcon}>
                      <Text style={styles.roleEmoji}>🎓</Text>
                    </View>
                    <Text style={styles.roleTitle}>Student</Text>
                    <Text style={styles.roleDesc}>
                      Share your journey and connect with peers
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.roleCard}
                    onPress={() => handleRoleSelect("institution")}
                  >
                    <View style={styles.roleIcon}>
                      <Text style={styles.roleEmoji}>🏫</Text>
                    </View>
                    <Text style={styles.roleTitle}>Institution</Text>
                    <Text style={styles.roleDesc}>
                      Showcase your school and engage with students
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                  <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>

                <Text style={styles.heading}>
                  {userType === "student"
                    ? "Student Profile"
                    : "Institution Profile"}
                </Text>
                <Text style={styles.subText}>
                  Tell us a bit about yourself
                </Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <TextInput
                    style={[styles.input, nameError ? styles.inputError : null]}
                    placeholder="Enter your name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                      if (nameError) setNameError("");
                    }}
                  />
                  {nameError ? (
                    <Text style={styles.errorText}>{nameError}</Text>
                  ) : null}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Username</Text>
                  <TextInput
                    style={[
                      styles.input,
                      usernameError ? styles.inputError : null,
                    ]}
                    placeholder="Choose a username"
                    placeholderTextColor="#999"
                    value={username}
                    onChangeText={(text) => {
                      setUsername(text.toLowerCase().replace(/[^a-z0-9_]/g, ""));
                      if (usernameError) setUsernameError("");
                    }}
                    autoCapitalize="none"
                  />
                  {usernameError ? (
                    <Text style={styles.errorText}>{usernameError}</Text>
                  ) : null}
                </View>

                {userType === "student" ? (
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Grade</Text>
                    <TextInput
                      style={[
                        styles.input,
                        gradeError ? styles.inputError : null,
                      ]}
                      placeholder="Enter your grade (e.g., 10th)"
                      placeholderTextColor="#999"
                      value={grade}
                      onChangeText={(text) => {
                        setGrade(text);
                        if (gradeError) setGradeError("");
                      }}
                    />
                    {gradeError ? (
                      <Text style={styles.errorText}>{gradeError}</Text>
                    ) : null}
                  </View>
                ) : (
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>City</Text>
                    <TextInput
                      style={[styles.input, cityError ? styles.inputError : null]}
                      placeholder="Enter your city"
                      placeholderTextColor="#999"
                      value={city}
                      onChangeText={(text) => {
                        setCity(text);
                        if (cityError) setCityError("");
                      }}
                    />
                    {cityError ? (
                      <Text style={styles.errorText}>{cityError}</Text>
                    ) : null}
                  </View>
                )}

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#0057FF" }]}
                  onPress={handleComplete}
                >
                  <Text style={styles.buttonText}>Complete Setup</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </Animated.View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0057FF",
  },
  heroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0057FF",
  },
  heading: {
    fontSize: 28,
    marginBottom: 10,
    color: "#000",
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    fontFamily: "Garet-Book",
    marginBottom: 30,
  },
  cardContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    padding: 20,
    paddingTop: 30,
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
  formContainer: {
    width: "100%",
  },
  roleContainer: {
    width: "100%",
    gap: 15,
  },
  roleCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#f5f5f5",
  },
  roleIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  roleEmoji: {
    fontSize: 35,
  },
  roleTitle: {
    fontSize: 22,
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
    color: "#000",
    marginBottom: 6,
  },
  roleDesc: {
    fontSize: 14,
    fontFamily: "Garet-Book",
    color: "#666",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Garet-Book",
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Garet-Book",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f5f5f5",
  },
  inputError: {
    borderColor: "#ff0000",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    fontSize: 12,
    color: "#ff0000",
    fontFamily: "Garet-Book",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#0057FF",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 20,
    width: "100%",
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
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 14,
    color: "#0057FF",
    fontFamily: "Garet-Book",
  },
});
