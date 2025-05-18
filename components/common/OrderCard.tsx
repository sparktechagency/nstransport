import {
  IconCalendarForOrder,
  IconCall,
  IconClockForOrder,
  IconClose,
  IconPen,
  IconUser,
} from "@/icons/icons";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import IButton from "@/lib/buttons/IButton";
import tw from "@/lib/tailwind";
import { useCancelBookedMutation } from "@/redux/apiSlices/homeApiSlices";
import { Order } from "@/redux/interface/interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

const OrderCard = ({ item }: { item: Order }) => {
  const [cancelVehicle, results] = useCancelBookedMutation();
  const handleCancel = async () => {
    try {
      const res = await cancelVehicle(item?.id).unwrap();
      // console.log("asdfasdf", res);
      if (res?.status) {
        Alert.alert("Success", res?.message);
        await AsyncStorage.removeItem("booked");
        // router.back();
      } else {
        alert(res?.message);
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <Drawer
    //   style={tw`rounded-lg`}
    //   rightItems={[
    //     {
    //       background: "black",
    //       width: 100,
    //       customElement: (
    //         <>
    //           <View style={tw` justify-center items-center gap-3 `}>
    //             <SvgXml width={35} height={35} xml={IconPen} />
    //           </View>
    //         </>
    //       ),
    //     },
    //     {
    //       background: "red",
    //       width: 100,
    //       customElement: (
    //         <>
    //           <View style={tw` justify-center items-center gap-3 `}>
    //             <SvgXml width={35} height={35} xml={IconClose} />
    //           </View>
    //         </>
    //       ),
    //     },
    //   ]}
    // >
    <View style={tw` gap-3 flex-row items-center justify-between  `}>
      <TouchableOpacity style={tw`gap-3 flex-1 bg-white rounded-lg px-4 py-3`}>
        <View>
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconUser} />
            <Text style={tw`text-black font-PoppinsMedium text-base`}>
              {item?.customer?.name}
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconCall} />
            <Text style={tw`text-black font-PoppinsRegular text-base`}>
              {item?.customer?.phone}
            </Text>
          </View>
        </View>
        <View>
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconCalendarForOrder} />
            <Text style={tw`text-black font-PoppinsRegular text-base`}>
              {item?.booking_date}
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconClockForOrder} />
            <Text style={tw`text-black font-PoppinsRegular text-base`}>
              {item?.from} - {item?.to}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={tw`w-1/5 gap-3`}>
        <IButton
          svg={IconPen}
          onPress={async () => {
            AsyncStorage.setItem("order", JSON.stringify(item));
            router?.push("/vehicles/update");
          }}
          containerStyle={tw`bg-white flex-1 w-full rounded-lg`}
        />
        <IButton
          svg={IconClose}
          isLoading={results.isLoading}
          onPress={() => {
            Alert.alert(
              "Confirm Delete Order",
              "Are you sure you want to delete this order?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Confirm",
                  style: "destructive",
                  onPress: async () => {
                    handleCancel();
                    // try {
                    //   await deleteUser(userId).unwrap();
                    //   refetch();
                    //   Alert.alert("Success", "User deleted successfully");
                    // } catch (error) {
                    //   Alert.alert("Error", "Failed to delete user");
                    // }
                  },
                },
              ]
            );
          }}
          containerStyle={tw`bg-red-500 flex-1 w-full rounded-lg`}
        />
      </View>
    </View>
    // </Drawer>
  );
};

export default OrderCard;
