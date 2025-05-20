import * as yup from "yup";

import { IconCalendar, IconPlusWhite } from "@/icons/icons";
import {
  useBookingMutation,
  useGetCheckAvailabilityQuery,
} from "@/redux/apiSlices/homeApiSlices";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import { PrimaryColor } from "@/utils/utils";
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
  const [mesError, setMesError] = useState(null);

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
      if (res?.status) {
        Alert.alert("Success", res?.message || "Booking made successfully");
        router.back();
      }
    } catch (error) {
      showToast({
        title: "Warning",
        content: error.message,
      });
    }
  };

  const validationSchema = yup.object().shape({
    renter_name: yup.string().required("* required"),
    phone_number: yup.string().required("* required"),
    booked_dates: yup
      .array()
      .min(1, "* At least one booking date is required")
      .test(
        "complete-dates",
        "* Complete all fields for each date",
        (dates) => {
          return dates?.every((date) => date?.date && date.from && date.to);
        }
      )
      .test("valid-times", "* End time must be after start time", (dates) => {
        if (!dates) return true;
        return dates.every((date) => {
          if (!date?.date || !date?.from || !date?.to) return true;

          // Convert to minutes since midnight for simple comparison
          const fromMins = convertTimeToMinutes(date.from);
          const toMins = convertTimeToMinutes(date.to);

          return toMins > fromMins;
        });
      })
      .test("no-overlap", "* Time slots overlap", (dates) => {
        if (!dates || dates.length < 2) return true;

        // Check all pairs for overlaps
        for (let i = 0; i < dates.length; i++) {
          for (let j = i + 1; j < dates.length; j++) {
            if (dates[i].date !== dates[j].date) continue;

            const slot1 = dates[i];
            const slot2 = dates[j];

            if (doTimeSlotsOverlap(slot1, slot2)) {
              return false;
            }
          }
        }
        return true;
      }),
  });

  // Helper functions
  const convertTimeToMinutes = (timeStr: string): number => {
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    let total = hours * 60 + minutes;
    if (period === "PM" && hours !== 12) total += 12 * 60;
    if (period === "AM" && hours === 12) total -= 12 * 60;
    return total;
  };

  const doTimeSlotsOverlap = (slot1: any, slot2: any): boolean => {
    const s1Start = convertTimeToMinutes(slot1.from);
    const s1End = convertTimeToMinutes(slot1.to);
    const s2Start = convertTimeToMinutes(slot2.from);
    const s2End = convertTimeToMinutes(slot2.to);

    return (
      (s1Start >= s2Start && s1Start < s2End) ||
      (s2Start >= s1Start && s2Start < s1End)
    );
  };

  return (
    <View style={tw`flex-1 bg-base`}>
      <BackWithComponent
        onPress={() => router.back()}
        title={`${selectVehicle?.title} - ${selectVehicle?.code}`}
      />

      <Formik
        initialValues={{
          renter_name: "",
          phone_number: "",
          booked_dates: [
            {
              date: "",
              from: "",
              to: "",
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={handleBookingCar}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          isValid,
          dirty,
        }) => (
          <>
            <ScrollView
              keyboardShouldPersistTaps="always"
              contentContainerStyle={tw`px-4 py-4 gap-5`}
            >
              <View style={tw`gap-4 pb-5`}>
                <View style={tw`gap-1`}>
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

                <View style={tw`gap-1`}>
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
                  <View style={tw`gap-2`}>
                    {values.booked_dates?.map((date, index: number) => (
                      <RenderDateAndTimePicker
                        key={index}
                        index={index}
                        selectVehicleDate={selectVehicle}
                        date={date}
                        setMesError={setMesError}
                        values={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                      />
                    ))}
                    <IButton
                      containerStyle={tw`h-10 my-3 w-[50%] self-center rounded-lg bg-primary`}
                      svg={IconPlusWhite}
                      onPress={() => {
                        // Only allow adding new date if all previous dates are complete
                        const allComplete = values.booked_dates.every(
                          (d) => d.date && d.from && d.to
                        );

                        if (allComplete) {
                          setFieldValue("booked_dates", [
                            ...values.booked_dates,
                            {
                              date: "",
                              from: "",
                              to: "",
                            },
                          ]);
                        } else {
                          Alert.alert(
                            "Complete Current Booking",
                            "Please complete all fields for the current booking before adding another."
                          );
                        }
                      }}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={tw`my-5 mx-4`}>
              <TButton
                onPress={handleSubmit}
                title="Book"
                disabled={
                  !isValid ||
                  !dirty ||
                  mesError ||
                  Object.keys(errors).length > 0
                }
              />
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
  setMesError,
}: {
  index: number;
  selectVehicleDate: any;
  values: any;
  setFieldValue: any;
  date: any;
  errors: any;
  setMesError: any;
}) => {
  const [dateModal, setDateModal] = useState(false);
  const [startTimeModal, setStartTimeModal] = useState(false);
  const [endTimeModal, setEndTimeModal] = useState(false);

  const handleDateChange = (selectedDate: string) => {
    const updatedDates = [...values.booked_dates];
    updatedDates[index] = {
      ...updatedDates[index],
      date: selectedDate[0],
      from: "",
      to: "",
    };
    setFieldValue("booked_dates", updatedDates);
  };

  const handleTimeChange = (time: Date, field: "from" | "to") => {
    const updatedDates = [...values.booked_dates];
    updatedDates[index] = {
      ...updatedDates[index],
      [field]: dayjs(time).format("h:mm A"),
    };
    setFieldValue("booked_dates", updatedDates);
  };

  const { data: checkAvailability, isFetching } = useGetCheckAvailabilityQuery(
    {
      vehicle_id: selectVehicleDate?.id,
      date: date?.date,
      from: date?.from,
      to: date?.to,
    },
    {
      skip: !date?.date || !date?.from || !date?.to,
    }
  );

  useEffect(() => {
    if (!checkAvailability?.data?.is_available) {
      setMesError(checkAvailability?.data?.availability_message);
    } else {
      setMesError(null);
    }
  }, [checkAvailability]);

  return (
    <View style={tw`gap-2 bg-white p-2 rounded-md`}>
      <View style={tw`gap-2`}>
        <TouchableOpacity onPress={() => setDateModal(true)}>
          <View style={tw`p-2 rounded-md border border-gray-200`}>
            <Text
              style={tw`text-sm ${date.date ? "text-black" : "text-gray-500"}`}
            >
              {date.date || "Select date"}
            </Text>
          </View>
        </TouchableOpacity>
        <DateModal
          item={selectVehicleDate}
          selectedDate={handleDateChange}
          visible={dateModal}
          setVisible={setDateModal}
        />
        {errors.booked_dates?.[index]?.date && (
          <Text style={tw`text-red-500 text-xs font-PoppinsRegular`}>
            {errors.booked_dates[index].date}
          </Text>
        )}
      </View>

      <View style={tw`gap-2 flex-row`}>
        <View style={tw`flex-1`}>
          <TouchableOpacity
            onPress={() => {
              if (!values.booked_dates[index]?.date) {
                Alert.alert("Please select a date first");
                return;
              }
              setStartTimeModal(true);
            }}
          >
            <View
              style={tw`bg-gray-50 h-12 px-2 rounded-md flex-row items-center justify-between`}
            >
              <Text
                style={tw`text-sm ${
                  date.from ? "text-black" : "text-gray-500"
                }`}
              >
                {date.from || "Select start time"}
              </Text>
              <SvgXml xml={IconCalendar} />
            </View>
          </TouchableOpacity>
          <DatePicker
            modal
            mode="time"
            open={startTimeModal}
            date={new Date()}
            onConfirm={(time) => {
              handleTimeChange(time, "from");
              setStartTimeModal(false);
            }}
            onCancel={() => setStartTimeModal(false)}
          />
          {errors.booked_dates?.[index]?.from && (
            <Text style={tw`text-red-500 text-xs font-PoppinsRegular`}>
              {errors.booked_dates[index].from}
            </Text>
          )}
        </View>

        <View style={tw`flex-1`}>
          <TouchableOpacity
            onPress={() => {
              if (!values.booked_dates[index]?.from) {
                Alert.alert("Please select start time first");
                return;
              }
              setEndTimeModal(true);
            }}
          >
            <View
              style={tw`bg-gray-50 h-12 px-2 rounded-md flex-row items-center justify-between`}
            >
              <Text
                style={tw`text-sm ${date.to ? "text-black" : "text-gray-500"}`}
              >
                {date.to || "Select end time"}
              </Text>
              <SvgXml xml={IconCalendar} />
            </View>
          </TouchableOpacity>
          <DatePicker
            modal
            mode="time"
            open={endTimeModal}
            date={new Date()}
            onConfirm={(time) => {
              handleTimeChange(time, "to");
              setEndTimeModal(false);
            }}
            onCancel={() => setEndTimeModal(false)}
          />
          {errors.booked_dates?.[index]?.to && (
            <Text style={tw`text-red-500 text-xs font-PoppinsRegular`}>
              {errors.booked_dates[index].to}
            </Text>
          )}
        </View>
      </View>

      {index > 0 && (
        <TouchableOpacity
          style={tw`self-end`}
          onPress={() => {
            const newDates = [...values.booked_dates];
            newDates.splice(index, 1);
            setFieldValue("booked_dates", newDates);
          }}
        >
          <Text style={tw`text-red-500 text-xs`}>Remove this booking</Text>
        </TouchableOpacity>
      )}

      <View style={tw`self-end`}>
        {checkAvailability?.data ? (
          <>
            {isFetching ? (
              <ActivityIndicator color={PrimaryColor} size="small" />
            ) : checkAvailability?.data?.is_available ? (
              <Text style={tw`text-xs text-green-600`}>
                {checkAvailability?.data?.availability_message}
              </Text>
            ) : (
              <Text style={tw`text-xs text-red-600`}>
                {checkAvailability?.data?.availability_message}
              </Text>
            )}
          </>
        ) : (
          <>
            {!values.booked_dates[index]?.date && (
              <Text style={tw`text-xs text-gray-600`}>Select a date</Text>
            )}
            {values.booked_dates[index]?.date &&
              !values.booked_dates[index]?.from && (
                <Text style={tw`text-xs text-gray-600`}>Select start time</Text>
              )}
            {values.booked_dates[index]?.date &&
              values.booked_dates[index]?.from &&
              !values.booked_dates[index]?.to && (
                <Text style={tw`text-xs text-gray-600`}>Select end time</Text>
              )}
          </>
        )}
      </View>
    </View>
  );
};
