import { IconArrayUpCorner, IconPlusWhite } from "@/icons/icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import IwtButton from "@/lib/buttons/IwtButton";
import tw from "@/lib/tailwind";
import { useGetStatisticQuery } from "@/redux/apiSlices/homeApiSlices";
import { PrimaryColor } from "@/utils/utils";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";

export default function home() {
  const router = useRouter();

  const {
    data: statistic,
    isLoading,
    isFetching,
    refetch,
  } = useGetStatisticQuery({});

  const [Data, setData] = useState<any>([
    {
      id: 1,
      title: "Total Vehicle",

      color: "#D8FFF4",
      icon: require("@/assets/images/car.png"),
      route: "/vehicles/allvehicles",
    },
    {
      id: 2,
      title: "Available",

      color: "#E0F3FF",
      icon: require("@/assets/images/car1.png"),
      route: "/vehicles/availablevehicles",
    },
    {
      id: 3,
      title: "Booked",

      color: "#FFF6E7",
      icon: require("@/assets/images/car2.png"),
      route: "/vehicles/bookedvehicles",
    },
  ]);

  useEffect(() => {
    setData([
      {
        id: 1,
        title: "Total Vehicle",
        amount: statistic?.data?.total_vehicle,
        color: "#D8FFF4",
        icon: require("@/assets/images/car.png"),
        route: "/vehicles/allvehicles",
      },
      {
        id: 2,
        title: "Available",
        amount: statistic?.data?.available,
        color: "#E0F3FF",
        icon: require("@/assets/images/car1.png"),
        route: "/vehicles/availablevehicles",
      },
      {
        id: 3,
        title: "Booked",
        amount: statistic?.data?.booked,
        color: "#FFF6E7",
        icon: require("@/assets/images/car2.png"),
        route: "/vehicles/bookedvehicles",
      },
    ]);
  }, [statistic]);

  return (
    <View style={tw` flex-1 bg-base`}>
      {/* {(isLoading || isFetching) && <Loading />} */}

      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[PrimaryColor]}
            refreshing={isFetching}
            onRefresh={refetch}
          />
        }
        contentContainerStyle={tw`gap-2 mx-4 mt-12`}
      >
        {Data?.map((item: any) => {
          return (
            <TouchableOpacity
              onPress={() => {
                router.push(item.route as string);
              }}
              key={item.id}
              style={tw`bg-[${item.color}] w-full flex-row justify-around p-5 rounded-lg`}
            >
              <View style={tw`justify-center items-center gap-3 flex-1`}>
                <Text style={tw` text-sm text-black font-PoppinsMedium`}>
                  {item.title}
                </Text>
                {isFetching || isLoading ? (
                  <ActivityIndicator size={"small"} color={PrimaryColor} />
                ) : (
                  <Text style={tw`text-3xl text-black font-PoppinsSemiBold`}>
                    {item?.amount}
                  </Text>
                )}
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
