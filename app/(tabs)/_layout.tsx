import {
  IconCarFill,
  IconCarOutLine,
  IconHomeFil,
  IconHomeOutLine,
  IconSearchFill,
  IconSearchOutLine,
} from "@/icons/icons";
import { Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "@/redux/interface/interface";
import Icon from "@expo/vector-icons/Feather";
import React from "react";
import { SvgXml } from "react-native-svg";
import { Tabs } from "expo-router";
import tw from "@/lib/tailwind";

const TabBarButton = (props: any) => {
  return <TouchableOpacity {...props} />;
};

export default function TabRoutes() {
  const [user, setUser] = React.useState<IUser | null>(null);

  React.useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("user");
      setUser(JSON.parse(user));
    };
    getUser();
  }, []);

  // console.log(user);

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: tw`h-18 pt-2 pb-0 shadow-lg `,
        tabBarIconStyle: tw`hidden`,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarButton: TabBarButton,

          tabBarLabel(props) {
            return (
              <View
                style={tw`flex-1 w-full  flex-col justify-between items-center `}
              >
                <View style={tw`flex-1 items-center gap-1`}>
                  <View>
                    {props.focused ? (
                      <SvgXml height={20} width={20} xml={IconHomeFil} />
                    ) : (
                      <SvgXml height={20} width={20} xml={IconHomeOutLine} />
                    )}
                  </View>
                  <Text
                    style={[
                      props.focused
                        ? tw`text-primary font-PoppinsSemiBold text-sm pb-1`
                        : tw`text-black text-sm pb-1 font-PoppinsRegular`,
                      ,
                    ]}
                  >
                    Home
                  </Text>
                </View>
                <View
                  style={
                    props.focused
                      ? tw`bg-primary w-[80%] h-[.2rem] rounded-t-full `
                      : tw`bg-transparent w-[80%] h-[.2rem] rounded-t-full `
                  }
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarButton: TabBarButton,

          tabBarLabel(props) {
            return (
              <View
                style={tw`flex-1 w-full  flex-col justify-between items-center `}
              >
                <View style={tw`flex-1 items-center gap-1`}>
                  <View>
                    {props.focused ? (
                      <SvgXml height={20} width={20} xml={IconSearchFill} />
                    ) : (
                      <SvgXml height={20} width={20} xml={IconSearchOutLine} />
                    )}
                  </View>
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
                </View>
                <View
                  style={
                    props.focused
                      ? tw`bg-primary w-[80%] h-[.2rem] rounded-t-full `
                      : tw`bg-transparent w-[80%] h-[.2rem] rounded-t-full `
                  }
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="mange"
        options={{
          headerShown: false,
          tabBarButton: TabBarButton,

          tabBarLabel(props) {
            return (
              <View
                style={tw`flex-1 w-full  flex-col justify-between items-center `}
              >
                <View style={tw`flex-1 items-center gap-1`}>
                  <View>
                    {props.focused ? (
                      <SvgXml height={20} width={20} xml={IconCarFill} />
                    ) : (
                      <SvgXml height={20} width={20} xml={IconCarOutLine} />
                    )}
                  </View>
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
                </View>
                <View
                  style={
                    props.focused
                      ? tw`bg-primary w-[80%] h-[.2rem] rounded-t-full `
                      : tw`bg-transparent w-[80%] h-[.2rem] rounded-t-full `
                  }
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="user_mange"
        options={{
          headerShown: false,
          tabBarButton: TabBarButton,
          tabBarItemStyle: {
            display: user?.role === "Admin" ? "flex" : "none",
          },

          tabBarLabel(props) {
            return (
              <View
                style={tw`flex-1 w-full  flex-col justify-between items-center `}
              >
                <View style={tw`flex-1 items-center gap-1`}>
                  <View>
                    {props.focused ? (
                      <Icon name="user" size={24} color="#023c69" />
                    ) : (
                      <Icon name="user" size={24} color="#000" />
                    )}
                  </View>
                  <Text
                    style={[
                      props.focused
                        ? tw`text-primary font-PoppinsSemiBold text-sm pb-1`
                        : tw`text-black text-sm pb-1 font-PoppinsRegular`,
                      tw`flex-1`,
                    ]}
                  >
                    User
                  </Text>
                </View>
                <View
                  style={
                    props.focused
                      ? tw`bg-primary w-[80%] h-[.2rem] rounded-t-full `
                      : tw`bg-transparent w-[80%] h-[.2rem] rounded-t-full `
                  }
                />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
}
