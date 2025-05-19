import {
  IconCalendarForOrder,
  IconCall,
  IconClockForOrder,
  IconPen2,
  IconUser,
} from "@/icons/icons";
import { Text, TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

const order_view_modal = () => {
  const [dates, setDates] = React.useState<any>(null);

  React.useEffect(() => {
    AsyncStorage.getItem("order").then((item) => {
      const data = item ? JSON.parse(item) : {};
      setDates(data);
    });
  }, []);
  return (
    <View style={tw`p-4 bg-white `}>
      <View style={tw`gap-3 flex-1 rounded-lg px-4 py-3`}>
        <View style={tw`flex-row items-center gap-2`}>
          <SvgXml xml={IconUser} />
          <Text style={tw`text-black font-PoppinsMedium text-base`}>
            {dates?.customer?.name}
          </Text>

          <TouchableOpacity
            onPress={() => {
              router?.canDismiss() && router?.dismiss();
              router.push("/vehicles/customer_update");
            }}
            style={tw``}
          >
            <SvgXml height={15} width={15} xml={IconPen2} />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row items-center gap-2`}>
          <SvgXml xml={IconCall} />
          <Text style={tw`text-black font-PoppinsRegular text-base`}>
            {dates?.customer?.phone}
          </Text>
        </View>

        <View style={tw`flex-row items-center gap-2`}>
          <SvgXml xml={IconCalendarForOrder} />
          <Text style={tw`text-black font-PoppinsRegular text-base`}>
            {dates?.booking_date}
          </Text>
        </View>
        <View style={tw`flex-row items-center gap-2`}>
          <SvgXml xml={IconClockForOrder} />
          <Text style={tw`text-black font-PoppinsRegular text-base`}>
            {dates?.from} - {dates?.to}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default order_view_modal;
