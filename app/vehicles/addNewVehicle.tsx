import * as yup from "yup";

import {
  useAddVehicleMutation,
  useGetCategoriesQuery,
} from "@/redux/apiSlices/manageApiSlices";
import { Image, ScrollView, Text, TextInput, View } from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import TButton from "@/lib/buttons/TButton";
import { useToast } from "@/lib/modals/Toaster";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";

const addNewVehicle = () => {
  const router = useRouter();
  const { showToast, closeToast } = useToast();

  const { data: categories } = useGetCategoriesQuery({});

  const [addNewVehicle] = useAddVehicleMutation();

  const addVehicleSchema = yup.object().shape({
    name: yup.string().required("* required"),
    category_id: yup.number().required("* required"),
    number_plate: yup.string().required("* required"),
  });

  const handleAddNewVehicle = async (values: any) => {
    try {
      addNewVehicle(values).unwrap();
      router?.navigate("/(tabs)/");
    } catch (error) {
      console.log(error);
      showToast({
        title: "Warning",
        content: error.message,
      });
    }
  };

  return (
    <View style={tw` flex-1 bg-base`}>
      {/* header part  */}
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        titleStyle={tw``}
        title={`Add Vehicles`}
      />
      <Formik
        initialValues={{ name: "", category_id: "", number_plate: "" }}
        onSubmit={(values) => handleAddNewVehicle(values)}
        validationSchema={addVehicleSchema}
        validateOnSubmit={true}
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
                      Car Name{" "}
                    </Text>
                    {errors.name && (
                      <Text
                        style={tw`text-red-500 text-xs font-PoppinsRegular`}
                      >
                        {errors.name}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    placeholder="Enter vehicles name"
                    style={tw`bg-white h-12 rounded-md px-2`}
                  />
                </View>
                <View style={tw`gap-1 `}>
                  <View style={tw`flex-row items-center`}>
                    <Text
                      style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                    >
                      Category
                    </Text>
                    {errors.name && (
                      <Text
                        style={tw`text-red-500 text-xs font-PoppinsRegular`}
                      >
                        {errors.name}
                      </Text>
                    )}
                  </View>
                  <Dropdown
                    style={tw`bg-white h-12 px-2 rounded-md`}
                    placeholderStyle={tw`text-gray-500 text-sm`}
                    itemContainerStyle={tw`bg-transparent`}
                    data={categories?.data || []}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder="Select item"
                    value={values.category_id}
                    onChange={(item) => {
                      // console.log(item);
                      setFieldValue("category_id", item?.id);
                    }}
                    renderItem={(item) => {
                      return (
                        <View
                          style={tw`m-1 p-3 gap-1 flex-row items-center bg-transparent justify-between border border-gray-200 rounded-md`}
                        >
                          <Text
                            style={tw`text-base text-black font-PoppinsMedium`}
                          >
                            {item?.name}
                          </Text>
                          <Image
                            style={tw`h-6 w-6`}
                            source={{
                              uri: item?.icon,
                            }}
                          />
                        </View>
                      );
                    }}
                  />
                </View>

                <View style={tw`gap-1 `}>
                  <View style={tw`flex-row items-center`}>
                    <Text
                      style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                    >
                      Number Plate
                    </Text>
                    {errors.name && (
                      <Text
                        style={tw`text-red-500 text-xs font-PoppinsRegular`}
                      >
                        {errors.name}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    onChangeText={handleChange("number_plate")}
                    onBlur={handleBlur("number_plate")}
                    value={values.number_plate}
                    placeholder="Enter number plate"
                    style={tw`bg-white h-12 rounded-md px-2`}
                  />
                </View>
              </View>
            </ScrollView>
            <View style={tw`my-5 mx-4`}>
              <TButton onPress={handleSubmit} title="Add" />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default addNewVehicle;
