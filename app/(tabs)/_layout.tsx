import {
  IconCarFill,
  IconCarOutLine,
  IconHomeFil,
  IconHomeOutLine,
  IconSearchFill,
  IconSearchOutLine,
} from "@/icons/icons";
import { Text, View } from "react-native";

import tw from "@/lib/tailwind";
import { Tabs } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

export default function TabRoutes() {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,

          tabBarIcon(props) {
            return props.focused ? (
              <SvgXml xml={IconHomeFil} />
            ) : (
              <SvgXml xml={IconHomeOutLine} />
            );
          },
          tabBarStyle: tw`h-18 pt-3 shadow-lg `,
          //   tabBarItemStyle: tw`border-b-4 border-b-primary px-1 rounded-md`,

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

          tabBarIcon(props) {
            return props.focused ? (
              <SvgXml xml={IconSearchFill} />
            ) : (
              <SvgXml xml={IconSearchOutLine} />
            );
          },
          tabBarStyle: tw`h-18 pt-3 shadow-lg `,
          //   tabBarItemStyle: tw`border-b-4 border-b-primary px-1 rounded-md`,

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

          tabBarIcon(props) {
            return props.focused ? (
              <SvgXml xml={IconCarFill} />
            ) : (
              <SvgXml xml={IconCarOutLine} />
            );
          },
          tabBarStyle: tw`h-18 pt-3 shadow-lg `,
          //   tabBarItemStyle: tw`border-b-4 border-b-primary px-1 rounded-md`,

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
