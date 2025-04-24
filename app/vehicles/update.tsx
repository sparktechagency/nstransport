import * as yup from "yup";

import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
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
import { useUpdateBookingMutation } from "@/redux/apiSlices/homeApiSlices";
import { IVehicle } from "@/redux/interface/interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import { SvgXml } from "react-native-svg";

export default function update() {
  const [selectVehicle, setSelectVehicle] = useState<IVehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { closeToast, showToast } = useToast();

  const navigation = useNavigation();

  const [updateBooking] = useUpdateBookingMutation();

  const [dateModal, setDateModal] = useState(false);
  const [selectRangeDateModal, setSelectRangeDateModal] = useState(false);
  const [startTimeModal, setStartTimeModal] = useState(false);
  const [endTimeModal, setEndTimeModal] = useState(false);

  const [date, setDate] = useState(new Date());

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem("booked").then((item) => {
      const data = JSON.parse(item);
      setSelectVehicle(data);
      setLoading(false);
    });
  }, []);

  const handleBookingCar = async (values: any) => {
    if (selectVehicle?.id) values.vehicle_id = selectVehicle.id;
    // console.log(values);
    try {
      values._method = "PUT";
      const res = await updateBooking({
        data: values,
        id: selectVehicle?.renter_info?.id,
      }).unwrap();
      // console.log(res);
      // await AsyncStorage.setItem("booked", JSON.stringify(values));
      if (res?.status) {
        Alert.alert(
          "Success",
          "Booking updated successfully",
          [
            {
              text: "OK",
              onPress: () => {
                router.back();
                router?.back();
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Error",
          res?.message,
          [
            {
              text: "OK",
              onPress: () => {
                router.back();
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log(error);
      showToast({
        title: "Warning",
        content: error.message,
        onPress: closeToast,
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
      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-base text-black font-PoppinsRegular`}>
            Loading...
          </Text>
        </View>
      ) : (
        <>
          <Formik
            initialValues={
              selectVehicle
                ? {
                    renter_name: selectVehicle?.renter_info?.renter_name,
                    phone_number: selectVehicle?.renter_info?.phone,
                    booking_type: "multiple_day",
                    booked_dates: selectVehicle?.booked,
                  }
                : {
                    renter_name: "",
                    phone_number: "",
                    booking_type: "multiple_day",
                    booked_dates: [],
                  }
            }
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
                        {errors?.renter_name && (
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
                        value={values?.renter_name}
                        placeholder="Enter ranter name"
                        placeholderTextColor={tw.color("gray-400")}
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
                        value={values?.phone_number}
                        placeholder="Enter phone number"
                        placeholderTextColor={tw.color("gray-400")}
                        style={tw`bg-white h-12 rounded-md px-2`}
                      />
                    </View>

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
                            values?.booked_dates?.map((_dates) => {
                              return (
                                <TouchableOpacity
                                  key={_dates}
                                  style={tw`gap-3`}
                                  onPress={() => {
                                    const newDates =
                                      values?.booked_dates?.filter(
                                        (date) => date !== _dates
                                      );
                                    setFieldValue("booked_dates", newDates);
                                  }}
                                >
                                  <View
                                    key={_dates}
                                    style={tw`gap-3 bg-base flex-row items-center px-2 py-1`}
                                  >
                                    <Text style={tw`  rounded-md`}>
                                      {_dates}
                                    </Text>
                                    <Text style={tw`text-lg text-red-500`}>
                                      X
                                    </Text>
                                  </View>
                                </TouchableOpacity>
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
                  </View>
                </ScrollView>
                <View style={tw`my-5 mx-4`}>
                  <TButton onPress={handleSubmit} title="Update" />
                </View>

                {/* date picker  */}
                <DateModal
                  item={values?.booked_dates}
                  selectedDate={(date) => {
                    // console.log(date);
                    const currentDates = values?.booked_dates || [];
                    // Handle both cases: date can be a string or array of strings
                    const datesToAdd = Array.isArray(date) ? date : [date];

                    // Filter out dates that already exist
                    const newDates = datesToAdd.filter(
                      (d) => !currentDates.includes(d)
                    );

                    if (newDates.length > 0) {
                      setFieldValue("booked_dates", [
                        ...currentDates,
                        ...newDates,
                      ]);
                    }
                  }}
                  range
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
        </>
      )}
    </View>
  );
}
