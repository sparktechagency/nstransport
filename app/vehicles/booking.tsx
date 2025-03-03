import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import DateModal from "@/lib/modals/DateModal";
import { Dropdown } from "react-native-element-dropdown";
import { Formik } from "formik";
import { IconCalendar } from "@/icons/icons";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import availblevehicle from "@/assets/database/avablievehicle.json";
import tw from "@/lib/tailwind";

export default function booking() {
  const { id } = useLocalSearchParams();
  const [selectVehicle, setSelectVehicle] = useState(null);

  const [dateModal, setDateModal] = useState(false);
  const [startDateModal, setStartDateModal] = useState(false);
  const [endDateModal, setEndDateModal] = useState(false);
  const [startTimeModal, setStartTimeModal] = useState(false);
  const [endTimeModal, setEndTimeModal] = useState(false);

  const router = useRouter();

  const bookingType = [
    {
      label: "Single Day Booking",
      value: "single",
    },
    {
      label: "Multiple Days Booking",
      value: "multiple",
    },
  ];

  useEffect(() => {
    if (id && selectVehicle == null) {
      const item = availblevehicle.find((item) => item.id == id);
      setSelectVehicle(item as any);
    }
  }, [id]);

  // console.log(selectVehicle);

  return (
    <View style={tw` flex-1 bg-base`}>
      {/* header part  */}
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        titleStyle={tw``}
        title={`${selectVehicle?.title} - ${selectVehicle?.code}`}
      />
      <Formik
        initialValues={{
          renter_name: "",
          phone_number: "",
          type: "",
          data: "",
          start_data: "",
          end_data: "",
          start_time: "",
          end_time: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <ScrollView
              keyboardShouldPersistTaps="always"
              contentContainerStyle={tw`px-4 py-4 gap-5`}
            >
              {/* header parts  */}

              <View style={tw`gap-4 pb-5`}>
                <View style={tw`gap-1 `}>
                  <Text
                    style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                  >
                    Renter Name
                  </Text>
                  <TextInput
                    onChangeText={handleChange("renter_name")}
                    onBlur={handleBlur("renter_name")}
                    value={values.renter_name}
                    placeholder="Enter ranter name"
                    style={tw`bg-white h-12 rounded-md px-2`}
                  />
                </View>
                <View style={tw`gap-1 `}>
                  <Text
                    style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                  >
                    Phone Number
                  </Text>
                  <TextInput
                    onChangeText={handleChange("phone_number")}
                    onBlur={handleBlur("phone_number")}
                    value={values.phone_number}
                    placeholder="Enter phone number"
                    style={tw`bg-white h-12 rounded-md px-2`}
                  />
                </View>
                <View style={tw`gap-1 `}>
                  <Text
                    style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                  >
                    Booking Type
                  </Text>
                  <Dropdown
                    style={tw`bg-white h-12 px-2 rounded-md`}
                    placeholderStyle={tw`text-gray-500 text-sm`}
                    itemContainerStyle={tw`bg-transparent`}
                    data={bookingType}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select item"
                    value={values.type}
                    onChange={(item) => {
                      handleChange("type")(item.value);
                    }}
                    renderItem={(item) => {
                      return (
                        <View
                          style={tw`m-1 p-3 gap-1 flex-row items-center bg-transparent justify-between border border-gray-200 rounded-md`}
                        >
                          <Text
                            style={tw`text-base text-black font-PoppinsMedium`}
                          >
                            {item?.label}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>

                {values.type === "single" && (
                  <View style={tw`gap-2`}>
                    <Text
                      style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                    >
                      Booking Date
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setDateModal(true);
                      }}
                    >
                      <View
                        style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-between`}
                      >
                        <Text
                          style={tw`text-sm text-gray-500 font-PoppinsRegular`}
                        >
                          {values?.data ? values?.data : "Select date"}
                        </Text>
                        <SvgXml xml={IconCalendar} />
                      </View>
                      <DateModal
                        item={selectVehicle}
                        selectedDate={(date) => {
                          handleChange("data")(date.toString());
                          // setDateModal(false);
                        }}
                        visible={dateModal}
                        setVisible={setDateModal}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                {values.type === "multiple" && (
                  <View style={tw`gap-2`}>
                    <Text
                      style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                    >
                      Booking Date
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setStartDateModal(true);
                      }}
                    >
                      <View
                        style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-between`}
                      >
                        <Text
                          style={tw`text-sm text-gray-500 font-PoppinsRegular`}
                        >
                          {values?.start_data
                            ? values?.start_data
                            : "Start date"}
                        </Text>
                        <SvgXml xml={IconCalendar} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setEndDateModal(true);
                      }}
                    >
                      <View
                        style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-between`}
                      >
                        <Text
                          style={tw`text-sm text-gray-500 font-PoppinsRegular`}
                        >
                          {values?.end_data ? values?.end_data : "End date"}
                        </Text>
                        <SvgXml xml={IconCalendar} />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                <View style={tw`gap-2`}>
                  <Text
                    style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                  >
                    Booking Time
                  </Text>
                  <TouchableOpacity>
                    <View
                      style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-between`}
                    >
                      <Text
                        style={tw`text-sm text-gray-500 font-PoppinsRegular`}
                      >
                        Select time
                      </Text>
                      <SvgXml xml={IconCalendar} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            <View style={tw`my-5 mx-4`}>
              <TButton onPress={handleSubmit} title="Add" />
            </View>

            <DateModal
              item={selectVehicle}
              selectedDate={(date) => {
                if (dateModal) {
                  handleChange("data")(date.toString());
                }
                if (startDateModal) {
                  handleChange("start_data")(date.toString());
                }
                if (endDateModal) {
                  handleChange("end_data")(date.toString());
                }
              }}
              range={values.type === "multiple"}
              visible={dateModal || endDateModal || startDateModal}
              setVisible={
                dateModal
                  ? setDateModal
                  : endDateModal
                  ? setEndDateModal
                  : startDateModal
                  ? setStartDateModal
                  : () => {}
              }
            />
          </>
        )}
      </Formik>
    </View>
  );
}
