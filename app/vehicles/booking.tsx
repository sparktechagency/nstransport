import * as yup from "yup";

import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { IconCalendar } from "@/icons/icons";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import TButton from "@/lib/buttons/TButton";
import DateModal from "@/lib/modals/DateModal";
import { useToast } from "@/lib/modals/Toaster";
import tw from "@/lib/tailwind";
import { useBookingMutation } from "@/redux/apiSlices/homeApiSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

export default function booking() {
  const [selectVehicle, setSelectVehicle] = useState<any>(null);
  const { closeToast, showToast } = useToast();

  const [bookingService] = useBookingMutation();

  const [dateModal, setDateModal] = useState(false);
  const [selectRangeDateModal, setSelectRangeDateModal] = useState(false);
  const [startTimeModal, setStartTimeModal] = useState(false);
  const [endTimeModal, setEndTimeModal] = useState(false);

  const [date, setDate] = useState(new Date());

  const router = useRouter();

  const bookingType = [
    {
      label: "Single Day Booking",
      value: "single_day",
    },
    {
      label: "Multiple Days Booking",
      value: "multiple_day",
    },
  ];

  useEffect(() => {
    AsyncStorage.getItem("vehicle").then((item) => {
      const data = JSON.parse(item);
      setSelectVehicle(data);
    });
  }, []);

  const handleBookingCar = async (values: any) => {
    if (selectVehicle?.id) values.vehicle_id = selectVehicle.id;

    try {
      const res = await bookingService(values).unwrap();
      // console.log(res);
      // await AsyncStorage.setItem("booked", JSON.stringify(values));
      router.back();
    } catch (error) {
      console.log(error);
      showToast({
        title: "Warning",
        content: error.message,
      });
    }
  };

  // console.log(selectVehicle?.booked);

  const validationSchema = yup.object().shape({
    renter_name: yup.string().required("* required"),
    phone_number: yup.string().required("* required"),
    booking_type: yup.string().required("* required"),
    booked_dates: yup
      .array()
      .min(1, "You must select at least one date.") // Enforces at least one date selected
      .required("* required"),
    booking_time_from: yup.string().when("booking_type", {
      is: (val: string) => val === "single_day",
      then: (schema) => schema.required("* required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    booking_time_to: yup.string().when("booking_type", {
      is: (val: string) => val === "single_day",
      then: (schema) => schema.required("* required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

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
          booking_type: "",
          booked_dates: [],
        }}
        validationSchema={validationSchema}
        validateOnSubmit={true}
        onSubmit={async (values) => {
          handleBookingCar(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
        }) => (
          <>
            <ScrollView
              keyboardShouldPersistTaps="always"
              contentContainerStyle={tw`px-4 py-4 gap-5`}
            >
              {/* header parts  */}

              <View style={tw`gap-4 pb-5`}>
                <View style={tw`gap-1 `}>
                  <View style={tw`flex-row items-center`}>
                    <Text
                      style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                    >
                      Renter Name
                    </Text>
                    {errors.renter_name && (
                      <Text
                        style={tw`text-red-500 text-xs font-PoppinsRegular`}
                      >
                        {errors.renter_name}
                      </Text>
                    )}
                  </View>

                  <TextInput
                    onChangeText={handleChange("renter_name")}
                    onBlur={handleBlur("renter_name")}
                    value={values.renter_name}
                    placeholder="Enter ranter name"
                    style={tw`bg-white h-12 rounded-md px-2`}
                  />
                </View>
                <View style={tw`gap-1 `}>
                  <View style={tw`flex-row items-center`}>
                    <Text
                      style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                    >
                      Phone Number
                    </Text>
                    {errors.phone_number && (
                      <Text
                        style={tw`text-red-500 text-xs font-PoppinsRegular`}
                      >
                        {errors.phone_number}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    onChangeText={handleChange("phone_number")}
                    onBlur={handleBlur("phone_number")}
                    value={values.phone_number}
                    placeholder="Enter phone number"
                    style={tw`bg-white h-12 rounded-md px-2`}
                  />
                </View>
                <View style={tw`gap-1 `}>
                  <View style={tw`flex-row items-center`}>
                    <Text
                      style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                    >
                      Booking type
                    </Text>
                    {errors.booking_type && (
                      <Text
                        style={tw`text-red-500 text-xs font-PoppinsRegular`}
                      >
                        {errors.booking_type}
                      </Text>
                    )}
                  </View>

                  <Dropdown
                    style={tw`bg-white h-12 px-2 rounded-md`}
                    placeholderStyle={tw`text-gray-500 text-sm`}
                    itemContainerStyle={tw`bg-transparent`}
                    data={bookingType}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select item"
                    value={values.booking_type}
                    onChange={(item) => {
                      handleChange("booking_type")(item.value);
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

                {values.booking_type === "single_day" && (
                  <>
                    <View style={tw`gap-2`}>
                      <View style={tw`flex-row items-center`}>
                        <Text
                          style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                        >
                          Booking Date
                        </Text>
                        {errors.booked_dates && (
                          <Text
                            style={tw`text-red-500 text-xs font-PoppinsRegular`}
                          >
                            {errors.booked_dates}
                          </Text>
                        )}
                      </View>

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
                            {values?.booked_dates?.length
                              ? values?.booked_dates
                              : "Select date"}
                          </Text>
                          <SvgXml xml={IconCalendar} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={tw`gap-2`}>
                      <View style={tw`flex-row items-center`}>
                        <Text
                          style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                        >
                          Booking Time
                        </Text>
                        {(errors.booking_time_from ||
                          errors.booking_time_to) && (
                          <Text
                            style={tw`text-red-500 text-xs font-PoppinsRegular`}
                          >
                            {errors.booking_time_from || errors.booking_time_to}
                          </Text>
                        )}
                      </View>

                      <TouchableOpacity onPress={() => setStartTimeModal(true)}>
                        <View
                          style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-between`}
                        >
                          <Text
                            style={tw`text-sm text-gray-500 font-PoppinsRegular`}
                          >
                            {values?.booking_time_from
                              ? values?.booking_time_from
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
                            {values?.booking_time_to
                              ? values?.booking_time_to
                              : "Select end time"}
                          </Text>
                          <SvgXml xml={IconCalendar} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                {values.booking_type === "multiple_day" && (
                  <View style={tw`gap-2`}>
                    <View style={tw`flex-row items-center`}>
                      <Text
                        style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                      >
                        Booking Date
                      </Text>
                      {errors.booked_dates && (
                        <Text
                          style={tw`text-red-500 text-xs font-PoppinsRegular`}
                        >
                          {errors.booked_dates}
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectRangeDateModal(true);
                      }}
                    >
                      <View
                        style={tw`bg-white min-h-12 p-2 rounded-md flex-row ${
                          values?.booked_dates?.length
                            ? "flex-wrap gap-2 "
                            : "justify-between"
                        } items-center `}
                      >
                        {values?.booked_dates?.length ? (
                          values?.booked_dates?.map((booked_dates) => {
                            return (
                              <View key={booked_dates} style={tw`gap-3`}>
                                <Text style={tw`p-1 bg-base rounded-md`}>
                                  {booked_dates}
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
                        {!values?.booked_dates?.length && (
                          <SvgXml xml={IconCalendar} />
                        )}
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
                      "booking_time_from",
                      dayjs(currentDate).format("HH:mm")
                    );
                    setStartTimeModal(false);
                  }
                  if (endTimeModal) {
                    setFieldValue(
                      "booking_time_to",
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
                setFieldValue("booked_dates", date);
              }}
              range={values.booking_type === "multiple_day"}
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
