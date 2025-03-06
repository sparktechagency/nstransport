import { IconArrayUpCorner, IconPlusWhite } from "@/icons/icons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import IwtButton from "@/lib/buttons/IwtButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";

const Data = [
  {
    id: 1,
    title: "Total Vehicle",
    amount: "20",
    color: "#D8FFF4",
    icon: require("@/assets/images/car.png"),
    route: "/vehicles/allvehicles",
  },
  {
    id: 2,
    title: "Available",
    amount: "10",
    color: "#E0F3FF",
    icon: require("@/assets/images/car1.png"),
    route: "/vehicles/availablevehicles",
  },
  {
    id: 3,
    title: "Booked",
    amount: "10",
    color: "#FFF6E7",
    icon: require("@/assets/images/car2.png"),
    route: "/vehicles/bookedvehicles",
  },
];

export default function home() {
  const router = useRouter();

  return (
    <View style={tw` flex-1 bg-base`}>
      <ScrollView contentContainerStyle={tw`gap-2 mx-4 mt-12`}>
        {Data?.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => {
                router.push(item.route as string);
              }}
              key={item.id}
              style={tw`bg-[${item.color}] w-full flex-row justify-around p-5 rounded-lg`}
            >
              <View style={tw`justify-center items-center gap-3 flex-1`}>
                <Text style={tw`flex-1 text-sm text-black font-PoppinsMedium`}>
                  {item.title}
                </Text>
                <Text style={tw`text-3xl text-black font-PoppinsSemiBold`}>
                  {item.amount}
                </Text>
              </View>

              <View style={tw`flex-1`}>
                <View style={tw` justify-end items-end  mr-10 `}>
                  <Image style={tw`h-16 w-16`} source={item.icon} />
                </View>
                <TouchableOpacity style={tw`absolute right-2 top-2`}>
                  <SvgXml xml={IconArrayUpCorner} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
        <IwtButton
          svg={IconPlusWhite}
          onPress={() => {
            router.push("/vehicles/addNewVehicle");
          }}
          title="Add vehicle"
          titleStyle={tw`font-PoppinsSemiBold`}
          containerStyle={tw`mt-4`}
        />
      </ScrollView>
      {/* <Link href={"/test"}>
        <Text>Test</Text>
      </Link> */}
    </View>
  );
}
