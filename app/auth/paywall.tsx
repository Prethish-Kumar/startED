import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.75;
const CARD_HEIGHT = 340;

type BillingPeriod = "monthly" | "yearly";

interface Tier {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  perks: string[];
  recommended?: boolean;
  accentColor: string;
}

const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 999,
    yearlyPrice: 7999,
    perks: ["5GB Storage", "Basic Analytics", "Email Support", "100 Students"],
    accentColor: "#6B7280",
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: 2499,
    yearlyPrice: 19999,
    perks: [
      "25GB Storage",
      "Advanced Analytics",
      "Priority Support",
      "1000 Students",
      "Custom Branding",
    ],
    recommended: true,
    accentColor: "#0057FF",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 4999,
    yearlyPrice: 39999,
    perks: [
      "Unlimited Storage",
      "Full Analytics Suite",
      "24/7 Dedicated Support",
      "Unlimited Students",
      "API Access",
    ],
    accentColor: "#7C3AED",
  },
];

export default function Paywall() {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [selectedTier, setSelectedTier] = useState<string>("growth");

  const handleTierChange = (tierId: string, index: number) => {
    setSelectedTier(tierId);
    scrollRef.current?.scrollTo({
      x: index * (CARD_WIDTH + 16),
      animated: true,
    });
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const cardTotalWidth = CARD_WIDTH + 16;
    const currentIndex = Math.round(offsetX / cardTotalWidth);
    const tier = TIERS[currentIndex];
    if (tier && tier.id !== selectedTier) {
      setSelectedTier(tier.id);
    }
  };

  const handleContinue = () => {
    const tier = TIERS.find((t) => t.id === selectedTier);
    console.log("Selected plan:", {
      tier: tier?.name,
      billingPeriod,
      price: billingPeriod === "monthly" ? tier?.monthlyPrice : tier?.yearlyPrice,
    });
    router.replace("/auth/suggested-accounts");
  };

  const handleSkip = () => {
    console.log("Skipped paywall");
    router.replace("/auth/suggested-accounts");
  };

  const getPrice = (tier: Tier) => {
    return billingPeriod === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;
  };

  const yearlyDiscount = 20;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.headerSection}>
          <Image
            source={require("../../assets/images/started_logo.png")}
            style={styles.logo}
          />
          <Text style={styles.heroTitle}>Choose Your Plan</Text>
          <Text style={styles.heroSubtitle}>
            Unlock premium features for your institution
          </Text>
        </View>

        <View style={[styles.cardContainer, { paddingBottom: insets.bottom }]}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                billingPeriod === "monthly" && styles.tabActive,
              ]}
              onPress={() => setBillingPeriod("monthly")}
            >
              <Text
                style={[
                  styles.tabText,
                  billingPeriod === "monthly" && styles.tabTextActive,
                ]}
              >
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                billingPeriod === "yearly" && styles.tabActive,
              ]}
              onPress={() => setBillingPeriod("yearly")}
            >
              <View style={styles.tabContent}>
                <Text
                  style={[
                    styles.tabText,
                    billingPeriod === "yearly" && styles.tabTextActive,
                  ]}
                >
                  Yearly
                </Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Save {yearlyDiscount}%</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tiersContentContainer}
            decelerationRate="fast"
            snapToInterval={CARD_WIDTH + 16}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {TIERS.map((tier, index) => (
              <TouchableOpacity
                key={tier.id}
                style={[
                  styles.tierCard,
                  selectedTier === tier.id && styles.tierCardSelected,
                ]}
                onPress={() => handleTierChange(tier.id, index)}
                activeOpacity={0.9}
              >
                <View
                  style={[
                    styles.cardAccentBar,
                    { backgroundColor: tier.accentColor },
                  ]}
                />
                {tier.recommended && (
                  <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedBadgeText}>Recommended</Text>
                  </View>
                )}
                <Text style={[styles.tierName, { color: tier.accentColor }]}>
                  {tier.name}
                </Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.currency}>₹</Text>
                  <Text style={styles.price}>
                    {getPrice(tier).toLocaleString()}
                  </Text>
                </View>
                <Text style={styles.period}>
                  /{billingPeriod === "monthly" ? "month" : "year"}
                </Text>
                {billingPeriod === "yearly" && (
                  <Text style={styles.monthlyEquivalent}>
                    ₹{(tier.yearlyPrice / 12).toFixed(0)}/month
                  </Text>
                )}
                <View style={styles.divider} />
                <View style={styles.perksContainer}>
                  {tier.perks.map((perk, index) => (
                    <View key={index} style={styles.perkRow}>
                      <Text style={[styles.perkCheck, { color: tier.accentColor }]}>
                        ✓
                      </Text>
                      <Text style={styles.perkText}>{perk}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.paginationContainer}>
            {TIERS.map((tier, index) => (
              <TouchableOpacity
                key={tier.id}
                onPress={() => handleTierChange(tier.id, index)}
                style={styles.paginationDotTouchable}
              >
                <View
                  style={[
                    styles.paginationDot,
                    selectedTier === tier.id && styles.paginationDotActive,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#0057FF" }]}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>
              Continue with {TIERS.find((t) => t.id === selectedTier)?.name}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Not now</Text>
          </TouchableOpacity>
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
  headerSection: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 24,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.85)",
    fontFamily: "Garet-Book",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 28,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 6,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tabText: {
    fontSize: 15,
    color: "#6B7280",
    fontFamily: "Garet-Book",
  },
  tabTextActive: {
    color: "#111827",
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
  },
  badge: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    color: "#fff",
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
  },
  tiersContentContainer: {
    paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2 - 8,
    paddingVertical: 8,
  },
  tierCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "#FAFAFA",
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    position: "relative",
    overflow: "hidden",
  },
  tierCardSelected: {
    borderColor: "#0057FF",
    backgroundColor: "#F8FAFF",
  },
  cardAccentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  recommendedBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#0057FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  recommendedBadgeText: {
    fontSize: 11,
    color: "#fff",
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
  },
  tierName: {
    fontSize: 26,
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 2,
  },
  currency: {
    fontSize: 22,
    color: "#111827",
    fontFamily: "Garet-Heavy",
    marginRight: 2,
  },
  price: {
    fontSize: 36,
    color: "#111827",
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
  },
  period: {
    fontSize: 14,
    color: "#9CA3AF",
    fontFamily: "Garet-Book",
    marginBottom: 4,
  },
  monthlyEquivalent: {
    fontSize: 13,
    color: "#6B7280",
    fontFamily: "Garet-Book",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  perksContainer: {
    gap: 10,
  },
  perkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  perkCheck: {
    fontSize: 14,
    fontFamily: "Garet-Heavy",
    width: 20,
  },
  perkText: {
    fontSize: 14,
    color: "#374151",
    fontFamily: "Garet-Book",
    flex: 1,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  paginationDotTouchable: {
    padding: 4,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
  },
  paginationDotActive: {
    backgroundColor: "#0057FF",
    width: 24,
  },
  button: {
    backgroundColor: "#0057FF",
    paddingVertical: 18,
    borderRadius: 30,
    width: "100%",
    shadowColor: "#0057FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Garet-Heavy",
    fontWeight: "700",
    textAlign: "center",
  },
  skipButton: {
    marginTop: 16,
    marginBottom: 8,
    alignSelf: "center",
    paddingVertical: 8,
  },
  skipButtonText: {
    fontSize: 15,
    color: "#9CA3AF",
    fontFamily: "Garet-Book",
  },
});