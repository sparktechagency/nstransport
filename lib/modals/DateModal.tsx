import React, { useState } from "react";

import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import tw from "../tailwind";
import NormalModal from "./NormalModal";

interface DateModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate?: React.Dispatch<React.SetStateAction<Date>>;
}
const bookedDates = ["2025-03-10", "2025-03-15", "2025-03-18"]; // Example booked dates
const DateModal = ({ setVisible, visible }: DateModalProps) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRange, setSelectedRange] = useState({});

  const getMarkedDates = () => {
    let marked = {};

    // Highlight selected date
    if (selectedDate) {
      marked[selectedDate] = { selected: true, selectedColor: "blue" };
    }

    // Highlight booked dates in red
    bookedDates.forEach((date) => {
      marked[date] = { marked: true, dotColor: "red" };
    });

    // Highlight date range
    if (selectedRange.startDate) {
      marked[selectedRange.startDate] = {
        startingDay: true,
        color: "green",
        textColor: "white",
      };
    }

    if (selectedRange.endDate) {
      marked[selectedRange.endDate] = {
        endingDay: true,
        color: "green",
        textColor: "white",
      };

      let currentDate = dayjs(selectedRange.startDate);
      let endDate = dayjs(selectedRange.endDate);

      while (currentDate.isBefore(endDate)) {
        currentDate = currentDate.add(1, "day");
        const formattedDate = formatDate(currentDate);
        if (formattedDate !== selectedRange.endDate) {
          marked[formattedDate] = { color: "lightgreen", textColor: "black" };
        }
      }
    }

    return marked;
  };

  const handleRangeSelect = (day) => {
    if (!selectedRange.startDate) {
      setSelectedRange({ startDate: day.dateString, endDate: null });
    } else if (!selectedRange.endDate) {
      setSelectedRange((prev) => ({
        ...prev,
        endDate: day.dateString,
      }));
    } else {
      setSelectedRange({ startDate: day.dateString, endDate: null });
    }
  };

  const handleSingleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };
  console.log(getMarkedDates());
  return (
    <>
      <NormalModal
        animationType="fade"
        visible={visible}
        setVisible={setVisible}
        layerContainerStyle={tw`justify-center items-center flex-1 px-[4%] `}
        containerStyle={tw`rounded-2xl bg-white`}
      >
        <View style={tw`bg-white`}>
          <Calendar
            markedDates={{
              "2025-02-01": {
                selected: true,
                disableTouchEvent: false,
                // marked: true,
                selectedDotColor: "red",
                selectedColor: "red",
              },
            }}
            onDayPress={handleSingleDateSelect}
          />
        </View>
      </NormalModal>
    </>
  );
};

export default DateModal;
