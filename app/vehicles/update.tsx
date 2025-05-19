import * as yup from "yup";

import {
  useBookingSingleUpdateMutation,
  useGetCheckAvailabilityQuery,
} from "@/redux/apiSlices/homeApiSlices";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { IconCalendar } from "@/icons/icons";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import TButton from "@/lib/buttons/TButton";
import DateModal from "@/lib/modals/DateModal";
import { useToast } from "@/lib/modals/Toaster";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import DatePicker from "react-native-date-picker";
import { SvgXml } from "react-native-svg";

export default function booking() {
  const { closeToast, showToast } = useToast();
  const [bookingUpdate] = useBookingSingleUpdateMutation();
  const router = useRouter();
  const [selectVehicle, setSelectVehicle] = useState<any>(null);
  const [dates, setDates] = useState<any>(null);
  const [mesError, setMesError] = useState(null);
  const [initialValues, setInitialValues] = useState<any>({
    date: "",
    from: "",
    to: "",
  });

  // console.log(dates);

  useEffect(() => {
    AsyncStorage.getItem("order").then((item) => {
      const data = item ? JSON.parse(item) : {};
      setDates(data);

      const dateStr = data?.booking_date || ""; // "2025-05-19"
      const fromTimeStr = data?.from || ""; // "06:08 PM"
      const toTimeStr = data?.to || ""; // "09:43 PM"

      // Helper function to parse date and time
      const parseDateTime = (dateStr: string, timeStr: string) => {
        if (!dateStr || !timeStr) return null;

        // Parse the date part
        const datePart = dayjs(dateStr, "YYYY-MM-DD");

        // Parse the time part
        const [time, period] = timeStr.split(" ");
        const [hours, minutes] = time.split(":").map(Number);

        // Convert to 24-hour format
        let hours24 = hours;
        if (period === "PM" && hours !== 12) hours24 += 12;
        if (period === "AM" && hours === 12) hours24 = 0;

        // Combine date and time
        return datePart.hour(hours24).minute(minutes).second(0).toDate();
      };

      setInitialValues({
        date: dateStr ? dayjs(dateStr, "YYYY-MM-DD").toDate() : null,
        from: parseDateTime(dateStr, fromTimeStr),
        to: parseDateTime(dateStr, toTimeStr),
      });
    });

    AsyncStorage.getItem("vehicle").then((item) => {
      const data = item ? JSON.parse(item) : {};
      setSelectVehicle(data);
    });
  }, []);

  const handleBookingUpdate = async (values: any) => {
    try {
      // console.log(values);
      values._method = "PUT";
      values.from = dayjs(values?.from).format("hh:mm A");
      values.to = dayjs(values?.to).format("hh:mm A");
      console.log(values);
      const res = await bookingUpdate({
        id: dates.id,
        data: values,
      }).unwrap();
      // console.log(res);
      router.back();
      Alert.alert("Updated", res.message);
    } catch (error) {
      console.log(error);
      showToast({
        title: "Warning",
        content: (error as any)?.message || "",
      });
    }
  };

  const validationSchema = yup.object().shape({
    date: yup.string().required("* required"),
    from: yup.string().required("* required"),
    to: yup.string().required("* required"),
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
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          handleBookingUpdate(values);
        }}
        enableReinitialize={true}
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
                <View style={tw`gap-2`}>
                  <View style={tw`flex-row items-center`}>
                    <Text
                      style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                    >
                      Booking Date
                    </Text>
                    {errors.date && (
                      <Text
                        style={tw`text-red-500 text-xs font-PoppinsRegular`}
                      >
                        {(errors as any).date}
                      </Text>
                    )}
                  </View>
                  <View style={tw` gap-2`}>
                    <RenderDateAndTimePicker
                      selectVehicle={selectVehicle}
                      values={values}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      setMesError={setMesError}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={tw`my-5 mx-4`}>
              <TButton
                disabled={!!mesError}
                onPress={handleSubmit}
                title="Book"
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const RenderDateAndTimePicker = ({
  selectVehicle,
  setMesError,
  values,
  setFieldValue,
  errors,
}: {
  selectVehicle: any;
  values: any;
  setFieldValue: any;
  setMesError: any;
  errors: any;
}) => {
  const [dateModal, setDateModal] = useState(false);
  const [startTimeModal, setStartTimeModal] = useState(false);
  const [endTimeModal, setEndTimeModal] = useState(false);

  const handleDateChange = (selectedDate: string[]) => {
    setFieldValue("date", dayjs(selectedDate[0]).format("YYYY-MM-DD"));
  };
  // console.log(values);
  const { data: checkAvailability, isFetching } = useGetCheckAvailabilityQuery(
    {
      vehicle_id: selectVehicle?.id,
      date: dayjs(values?.date).format("YYYY-MM-DD"),
      from: dayjs(values?.from).format("hh:mm A"),
      to: dayjs(values?.to).format("hh:mm A"),
    },
    {
      skip: !values?.date || !values?.from || !values?.to || !selectVehicle?.id,
    }
  );

  React.useEffect(() => {
    if (!checkAvailability?.data?.is_available) {
      setMesError(checkAvailability?.data?.availability_message as any);
    } else {
      setMesError(null);
    }
  }, [checkAvailability, isFetching]);

  // console.log(values);

  return (
    <>
      <DatePicker
        modal
        mode="time"
        minuteInterval={2}
        open={startTimeModal || endTimeModal}
        date={
          startTimeModal
            ? values.from || new Date()
            : endTimeModal
            ? values.to || new Date()
            : new Date()
        }
        onConfirm={(time) => {
          if (startTimeModal) {
            setFieldValue("from", time);
            setStartTimeModal(false);
          }
          if (endTimeModal) {
            setFieldValue("to", time);
            setEndTimeModal(false);
          }
        }}
        onCancel={() => {
          setStartTimeModal(false);
          setEndTimeModal(false);
        }}
      />

      <View style={tw`gap-2 bg-white p-2 rounded-md`}>
        <View style={tw`gap-2`}>
          <DateModal
            // item={{ booked: [date?.booking_date] }}
            initialValue={[
              dayjs(values?.date, "YYYY,MM,DD").format("YYYY-MM-DD"),
            ]}
            selectedDate={handleDateChange}
            visible={dateModal}
            setVisible={setDateModal}
          />
        </View>

        <View style={tw`gap-2 flex-row`}>
          <View style={tw`flex-1`}>
            <TouchableOpacity onPress={() => setStartTimeModal(true)}>
              <View
                style={tw`bg-gray-50 h-12 px-2 rounded-md flex-row items-center justify-between`}
              >
                <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                  {values.from
                    ? dayjs(values.from).format("h:mm A")
                    : "Select start time"}
                </Text>
                <SvgXml xml={IconCalendar} />
              </View>
            </TouchableOpacity>
            {errors.from && (
              <Text style={tw`text-red-500 text-xs font-PoppinsRegular`}>
                {errors.from}
              </Text>
            )}
          </View>

          <View style={tw`flex-1`}>
            <TouchableOpacity onPress={() => setEndTimeModal(true)}>
              <View
                style={tw`bg-gray-50 h-12 px-2 rounded-md flex-row items-center justify-between`}
              >
                <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                  {values.to
                    ? dayjs(values.to).format("h:mm A")
                    : "Select end time"}
                </Text>
                <SvgXml xml={IconCalendar} />
              </View>
            </TouchableOpacity>
            {errors.to && (
              <Text style={tw`text-red-500 text-xs font-PoppinsRegular`}>
                {errors.to}
              </Text>
            )}
          </View>
        </View>
      </View>
      <>
        {isFetching ? (
          <ActivityIndicator color={PrimaryColor} size="small" />
        ) : checkAvailability?.data?.is_available ? (
          <Text style={tw`text-xs text-green-600`}>
            {checkAvailability?.data?.availability_message}
          </Text>
        ) : (
          <Text style={tw`text-xs text-red-600 opacity-20`}>
            {checkAvailability?.data?.availability_message}
          </Text>
        )}
      </>
    </>
  );
};
