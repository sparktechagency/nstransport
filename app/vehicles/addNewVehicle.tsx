import { Image, ScrollView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import { Dropdown } from "react-native-element-dropdown";
import { Formik } from "formik";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const data = [
  {
    label: "Sprinter",
    value: "sprinter",
    source: require("@/assets/images/sprinter.png"),
  },
  {
    label: "Car transporter",
    value: "transporter",
    source: require("@/assets/images/transporter.png"),
  },
  {
    label: "Trailer",
    value: "trailer",
    source: require("@/assets/images/trailer.png"),
  },
];
const addNewVehicle = () => {
  const router = useRouter();

  const [selectCategory, setSelectCategory] = useState();
  const [selectVehicles, setSelectVehicles] = useState(null);

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
        initialValues={{ name: "", category: "", code: "" }}
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
                    Car Name
                  </Text>
                  <TextInput
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    placeholder="Enter vehicles name"
                    style={tw`bg-white h-12 rounded-md px-2`}
                  />
                </View>
                <View style={tw`gap-1 `}>
                  <Text
                    style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                  >
                    Category
                  </Text>
                  <Dropdown
                    style={tw`bg-white h-12 px-2 rounded-md`}
                    placeholderStyle={tw`text-gray-500 text-sm`}
                    itemContainerStyle={tw`bg-transparent`}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select item"
                    value={values.category}
                    onChange={(item) => {
                      handleChange("category")(item.value);
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
                          <Image style={tw`h-6 w-6`} source={item?.source} />
                        </View>
                      );
                    }}
                  />
                </View>
                <View style={tw`gap-1 `}>
                  <Text
                    style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                  >
                    Number Plate
                  </Text>
                  <TextInput
                    onChangeText={handleChange("code")}
                    onBlur={handleBlur("code")}
                    value={values.code}
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
