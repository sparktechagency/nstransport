import "react-native-reanimated";

import * as SplashScreen from "expo-splash-screen";

import tw from "@/lib/tailwind";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// For showing a loading screen

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PoppinsBlack: require("../assets/fonts/Poppins/PoppinsBlack.ttf"),
    PoppinsBlackItalic: require("../assets/fonts/Poppins/PoppinsBlackItalic.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins/PoppinsBold.ttf"),
    PoppinsBoldItalic: require("../assets/fonts/Poppins/PoppinsBoldItalic.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins/PoppinsExtraBold.ttf"),
    PoppinsExtraBoldItalic: require("../assets/fonts/Poppins/PoppinsExtraBoldItalic.ttf"),
    PoppinsExtraLight: require("../assets/fonts/Poppins/PoppinsExtraLight.ttf"),
    PoppinsExtraLightItalic: require("../assets/fonts/Poppins/PoppinsExtraLightItalic.ttf"),
    PoppinsItalic: require("../assets/fonts/Poppins/PoppinsItalic.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins/PoppinsLight.ttf"),
    PoppinsLightItalic: require("../assets/fonts/Poppins/PoppinsLightItalic.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins/PoppinsMedium.ttf"),
    PoppinsMediumItalic: require("../assets/fonts/Poppins/PoppinsMediumItalic.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins/PoppinsRegular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins/PoppinsSemiBold.ttf"),
    PoppinsSemiBoldItalic: require("../assets/fonts/Poppins/PoppinsSemiBoldItalic.ttf"),
    PoppinsThin: require("../assets/fonts/Poppins/PoppinsThin.ttf"),
    PoppinsThinItalic: require("../assets/fonts/Poppins/PoppinsThinItalic.ttf"),
    // You can replace 'YourCustomFont' with your desired font
  });

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  return (
    <SafeAreaView style={tw`flex-1 pt-5 bg-base`}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack initialRouteName="vehicles/availablevehicles">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="vehicles/allvehicles"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="vehicles/availablevehicles"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="vehicles/sprinters"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="vehicles/trailers"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="vehicles/transporter"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="test" />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
        <StatusBar animated />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
