import {
  IconCarFill,
  IconCarOutLine,
  IconHomeFil,
  IconHomeOutLine,
  IconSearchFill,
  IconSearchOutLine,
} from "@/icons/icons";
import { Text, TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import { Tabs } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

const TabBarButton = (props: any) => {
  return <TouchableOpacity {...props} />;
};

export default function TabRoutes() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: tw`h-18  pt-3 pb-0 shadow-lg `,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarButton: TabBarButton,
          tabBarIcon(props) {
            return props.focused ? (
              <SvgXml xml={IconHomeFil} />
            ) : (
              <SvgXml xml={IconHomeOutLine} />
            );
          },
          // tabBarStyle: tw` pt-3 shadow-lg `,
          // // tabBarItemStyle: tw`border-b-4 border-b-primary px-1 rounded-md`,

          tabBarLabel(props) {
            return (
              <>
                <Text
                  style={[
                    props.focused
                      ? tw`text-primary font-PoppinsSemiBold text-sm pb-1`
                      : tw`text-black text-sm pb-1 font-PoppinsRegular`,
                    tw`flex-1`,
                  ]}
                >
                  Home
                </Text>
                <View
                  style={
                    props.focused
                      ? tw`bg-primary w-[80%] h-[.3rem] rounded-t-full `
                      : tw`bg-transparent w-[80%] h-[.3rem] rounded-t-full `
                  }
                />
              </>
            );
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarButton: TabBarButton,
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
                  style={[
                    props.focused
                      ? tw`text-primary font-PoppinsSemiBold text-sm pb-1`
                      : tw`text-black text-sm pb-1 font-PoppinsRegular`,
                    tw`flex-1`,
                  ]}
                >
                  Search
                </Text>
                <View
                  style={
                    props.focused
                      ? tw`bg-primary w-[80%] h-[.3rem] rounded-t-full `
                      : tw`bg-transparent w-[80%] h-[.3rem] rounded-t-full `
                  }
                />
              </>
            );
          },
        }}
      />
      <Tabs.Screen
        name="mange"
        options={{
          headerShown: false,
          tabBarButton: TabBarButton,
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
                  style={[
                    props.focused
                      ? tw`text-primary font-PoppinsSemiBold text-sm pb-1`
                      : tw`text-black text-sm pb-1 font-PoppinsRegular`,
                    tw`flex-1`,
                  ]}
                >
                  Mange
                </Text>
                <View
                  style={
                    props.focused
                      ? tw`bg-primary w-[80%] h-[.3rem] rounded-t-full `
                      : tw`bg-transparent w-[80%] h-[.3rem] rounded-t-full `
                  }
                />
              </>
            );
          },
        }}
      />
    </Tabs>
  );
}
