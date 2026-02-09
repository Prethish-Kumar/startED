import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Signup() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  const slideAnim = useState(new Animated.Value(0))[0];
  const otpRefs = useRef<Array<TextInput | null>>([]);

  const validatePhone = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneNumber) {
      setPhoneError("Phone number is required");
      return false;
    }
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Please enter a valid 10-digit phone number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleSendOTP = () => {
    if (validatePhone()) {
      // Slide out current content
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setStep("otp");
        slideAnim.setValue(width);
        // Slide in OTP screen
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          // Auto-focus first OTP input
          setTimeout(() => otpRefs.current[0]?.focus(), 100);
        });
      });
      console.log("Sending OTP to:", phoneNumber);
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    // Only allow numbers
    if (text && !/^[0-9]$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (otpError) setOtpError("");

    // Auto-focus next input
    if (text && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all digits are filled
    if (text && index === 5) {
      const otpString = newOtp.join("");
      if (otpString.length === 6) {
        setTimeout(() => {
          // Validate and verify using the updated OTP string
          if (otpString === "123456") {
            console.log("OTP verified successfully");
            router.replace("/(tabs)/profile");
          } else {
            setOtpError("Invalid OTP. Try 123456");
          }
        }, 100);
      }
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setOtpError("Please enter complete 6-digit OTP");
      return;
    }
    if (otpString !== "123456") {
      setOtpError("Invalid OTP. Try 123456");
      return;
    }
    console.log("OTP verified successfully");
    // Navigate to next screen
    router.replace("/(tabs)/profile");
  };

  const handleResendOTP = () => {
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    console.log("Resending OTP to:", phoneNumber);
    // Focus first input after resend
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleBackToPhone = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setStep("phone");
      setOtp(["", "", "", "", "", ""]);
      setOtpError("");
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
            source={require("../../assets/images/onboard1.png")}
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
            {step === "phone" ? (
              <>
                <Text style={styles.heading}>Enter Your Phone Number</Text>
                <Text style={styles.subText}>
                  We'll send you a verification code
                </Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <View style={styles.phoneInputWrapper}>
                    <Text style={styles.countryCode}>+91</Text>
                    <TextInput
                      style={[
                        styles.input,
                        phoneError ? styles.inputError : null,
                      ]}
                      placeholder="Enter phone number"
                      placeholderTextColor="#999"
                      keyboardType="phone-pad"
                      maxLength={10}
                      value={phoneNumber}
                      onChangeText={(text) => {
                        setPhoneNumber(text);
                        if (phoneError) setPhoneError("");
                      }}
                    />
                  </View>
                  {phoneError ? (
                    <Text style={styles.errorText}>{phoneError}</Text>
                  ) : null}
                </View>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#0057FF" }]}
                  onPress={handleSendOTP}
                >
                  <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={handleBackToPhone}
                  style={styles.backButton}
                >
                  <Text style={styles.backButtonText}>← Change Number</Text>
                </TouchableOpacity>

                <Text style={styles.heading}>Enter OTP</Text>
                <Text style={styles.subText}>
                  Code sent to +91 {phoneNumber}
                </Text>

                <View style={styles.inputContainer}>
                  <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                      <TextInput
                        key={index}
                        ref={(ref) => (otpRefs.current[index] = ref)}
                        style={[
                          styles.otpBox,
                          otpError ? styles.otpBoxError : null,
                          digit ? styles.otpBoxFilled : null,
                        ]}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        onKeyPress={(e) => handleOtpKeyPress(e, index)}
                        selectTextOnFocus
                      />
                    ))}
                  </View>
                  {otpError ? (
                    <Text style={styles.errorText}>{otpError}</Text>
                  ) : null}
                </View>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#0057FF" }]}
                  onPress={handleVerifyOTP}
                >
                  <Text style={styles.buttonText}>Verify OTP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.resendButton}
                  onPress={handleResendOTP}
                >
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              </>
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
  phoneInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryCode: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Garet-Book",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginRight: 10,
  },
  input: {
    flex: 1,
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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  otpBox: {
    width: 50,
    height: 55,
    fontSize: 24,
    color: "#000",
    fontFamily: "Garet-Heavy",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#f5f5f5",
  },
  otpBoxFilled: {
    borderColor: "#0057FF",
    backgroundColor: "#fff",
  },
  otpBoxError: {
    borderColor: "#ff0000",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    fontSize: 12,
    color: "#ff0000",
    fontFamily: "Garet-Book",
    marginTop: 5,
  },
  hintText: {
    fontSize: 12,
    color: "#999",
    fontFamily: "Garet-Book",
    marginTop: 5,
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#0057FF",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 10,
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
  resendButton: {
    marginTop: 15,
    alignSelf: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#0057FF",
    fontFamily: "Garet-Book",
    textDecorationLine: "underline",
  },
});
