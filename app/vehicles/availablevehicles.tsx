import React, { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import tw from "@/lib/tailwind";
import { useGetSearchVehicleQuery } from "@/redux/apiSlices/homeApiSlices";
import { PrimaryColor } from "@/utils/utils";
import { useRouter } from "expo-router";

export default function availablevehicles() {
  const router = useRouter();

  const [Data, setData] = useState<any[]>([]);

  const {
    data: Sprinter,
    isFetching: SprinterFetching,
    isLoading: SprinterLoading,
    refetch: SprinterRefetch,
  } = useGetSearchVehicleQuery({
    category: "Sprinter",
    type: "available",
  });
  const {
    data: Transporter,
    isFetching: TransporterFetching,
    isLoading: TransporterLoading,
    refetch: TransporterRefetch,
  } = useGetSearchVehicleQuery({
    category: "Car Transporter",
    type: "available",
  });
  const {
    data: Trailer,
    isFetching: TrailerFetching,
    isLoading: TrailerLoading,
    refetch: TrailerRefetch,
  } = useGetSearchVehicleQuery({
    category: "Trailer",
    type: "available",
  });

  // console.log(Sprinter);

  useEffect(() => {
    if (!SprinterFetching && !TransporterFetching && !TrailerFetching) {
      setData([
        {
          id: 1,
          title: "Sprinters",
          amount: Sprinter?.data?.length,
          color: "#FFF5E3",
          icon: require("@/assets/images/sprinter.png"),
          route: "/vehicles/sprinters",
        },
        {
          id: 2,
          title: "Car Transporter",
          amount: Transporter?.data?.length,
          color: "#FFE0E3",
          icon: require("@/assets/images/transporter.png"),
          route: "/vehicles/transporter",
        },
        {
          id: 3,
          title: "Trailers",
          amount: Trailer?.data?.length,
          color: "#DDEEFF",
          icon: require("@/assets/images/trailer.png"),
          route: "/vehicles/trailers",
        },
      ]);
    }
  }, [SprinterFetching, TransporterFetching, TrailerFetching]);

  return (
    <View style={tw` flex-1 bg-base`}>
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        title={`Available vehicles - ${
          (Sprinter?.data?.length ? Sprinter?.data?.length : 0) +
          (Transporter?.data?.length ? Transporter?.data?.length : 0) +
          (Trailer?.data?.length ? Trailer?.data?.length : 0)
        }`}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[PrimaryColor]}
            refreshing={
              SprinterFetching || TransporterFetching || TrailerFetching
            }
            onRefresh={() => {
              SprinterRefetch();
              TransporterRefetch();
              TrailerRefetch();
            }}
          />
        }
        contentContainerStyle={tw`gap-2 mx-4 mt-3`}
      >
        {Data?.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => {
                router.push(item.route as string);
              }}
              key={item.id}
              style={tw`bg-[${item.color}] w-full flex-row justify-between items-center p-5 rounded-lg`}
            >
              <View style={tw`mr-4 px-5`}>
                <Image style={tw`h-16 w-16`} source={item.icon} />
              </View>
              <View style={tw`justify-center items-center gap-1 flex-1 pl-10`}>
                <Text style={tw`text-sm text-black font-PoppinsRegular`}>
                  {item.title}
                </Text>
                <Text style={tw`text-2xl text-black font-PoppinsSemiBold`}>
                  {item.amount}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
