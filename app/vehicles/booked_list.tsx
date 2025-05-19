import { router, useLocalSearchParams } from "expo-router";
import { FlatList, RefreshControl, Text, View } from "react-native";

import OrderCard from "@/components/common/OrderCard";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import TButton from "@/lib/buttons/TButton";
import EmptyCard from "@/lib/Empty/EmptyCard";
import tw from "@/lib/tailwind";
import { useGetBookedListQuery } from "@/redux/apiSlices/homeApiSlices";
import { HIGHT } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

const vehicle_details = ({}) => {
  const [selectVehicle, setSelectVehicle] = React.useState<any>(null);

  const { search_date } = useLocalSearchParams();

  const {
    data: allOrder,
    isFetching,
    isLoading,
    refetch,
  } = useGetBookedListQuery(
    { id: selectVehicle?.id, booking_date: search_date },
    {
      skip: !selectVehicle?.id,
    }
  );

  React.useEffect(() => {
    AsyncStorage.getItem("vehicle").then((item) => {
      const data = JSON.parse(item);
      setSelectVehicle(data);
    });
  }, []);

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
              onPress={async () => {
                router.push("/vehicles/booking");
              }}
            />
          </View>
        }
        title={`${selectVehicle?.title} - ${selectVehicle?.code}`}
      />

      <FlatList
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isFetching} />
        }
        ListHeaderComponent={() => {
          return (
            <>
              {search_date && (
                <Text style={tw`text-gray-400 text-xs text-center `}>
                  {search_date}
                </Text>
              )}
            </>
          );
        }}
        ListEmptyComponent={
          <EmptyCard
            hight={HIGHT * 0.6}
            //   isLoading={allvehiclesLoading || allvehiclesFetching}
          />
        }
        showsVerticalScrollIndicator={false}
        data={allOrder?.data}
        contentContainerStyle={tw`gap-3 px-4 pt-2 pb-10`}
        renderItem={({ item, index }) => <OrderCard item={item} />}
      />
    </View>
  );
};

export default vehicle_details;
