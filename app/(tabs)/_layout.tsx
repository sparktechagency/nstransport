import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  IconCarFill,
  IconCarOutLine,
  IconHomeFil,
  IconHomeOutLine,
  IconSearchFill,
  IconSearchOutLine,
} from "@/icons/icons";

import React from "react";
import { SvgXml } from "react-native-svg";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import { WIDTH } from "@/utils/utils";
import tw from "@/lib/tailwind";

const TAB_WIDTH = WIDTH / 3;
export default function TabRoutes() {
  const tabIndicatorPosition = useSharedValue(0); // Track tab position

  // Define animated style for the indicator
  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(tabIndicatorPosition.value, { duration: 300 }) },
    ],
  }));

  return (
    <>
      <Tabs
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          tabBarStyle: tw`h-18 pb-1 pt-3 shadow-lg `,
        }}
      >
        <Tabs.Screen
          name="index"
          listeners={{
            tabPress: () => {
              tabIndicatorPosition.value = 0;
            },
          }}
          options={{
            tabBarIcon(props) {
              return props.focused ? (
                <SvgXml xml={IconHomeFil} />
              ) : (
                <SvgXml xml={IconHomeOutLine} />
              );
            },

            tabBarLabel(props) {
              return (
                <>
                  <Text
                    style={
                      props.focused
                        ? tw`text-primary font-PoppinsSemiBold text-sm pb-1`
                        : tw`text-black text-sm pb-1 font-PoppinsRegular`
                    }
                  >
                    Home
                  </Text>
                </>
              );
            },
          }}
        />
        <Tabs.Screen
          listeners={{
            tabPress: () => {
              tabIndicatorPosition.value = TAB_WIDTH;
            },
          }}
          name="search"
          options={{
            tabBarIcon(props) {
              return props.focused ? (
                <SvgXml xml={IconSearchFill} />
              ) : (
                <SvgXml xml={IconSearchOutLine} />
              );
            },

            tabBarLabel(props) {
              return (
                <>
                  <Text
                    style={
                      props.focused
                        ? tw`text-primary font-PoppinsSemiBold text-sm pb-1`
                        : tw`text-black text-sm pb-1 font-PoppinsRegular`
                    }
                  >
                    Search
                  </Text>
                </>
              );
            },
          }}
        />
        <Tabs.Screen
          listeners={{
            tabPress: () => {
              tabIndicatorPosition.value = TAB_WIDTH * 2;
            },
          }}
          name="mange"
          options={{
            tabBarIcon(props) {
              return props.focused ? (
                <SvgXml xml={IconCarFill} />
              ) : (
                <SvgXml xml={IconCarOutLine} />
              );
            },

            tabBarLabel(props) {
              return (
                <>
                  <Text
                    style={
                      props.focused
                        ? tw`text-primary font-PoppinsSemiBold text-sm pb-1`
                        : tw`text-black text-sm pb-1 font-PoppinsRegular`
                    }
                  >
                    Mange
                  </Text>
                </>
              );
            },
          }}
        />
      </Tabs>
      <Animated.View
        style={[
          tw`absolute bottom-0 bg-primary left-[1.1rem]  h-[.3rem] w-[25%] rounded-t-full `,

          animatedIndicatorStyle,
        ]}
      />
    </>
  );
}
