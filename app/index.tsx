import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

import TButton from "@/lib/buttons/TButton";
import { useToast } from "@/lib/modals/Toaster";
import tw from "@/lib/tailwind";
import { useLoginMutation } from "@/redux/apiSlices/authApiSlices";
import { PrimaryColor } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { OtpInput } from "react-native-otp-entry";

const index = () => {
  const router = useRouter();

  const { showToast, closeToast } = useToast();

  const [exit, setExit] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const [otp, setOtp] = React.useState("");

  const [login, result] = useLoginMutation();

  const handleLogin = async (text: string) => {
    try {
      const res = await login({ passcode: text }).unwrap();
      await AsyncStorage.setItem("token", JSON.stringify(res?.token));
      await AsyncStorage.setItem("user", JSON.stringify(res?.user));
      router.replace("/(tabs)/");
    } catch (error) {
      console.log(error);
      showToast({
        title: "Warning",
        content: error?.error || error?.message,
        buttonText: "Close",
        buttonTextStyle: tw`text-black text-sm font-PoppinsSemiBold`,
        buttonStyle: tw` rounded-md bg-transparent border border-gray-200`,
        onPress: () => {
          closeToast();
        },
      });
    }
  };

  const handleExit = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");

    if (token) {
      setLoading(false);
      setExit(true);
      router?.dismissAll();
      router?.replace("/(tabs)");
    } else {
      setLoading(false);
      setExit(false);
    }
  };

  React.useEffect(() => {
    handleExit();
  }, []);

  return (
    <View style={tw`flex-1 bg-base justify-center items-center `}>
      {loading ? (
        <>
          <Image source={require("@/assets/images/logo.png")} />
          <ActivityIndicator size={"large"} color={PrimaryColor} />
        </>
      ) : (
        <>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={tw` justify-center items-center`}>
              <Image source={require("@/assets/images/logo.png")} />

              <Text
                style={tw`mx-[10%] text-center text-2xl text-primary font-PoppinsSemiBold`}
              >
                Please login with you passcode
              </Text>
              <View style={tw`mt-10 px-5`}>
                <OtpInput
                  numberOfDigits={6}
                  focusColor={PrimaryColor}
                  autoFocus={false}
                  hideStick={true}
                  placeholder="0"
                  blurOnFilled={true}
                  disabled={false}
                  type="numeric"
                  secureTextEntry={false}
                  focusStickBlinkingDuration={500}
                  // onFocus={() => console.log("Focused")}
                  // onBlur={() => console.log("Blurred")}
                  // onTextChange={(text) => console.log(text)}
                  onFilled={async (text) => {
                    console.log(`OTP is ${text}`);
                    setOtp(text);
                    handleLogin(text);
                  }}
                  textInputProps={{
                    accessibilityLabel: "One-Time Password",
                  }}
                  theme={{
                    containerStyle: tw``,
                    pinCodeContainerStyle: tw`h-14 w-14 justify-center items-center  `,
                    pinCodeTextStyle: tw`text-gray-800 text-5xl font-semibold  pt-2`,
                    placeholderTextStyle: tw`text-[#D5D7DA] text-5xl `,
                  }}
                />
              </View>
            </View>
            <View style={tw`w-full px-5 py-9`}>
              <TButton
                title="Login"
                containerStyle={tw`w-full `}
                onPress={() => {
                  handleLogin(otp);
                }}
              />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default index;
