import { Alert, FlatList, Text, View } from "react-native";
import {
  IconCalendarForOrder,
  IconCall,
  IconClockForOrder,
  IconClose,
  IconPen,
  IconUser,
} from "@/icons/icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import EmptyCard from "@/lib/Empty/EmptyCard";
import { HIGHT } from "@/utils/utils";
import IButton from "@/lib/buttons/IButton";
import React from "react";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import { router } from "expo-router";
import tw from "@/lib/tailwind";
import { useCancelBookedMutation } from "@/redux/apiSlices/homeApiSlices";

const vehicle_details = () => {
  const [cancelVehicle, results] = useCancelBookedMutation();
  const [selectVehicle, setSelectVehicle] = React.useState<any>(null);

  React.useEffect(() => {
    AsyncStorage.getItem("vehicle").then((item) => {
      const data = JSON.parse(item);
      setSelectVehicle(data);
    });
  }, []);
  const handleCancel = async () => {
    // try {
    //   const res = await cancelVehicle(booking?.renter_info?.id).unwrap();
    // console.log("asdfasdf", res);
    //   if (res?.status) {
    //     alert(res?.message);
    //     await AsyncStorage.removeItem("booked");
    //     router.back();
    //   } else {
    //     alert(res?.message);
    //     router.back();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <View style={tw`flex-1 bg-base`}>
      {/* header part  */}
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        titleStyle={tw``}
        ComponentBtn={
          <View style={tw``}>
            <TButton
              title="New Book"
              containerStyle={tw`px-3 h-10 `}
              titleStyle={tw`text-xs`}
              onPress={() => router.push("/vehicles/booking")}
            />
          </View>
        }
        title={`${selectVehicle?.title} - ${selectVehicle?.code}`}
      />
      <FlatList
        ListEmptyComponent={
          <EmptyCard
            hight={HIGHT * 0.6}
            //   isLoading={allvehiclesLoading || allvehiclesFetching}
          />
        }
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5]}
        contentContainerStyle={tw`gap-3 px-4 pt-2 pb-10`}
        renderItem={() => (
          <View style={tw` gap-3 flex-row items-center justify-between  `}>
            <View style={tw`gap-3 flex-1 bg-white rounded-lg px-4 py-3`}>
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconUser} />
                <Text style={tw`text-black font-PoppinsMedium text-base`}>
                  Abid Hasan
                </Text>
              </View>
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconCall} />
                <Text style={tw`text-black font-PoppinsRegular text-base`}>
                  5689 5469 526
                </Text>
              </View>
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconCalendarForOrder} />
                <Text style={tw`text-black font-PoppinsRegular text-base`}>
                  01-01-2025
                </Text>
              </View>
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconClockForOrder} />
                <Text style={tw`text-black font-PoppinsRegular text-base`}>
                  09:00 AM - 04:00 PM
                </Text>
              </View>
            </View>
            <View style={tw`w-1/5 gap-3`}>
              <IButton
                svg={IconPen}
                onPress={() => {
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
        )}
      />
    </View>
  );
};

export default vehicle_details;
