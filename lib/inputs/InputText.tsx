import { TextField, TextFieldProps } from "react-native-ui-lib"; // Import the type for TextField props

import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

interface InputTextProps
  extends Omit<TextFieldProps, "containerStyle" | "fieldStyle"> {
  onPress?: () => void;
  svgFirstIcon?: string;

  containerStyle?: any;
  fieldStyle?: any;
  Component?: React.ReactNode;
  focusSTyle?: any;
  ref?: any;
  label?: string;
  labelStyle?: any;
  required?: boolean;
  errorText?: string;
  touched?: boolean;
}
const InputText = ({
  onPress,
  svgFirstIcon,
  containerStyle,
  fieldStyle,
  focusSTyle,
  Component,
  ref,
  label,
  errorText,
  required,
  touched,
  labelStyle,
  ...inputProps // Spread remaining props to pass to TextField
}: InputTextProps) => {
  const [focus, setFocus] = React.useState(false);
  return (
    <View style={[tw`flex-row  `, focus && focusSTyle]}>
      <TextField
        ref={ref}
        placeholderTextColor={"#B0B0B0"}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        containerStyle={[tw`w-full`]}
        white
        fieldStyle={[
          tw`${inputProps?.floatingPlaceholder ? "pb-4" : "p-0"}`,
          fieldStyle,
        ]}
        {...inputProps} // Spread props here
      />
      {svgFirstIcon && <SvgXml xml={svgFirstIcon} />}
    </View>
  );
};

export default InputText;
