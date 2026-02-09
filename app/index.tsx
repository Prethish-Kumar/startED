import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    // TODO: Add authentication logic here
    // Example future implementation:
    // const checkAuth = async () => {
    //   const isAuthenticated = await getAuthStatus();
    //   const isNewUser = await checkIfNewUser();
    //
    //   if (isAuthenticated) {
    //     router.replace("/(tabs)/feed");
    //   } else if (isNewUser) {
    //     router.replace("/onboarding/Onboarding");
    //   } else {
    //     router.replace("/auth/signup");
    //   }
    // };
    // checkAuth();

    // Small delay to ensure layout is mounted before navigation
    const timer = setTimeout(() => {
      router.replace("/onboarding/Onboarding");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Return null - the native splash screen will be visible during this brief moment
  return null;
}
