import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import DateModal from "@/lib/modals/DateModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { Formik } from "formik";
import { IconCalendar } from "@/icons/icons";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import availblevehicle from "@/assets/database/avablievehicle.json";
import dayjs from "dayjs";
import tw from "@/lib/tailwind";

export default function booking() {
  const { id } = useLocalSearchParams();
  const [selectVehicle, setSelectVehicle] = useState(null);

  const [dateModal, setDateModal] = useState(false);
  const [selectRangeDateModal, setSelectRangeDateModal] = useState(false);
  const [startTimeModal, setStartTimeModal] = useState(false);
  const [endTimeModal, setEndTimeModal] = useState(false);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

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
          data: [],
          start_time: "",
          end_time: "",
        }}
        onSubmit={async (values) => {
          await AsyncStorage.setItem("booking", JSON.stringify(values));
          router.push({
            pathname: "/vehicles/confirmbooking",
            params: {
              id,
            },
          });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
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
                  <>
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
                          style={tw`bg-white h-12 p-2 rounded-md flex-row items-center justify-between`}
                        >
                          <Text
                            style={tw`text-sm text-gray-500 font-PoppinsRegular`}
                          >
                            {values?.data?.length
                              ? values?.data
                              : "Select date"}
                          </Text>
                          <SvgXml xml={IconCalendar} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={tw`gap-2`}>
                      <Text
                        style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                      >
                        Booking Time
                      </Text>

                      <TouchableOpacity onPress={() => setStartTimeModal(true)}>
                        <View
                          style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-between`}
                        >
                          <Text
                            style={tw`text-sm text-gray-500 font-PoppinsRegular`}
                          >
                            {values?.start_time
                              ? values?.start_time
                              : "Select start time"}
                          </Text>
                          <SvgXml xml={IconCalendar} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setEndTimeModal(true)}>
                        <View
                          style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-between`}
                        >
                          <Text
                            style={tw`text-sm text-gray-500 font-PoppinsRegular`}
                          >
                            {values?.end_time
                              ? values?.end_time
                              : "Select end time"}
                          </Text>
                          <SvgXml xml={IconCalendar} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
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
                        setSelectRangeDateModal(true);
                      }}
                    >
                      <View
                        style={tw`bg-white min-h-12 p-2 rounded-md flex-row ${
                          values?.data?.length
                            ? "flex-wrap gap-2 "
                            : "justify-between"
                        } items-center `}
                      >
                        {values?.data?.length ? (
                          values?.data?.map((date) => {
                            return (
                              <View key={date} style={tw`gap-3`}>
                                <Text style={tw`p-1 bg-base rounded-md`}>
                                  {date}
                                </Text>
                              </View>
                            );
                          })
                        ) : (
                          <Text
                            style={tw`text-sm text-gray-500 font-PoppinsRegular `}
                          >
                            Select date range
                          </Text>
                        )}
                        {!values?.data?.length && <SvgXml xml={IconCalendar} />}
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
            <View style={tw`my-5 mx-4`}>
              <TButton onPress={handleSubmit} title="Book" />
            </View>

            {/* time picker  */}

            {(startTimeModal || endTimeModal) && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"time"}
                is24Hour={true}
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate;
                  if (startTimeModal) {
                    setFieldValue(
                      "start_time",
                      dayjs(currentDate).format("HH:mm")
                    );
                    setStartTimeModal(false);
                  }
                  if (endTimeModal) {
                    setFieldValue(
                      "end_time",
                      dayjs(currentDate).format("HH:mm")
                    );
                    setEndTimeModal(false);
                  }
                }}
              />
            )}
            {/* date picker  */}
            <DateModal
              item={selectVehicle}
              selectedDate={(date) => {
                setFieldValue("data", date);
              }}
              range={values.type === "multiple"}
              visible={dateModal || selectRangeDateModal}
              setVisible={
                dateModal
                  ? setDateModal
                  : selectRangeDateModal
                  ? setSelectRangeDateModal
                  : () => {}
              }
            />
          </>
        )}
      </Formik>
    </View>
  );
}
