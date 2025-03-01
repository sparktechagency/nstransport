import { Dialog, PanningProvider } from "react-native-ui-lib";

import React from "react";
import { Pressable } from "react-native";
import tw from "../tailwind";

interface SideModalProps {
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  layerContainerStyle?: any;
  containerStyle?: any;
  children?: React.ReactNode;
  scrollable?: boolean;
  headerOff?: boolean;
  closeBTN?: boolean;
}

const SideModal = ({
  children,
  containerStyle,
  setVisible,
  visible,
  headerOff,
  closeBTN,
}: SideModalProps) => {
  return (
    <>
      {visible && (
        <Dialog
          width={"100%"}
          // height={Ios ? height - height * 0.4 : '100%'}
          ignoreBackgroundPress={false}
          visible={visible || false}
          bottom={true}
          onDismiss={() => setVisible && setVisible(false)}
          panDirection={PanningProvider.Directions.DOWN}
          containerStyle={tw` bg-base rounded-t-2xl`}
        >
          <Pressable disabled style={[tw`bg-white py-1 `, containerStyle]}>
            {children}
          </Pressable>
        </Dialog>
      )}
    </>
  );
};

export default SideModal;
