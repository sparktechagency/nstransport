import * as yup from "yup";

import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import TButton from "@/lib/buttons/TButton";
import { useToast } from "@/lib/modals/Toaster";
import tw from "@/lib/tailwind";
import { useCustomerUpdateMutation } from "@/redux/apiSlices/homeApiSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Formik } from "formik";

export default function booking() {
  const { closeToast, showToast } = useToast();
  const [customerUpdate] = useCustomerUpdateMutation();
  const router = useRouter();
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    AsyncStorage.getItem("order").then((item) => {
      const data = JSON.parse(item);
      setCustomer(data?.customer);
    });
  }, []);

  //   console.log(customer);

  const handleBookingCar = async (values: any) => {
    try {
      values._method = "PUT";
      //   console.log(values);
      const res = await customerUpdate({
        id: customer?.id,
        data: values,
      }).unwrap();
      //   console.log(res);
      if (res?.status) {
        Alert.alert("Success", res?.message || "Booking make successfully");
        router.back();
      }
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
  });

  return (
    <View style={tw` flex-1 bg-base`}>
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        titleStyle={tw``}
        title={"Customer Update"}
      />
      <Formik
        initialValues={{
          renter_name: customer?.name || "",
          phone_number: customer?.phone || "",
        }}
        enableReinitialize
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
          setErrors,
          isValid,
          dirty,
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
              </View>
            </ScrollView>
            <View style={tw`my-5 mx-4`}>
              <TButton
                onPress={handleSubmit}
                title="Book"
                disabled={!values?.renter_name || !values?.renter_name}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
