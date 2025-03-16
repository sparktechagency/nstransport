import {
  IconCloseBlack,
  IconPenGreen,
  IconSearchGray,
  IconTrashGreen,
} from "@/icons/icons";
import {
  useDeleteVehicleMutation,
  useEditVehicleMutation,
  useGetCategoriesQuery,
  useGetVehiclesQuery,
} from "@/redux/apiSlices/manageApiSlices";
import { HIGHT, PrimaryColor } from "@/utils/utils";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import VehicleCard from "@/components/common/VehicleCard";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import IButton from "@/lib/buttons/IButton";
import TButton from "@/lib/buttons/TButton";
import EmptyCard from "@/lib/Empty/EmptyCard";
import NormalModal from "@/lib/modals/NormalModal";
import { useToast } from "@/lib/modals/Toaster";
import tw from "@/lib/tailwind";
import { IVehicle } from "@/redux/interface/interface";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

const mange = () => {
  const router = useRouter();
  const { showToast, closeToast } = useToast();
  const [search, setSearch] = useState("");
  const {
    data: categories,
    isLoading: categoryLoading,
    refetch: categoryRefetch,
  } = useGetCategoriesQuery({});
  const {
    data: allvehicles,
    isLoading: vehicleLoading,
    refetch: vehicleRefetch,
  } = useGetVehiclesQuery({
    page: 1,
    limit: 100,
    search: search,
  });
  const [updateVehicle] = useEditVehicleMutation();
  const [deleteVehicle] = useDeleteVehicleMutation();

  // console.log(allvehicles);

  const [VehiclesModal, setVehiclesModal] = useState(false);
  const [selectVehicles, setSelectVehicles] = useState<IVehicle | null>(null);

  const handleDeleteVehicle = (id) => {
    showToast({
      title: "Are you sure to \n Delete this vehicle ?",
      containerStyle: tw`gap-2 w-[80%]`,
      iconComponent: (
        <Image
          source={require("@/assets/images/redcar.png")}
          style={tw`h-20 w-20`}
        />
      ),
      multipleBTNStyle: tw``,
      multipleButton: [
        {
          buttonText: "Cancel",
          onPress: () => {
            closeToast();
          },
          buttonTextStyle: tw`text-black text-sm font-PoppinsSemiBold`,
          buttonStyle: tw`flex-1 rounded-md bg-transparent border`,
        },
        {
          buttonText: "Delete",
          onPress: () => {
            deleteVehicle(id)
              .then(() => {
                closeToast();
              })
              .catch((err) => {
                showToast({
                  title: "Warning",
                  content: err.message,
                });
              });
          },
          buttonTextStyle: tw`text-white text-sm font-PoppinsSemiBold`,
          buttonStyle: tw`flex-1 rounded-md bg-red-500 `,
        },
      ],
    });
  };

  const handleUpdateVehicle = async (values: any) => {
    // console.log(values);
    values._method = "PUT";
    try {
      const res = await updateVehicle({
        id: selectVehicles?.id,
        data: values,
      }).unwrap();
      setVehiclesModal(false);
      // console.log(res);
    } catch (error) {
      console.log(error);
      showToast({
        title: "Warning",
        content: error.message,
      });
    }
  };

  // console.log(selectVehicles);

  return (
    <View style={tw`flex-1 bg-base`}>
      {/* header part  */}
      <BackWithComponent offBack titleStyle={tw``} title={`Manage Vehicles`} />

      {/* body section  */}

      <View style={tw`px-4 my-2`}>
        {/* search Section  */}
        <View
          style={tw`h-12 px-3  flex-row  border border-gray-300 rounded-full items-center `}
        >
          <TextInput
            onChangeText={(text) => setSearch(text)}
            placeholder="Search"
            style={tw`text-black flex-1`}
          />
          <SvgXml xml={IconSearchGray} />
        </View>
      </View>
      {/* all Available vehicles */}
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[PrimaryColor]}
            refreshing={vehicleLoading || categoryLoading}
            onRefresh={() => {
              vehicleRefetch();
              categoryRefetch();
            }}
          />
        }
        ListEmptyComponent={
          <EmptyCard hight={HIGHT * 0.55} isLoading={vehicleLoading} />
        }
        contentContainerStyle={tw`pt-4 pb-8  gap-3 px-4`}
        data={allvehicles?.data?.data}
        renderItem={({ item, index }) => {
          return (
            <View style={tw`flex-row gap-2 items-center`}>
              <VehicleCard
                disable
                containerStyle={tw`flex-1`}
                variant="mange"
                item={item}
              />
              <View style={tw`gap-2 `}>
                <IButton
                  svg={IconPenGreen}
                  onPress={() => {
                    setSelectVehicles(item);
                    setVehiclesModal(!VehiclesModal);
                  }}
                  containerStyle={tw`h-9 w-9 rounded-md bg-[#DDFFDE]`}
                />
                <IButton
                  onPress={() => handleDeleteVehicle(item?.id)}
                  svg={IconTrashGreen}
                  containerStyle={tw`h-9 rounded-md bg-[#FFE5E5]`}
                />
              </View>
            </View>
          );
        }}
      />

      <NormalModal setVisible={setVehiclesModal} visible={VehiclesModal}>
        <ScrollView contentContainerStyle={tw`bg-white rounded-md p-3  gap-5`}>
          {/* header parts */}
          <View style={tw`flex-row justify-between items-center`}>
            <View />
            <Text style={tw`text-black font-PoppinsRegular text-base`}>
              Select vehicle
            </Text>
            <TouchableOpacity onPress={() => setVehiclesModal(false)}>
              <SvgXml xml={IconCloseBlack} />
            </TouchableOpacity>
          </View>

          <Formik
            initialValues={{ name: "", category_id: "", number_plate: "" }} // Initialize with selected vehicle or empty values
            onSubmit={(values) => handleUpdateVehicle(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
              errors,
            }) => {
              // Update form values when a vehicle is selected
              React.useEffect(() => {
                if (selectVehicles) {
                  setFieldValue("name", selectVehicles.title);
                  setFieldValue("category_id", selectVehicles.category?.id);
                  setFieldValue("number_plate", selectVehicles.code);
                }
              }, [selectVehicles]);

              return (
                <>
                  <ScrollView
                    keyboardShouldPersistTaps="always"
                    contentContainerStyle={tw`px-4  gap-5`}
                  >
                    <View style={tw`gap-4 pb-5`}>
                      {/* Car Name Field */}
                      <View style={tw`gap-1`}>
                        <View style={tw`flex-row items-center`}>
                          <Text
                            style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                          >
                            Car Name
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
                          style={tw`bg-[#F0F0F0] h-12 rounded-md px-2`}
                        />
                      </View>

                      {/* Category Dropdown */}
                      <View style={tw`gap-1`}>
                        <View style={tw`flex-row items-center`}>
                          <Text
                            style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                          >
                            Category
                          </Text>
                        </View>
                        <Dropdown
                          style={tw`bg-[#F0F0F0] h-12 px-2 rounded-md`}
                          placeholderStyle={tw`text-gray-500 text-sm`}
                          itemContainerStyle={tw`bg-transparent`}
                          data={categories?.data || []}
                          maxHeight={300}
                          labelField="name"
                          valueField="id"
                          placeholder="Select item"
                          value={values.category_id}
                          onChange={(item) => {
                            setFieldValue("category_id", item?.id);
                          }}
                          renderItem={(item) => (
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
                                source={{ uri: item?.icon }}
                              />
                            </View>
                          )}
                        />
                      </View>

                      {/* Number Plate Field */}
                      <View style={tw`gap-1`}>
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
                          style={tw`bg-[#F0F0F0] h-12 rounded-md px-2`}
                        />
                      </View>
                    </View>
                  </ScrollView>
                  <View style={tw`mb-4 mx-4`}>
                    <TButton onPress={handleSubmit} title="Save changes" />
                  </View>
                </>
              );
            }}
          </Formik>
        </ScrollView>
      </NormalModal>
    </View>
  );
};

export default mange;
