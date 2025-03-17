import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import tw from "@/lib/tailwind";
import { IVehicle } from "@/redux/interface/interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export default function bookingConfirm() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const [booking, setBooking] = useState<IVehicle | null>(null);

  // console.log(selectVehicle);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("booked");
      if (value !== null) {
        // value previously stored
      }
      setBooking(JSON.parse(value as any));
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={tw` flex-1 bg-base`}>
      {/* header part  */}
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        titleStyle={tw``}
        title={`${booking?.title} - ${booking?.code}`}
      />

      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`px-4 py-4 gap-5`}
      >
        {/* header parts  */}

        <View style={tw`gap-4 pb-5`}>
          <View style={tw`gap-1 `}>
            <Text style={tw`text-base text-black font-PoppinsSemiBold px-1`}>
              Renter Name
            </Text>
            <View
              style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-between`}
            >
              <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                {booking?.renter_info?.renter_name}
              </Text>
            </View>
          </View>
          <View style={tw`gap-1 `}>
            <Text style={tw`text-base text-black font-PoppinsSemiBold px-1`}>
              Phone Number
            </Text>
            <View
              style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-between`}
            >
              <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                {booking?.renter_info?.phone}
              </Text>
            </View>
          </View>

          <View style={tw`gap-2`}>
            <Text style={tw`text-base text-black font-PoppinsSemiBold px-1`}>
              Booking Date
            </Text>
            <View>
              <View
                style={tw`bg-white min-h-12 p-2 rounded-md flex-row ${
                  booking?.booked?.length
                    ? "flex-wrap gap-2 "
                    : "justify-between"
                } items-center `}
              >
                {booking?.booked?.map((date) => {
                  return (
                    <View key={date} style={tw`gap-3`}>
                      <Text style={tw`p-1 bg-base rounded-md`}>{date}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          <View style={tw`gap-2`}>
            <Text style={tw`text-base text-black font-PoppinsSemiBold px-1`}>
              Booking Time
            </Text>

            <View>
              <View
                style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-around`}
              >
                <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                  {moment(
                    booking?.renter_info?.booking_time_from,
                    "HH:mm:ss"
                  ).format("hh:mm A")}
                </Text>
                <Text>-</Text>
                <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                  {moment(
                    booking?.renter_info?.booking_time_to,
                    "HH:mm:ss"
                  ).format("hh:mm A")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
