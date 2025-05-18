import React, { useState } from "react";

import dayjs from "dayjs";
import { Calendar } from "react-native-calendars";
import tw from "../tailwind";

interface DateModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: (dates: string[]) => void;
  item?: any;
  range?: boolean;
}

const formatDate = (date: any) => dayjs(date).format("YYYY-MM-DD");

const DateModal = ({
  setVisible,
  visible,
  item,
  range,
  selectedDate,
}: DateModalProps) => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  // const [bookedDates, setBookedDates] = useState<string[]>([]);
  const bookedDates = new Set(item?.booked ? item?.booked : []);

  const handleDateSelect = (day: any) => {
    const selectedDay = day.dateString;
    const today = dayjs().startOf("day");
    const selectedDateObj = dayjs(selectedDay);

    // Don't allow selection of past dates
    if (selectedDateObj.isBefore(today, "day")) {
      return;
    }

    if (!range) {
      // Single date selection
      setSelectedDates([selectedDay]);
      selectedDate([selectedDay]);
      setVisible(false);
    } else {
      // Multiple date selection (array)
      setSelectedDates((prevDates) => {
        if (prevDates.includes(selectedDay)) {
          return prevDates.filter((date) => date !== selectedDay); // Deselect if already selected
        } else if (!bookedDates.has(selectedDay)) {
          return [...prevDates, selectedDay]; // Add new date if not booked
        }
        return prevDates;
      });
    }
  };

  const getMarkedDates = () => {
    let marked: Record<string, any> = {};
    const today = dayjs().startOf("day");

    // Mark booked dates as disabled
    if (item?.booked) {
      item.booked.forEach((date: string) => {
        marked[date] = {
          disabled: true,
          disableTouchEvent: true,
          customStyles: {
            container: tw`bg-red-500 rounded-full`,
            text: tw`text-white font-bold`,
          },
        };
      });
    }

    // Mark selected dates
    selectedDates.forEach((date) => {
      marked[date] = {
        customStyles: {
          container: tw`bg-sky-600 rounded-full`,
          text: tw`text-white font-bold`,
        },
      };
    });

    // Highlight today's date
    const todayStr = formatDate(new Date());
    if (!marked[todayStr]) {
      marked[todayStr] = {
        customStyles: {
          container: tw`bg-primary rounded-full`,
          text: {
            color: "white",
            fontWeight: "bold",
          },
        },
      };
    }

    // Disable all past dates
    Object.keys(marked).forEach((date) => {
      if (dayjs(date).isBefore(today, "day")) {
        marked[date] = {
          ...marked[date],
          disabled: true,
          disableTouchEvent: true,
          customStyles: {
            container: tw`bg-gray-300 rounded-full`,
            text: tw`text-gray-500`,
          },
        };
      }
    });

    // Also disable all dates before today that aren't already marked
    // This requires a more comprehensive approach with the calendar library
    // We'll handle this in the minDate prop of the Calendar component

    return marked;
  };

  return (
    // <NormalModal
    //   animationType="fade"
    //   visible={visible}
    //   setVisible={setVisible}
    //   layerContainerStyle={tw`justify-center items-center flex-1 px-[4%] `}
    //   containerStyle={tw`rounded-2xl bg-white`}
    // >
    <Calendar
      theme={theme}
      markingType="custom"
      markedDates={getMarkedDates()}
      onDayPress={handleDateSelect}
      minDate={formatDate(new Date())} // This prevents selection of past dates
    />
    // {range && (
    //   <TButton
    //     disabled={selectedDates.length === 0}
    //     title="Done"
    //     containerStyle={tw`mt-4`}
    //     onPress={() => {
    //       selectedDate(selectedDates);
    //       setVisible(false);
    //     }}
    //   />
    // )}
    // </NormalModal>
  );
};

export default DateModal;

const theme = {
  stylesheet: {
    calendar: {
      header: {
        dayHeader: {
          fontWeight: "600",
          color: "#48BFE3",
        },
        monthText: {
          textAlign: "left",
          fontWeight: "bold",
          fontSize: 18,
          marginLeft: 10,
        },
      },
    },
  },
  "stylesheet.day.basic": {
    today: tw`bg-primary rounded-full`,
    todayText: tw`text-white`,
  },
  "stylesheet.day.single": {
    base: tw`border border-red-500`,
    text: tw`text-red-500 font-bold`,
  },
};
