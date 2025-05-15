import * as yup from "yup";

import { IconCalendar, IconClose2, IconPlusWhite } from "@/icons/icons";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import IButton from "@/lib/buttons/IButton";
import TButton from "@/lib/buttons/TButton";
import DateModal from "@/lib/modals/DateModal";
import { useToast } from "@/lib/modals/Toaster";
import tw from "@/lib/tailwind";
import { useBookingMutation } from "@/redux/apiSlices/homeApiSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import DatePicker from "react-native-date-picker";
import { SvgXml } from "react-native-svg";

export default function booking() {
  const { closeToast, showToast } = useToast();
  const [bookingService] = useBookingMutation();
  const router = useRouter();
  const [selectVehicle, setSelectVehicle] = useState<any>(null);

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
      router.back();
    } catch (error) {
      console.log(error);
      showToast({
        title: "Warning",
        content: error.message,
      });
    }
  };

  const validationSchema = yup.object().shape({
    renter_name: yup.string().required("* required"),
    phone_number: yup.string().required("* required"),
    booking_type: yup.string().required("* required"),
    booked_dates: yup
      .array()
      .min(1, "You must select at least one date.")
      .required("* required"),
  });

  return (
    <View style={tw` flex-1 bg-base`}>
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
          booking_type: "single_day", // Default value
          booked_dates: [
            {
              date: "",
              booking_time_from: "",
              booking_time_to: "",
            },
          ],
        }}
        validationSchema={validationSchema}
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
                    placeholder="Enter renter name"
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
                    value={values.phone_number}
                    placeholder="Enter phone number"
                    placeholderTextColor={tw.color("gray-400")}
                    style={tw`bg-white h-12 rounded-md px-2`}
                    keyboardType="phone-pad"
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
                  <View style={tw` gap-2`}>
                    {values?.booked_dates?.map((date, index: number) => (
                      <RenderDateAndTimePicker
                        key={index}
                        index={index}
                        selectVehicleDate={selectVehicle?.date}
                        date={date}
                        values={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                      />
                    ))}
                    <IButton
                      containerStyle={tw`h-10 my-3 w-[50%] self-center rounded-lg bg-primary`}
                      svg={IconPlusWhite}
                      onPress={() => {
                        setFieldValue("booked_dates", [
                          ...values.booked_dates,
                          {
                            date: "",
                            booking_time_from: "",
                            booking_time_to: "",
                          },
                        ]);
                      }}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={tw`my-5 mx-4`}>
              <TButton onPress={handleSubmit} title="Book" />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const RenderDateAndTimePicker = ({
  index,
  selectVehicleDate,
  date,
  values,
  setFieldValue,
  errors,
}: {
  index: number;
  selectVehicleDate: any;
  values: any;
  setFieldValue: any;
  date: any;
  errors: any;
}) => {
  const [dateModal, setDateModal] = useState(false);
  const [startTimeModal, setStartTimeModal] = useState(false);
  const [endTimeModal, setEndTimeModal] = useState(false);

  const handleDateChange = (selectedDate: string) => {
    const updatedDates = [...values.booked_dates];
    updatedDates[index] = {
      ...updatedDates[index],
      date: selectedDate,
    };
    setFieldValue("booked_dates", updatedDates);
  };

  const handleTimeChange = (
    time: Date,
    field: "booking_time_from" | "booking_time_to"
  ) => {
    const updatedDates = [...values.booked_dates];
    updatedDates[index] = {
      ...updatedDates[index],
      [field]: dayjs(time).format("h:mm A"), // Changed from "HH:mm" to "h:mm A"
    };
    setFieldValue("booked_dates", updatedDates);
  };

  return (
    <>
      <DatePicker
        modal
        mode="time"
        // is24hourSource={""}
        open={startTimeModal || endTimeModal}
        date={new Date()}
        onConfirm={(time) => {
          if (startTimeModal) {
            handleTimeChange(time, "booking_time_from");
            setStartTimeModal(false);
          }
          if (endTimeModal) {
            handleTimeChange(time, "booking_time_to");
            setEndTimeModal(false);
          }
        }}
        onCancel={() => {
          setStartTimeModal(false);
          setEndTimeModal(false);
        }}
      />

      <DateModal
        item={selectVehicleDate}
        selectedDate={handleDateChange}
        visible={dateModal}
        setVisible={setDateModal}
      />

      <View style={tw`gap-2 bg-white p-2 rounded-md`}>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-sm pl-2 font-PoppinsMedium text-gray-500`}>
            Booking date: {index + 1}
          </Text>
          {index > 0 && (
            <IButton
              onPress={() => {
                const updatedDates = values.booked_dates.filter(
                  (_, i) => i !== index
                );
                setFieldValue("booked_dates", updatedDates);
              }}
              containerStyle={tw`p-0 bg-transparent`}
              svg={IconClose2}
            />
          )}
        </View>

        <View style={tw`gap-2`}>
          <TouchableOpacity onPress={() => setDateModal(true)}>
            <View
              style={tw`bg-gray-50 h-12 p-2 rounded-md flex-row items-center justify-between`}
            >
              <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                {values.booked_dates[index]?.date
                  ? dayjs(values.booked_dates[index].date).format("YYYY-MM-DD")
                  : "Select date"}
              </Text>
              <SvgXml xml={IconCalendar} />
            </View>
          </TouchableOpacity>
          {errors.booked_dates?.[index]?.date && (
            <Text style={tw`text-red-500 text-xs font-PoppinsRegular`}>
              {errors.booked_dates[index].date}
            </Text>
          )}
        </View>

        <View style={tw`gap-2 flex-row`}>
          <View style={tw`flex-1`}>
            <TouchableOpacity onPress={() => setStartTimeModal(true)}>
              <View
                style={tw`bg-gray-50 h-12 px-2 rounded-md flex-row items-center justify-between`}
              >
                <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                  {values.booked_dates[index]?.booking_time_from
                    ? values.booked_dates[index].booking_time_from
                    : "Select start time"}
                </Text>
                <SvgXml xml={IconCalendar} />
              </View>
            </TouchableOpacity>
            {errors.booked_dates?.[index]?.booking_time_from && (
              <Text style={tw`text-red-500 text-xs font-PoppinsRegular`}>
                {errors.booked_dates[index].booking_time_from}
              </Text>
            )}
          </View>

          <View style={tw`flex-1`}>
            <TouchableOpacity onPress={() => setEndTimeModal(true)}>
              <View
                style={tw`bg-gray-50 h-12 px-2 rounded-md flex-row items-center justify-between`}
              >
                <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                  {values.booked_dates[index]?.booking_time_to
                    ? values.booked_dates[index].booking_time_to
                    : "Select end time"}
                </Text>
                <SvgXml xml={IconCalendar} />
              </View>
            </TouchableOpacity>
            {errors.booked_dates?.[index]?.booking_time_to && (
              <Text style={tw`text-red-500 text-xs font-PoppinsRegular`}>
                {errors.booked_dates[index].booking_time_to}
              </Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
};
