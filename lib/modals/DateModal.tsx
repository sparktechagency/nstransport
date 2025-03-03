import React, { useState } from "react";

import { Calendar } from "react-native-calendars";
import NormalModal from "./NormalModal";
import TButton from "../buttons/TButton";
import dayjs from "dayjs";
import tw from "../tailwind";

interface DateModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: (date: any) => void;
  item?: any;
  range?: boolean;
  selectRangeDate?: (date: any) => void;
}

const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");

const DateModal = ({
  setVisible,
  visible,
  item,
  range,
  selectedDate,
}: DateModalProps) => {
  const [selectedRange, setSelectedRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  const bookedDates = new Set(item?.booked || []); // Convert booked dates into a Set for fast lookup

  const handleSingleDateSelect = (day) => {
    selectedDate(day);
    setVisible(false);
  };

  const handleRangeSelect = (day) => {
    const selectedDay = day.dateString;

    if (!selectedRange.startDate || selectedRange.endDate) {
      // Set or reset the start date
      setSelectedRange({ startDate: selectedDay, endDate: undefined });
    } else {
      // Check if the selected range includes booked dates
      let currentDate = dayjs(selectedRange.startDate).add(1, "day");
      let endDate = dayjs(selectedDay);
      let hasBookedDate = false;

      while (currentDate.isBefore(endDate, "day")) {
        if (bookedDates.has(formatDate(currentDate))) {
          hasBookedDate = true;
          break;
        }
        currentDate = currentDate.add(1, "day");
      }

      if (
        !hasBookedDate &&
        dayjs(selectedDay).isAfter(dayjs(selectedRange.startDate))
      ) {
        // Only set end date if it does not include booked dates
        setSelectedRange((prev) => ({
          ...prev,
          endDate: selectedDay,
        }));
      } else {
        // Reset if the range is invalid (contains booked dates)
        setSelectedRange({ startDate: selectedDay, endDate: undefined });
      }
    }
  };

  // Mark existing booked dates
  const exitingMarking = item?.booked?.reduce((acc, date) => {
    acc[date] = {
      disabled: true,
      disableTouchEvent: true,
      color: "#FF6060",
      textColor: "white",
      customStyles: {
        container: {
          backgroundColor: "#FF6060", // Red background for booked dates
          borderRadius: 20, // Rounded effect
        },
        text: {
          color: "white", // White text
          fontWeight: "bold",
        },
      },
    };
    return acc;
  }, {});

  const getMarkedDates = () => {
    let marked = exitingMarking ? { ...exitingMarking } : {};

    if (selectedRange.startDate) {
      marked[selectedRange.startDate] = {
        startingDay: true,
        customStyles: {
          container: {
            backgroundColor: "#004080", // Dark Blue for Start Date
            borderRadius: 20, // Rounded effect
          },
          text: {
            color: "white",
            fontWeight: "bold",
          },
        },
      };
    }

    if (selectedRange.endDate) {
      marked[selectedRange.endDate] = {
        endingDay: true,
        customStyles: {
          container: {
            backgroundColor: "#004080", // Dark Blue for End Date
            borderRadius: 20,
          },
          text: {
            color: "white",
            fontWeight: "bold",
          },
        },
      };

      // Fill the dates in between start and end date
      let currentDate = dayjs(selectedRange.startDate).add(1, "day");
      let endDate = dayjs(selectedRange.endDate);

      while (currentDate.isBefore(endDate, "day")) {
        const formattedDate = formatDate(currentDate);

        if (!bookedDates.has(formattedDate)) {
          marked[formattedDate] = {
            customStyles: {
              container: {
                backgroundColor: "#87CEFA", // Sky Blue for Range
                borderRadius: 10,
              },
              text: {
                color: "black",
              },
            },
          };
        }

        currentDate = currentDate.add(1, "day");
      }
    }

    // Highlight today's date
    const today = formatDate(new Date());
    if (!marked[today]) {
      marked[today] = {
        customStyles: {
          container: {
            backgroundColor: "#008000", // Green for Today's Date
            borderRadius: 20,
          },
          text: {
            color: "white",
            fontWeight: "bold",
          },
        },
      };
    }

    return marked;
  };

  return (
    <>
      <NormalModal
        animationType="fade"
        visible={visible}
        setVisible={setVisible}
        layerContainerStyle={tw`justify-center items-center flex-1 px-[4%] `}
        containerStyle={tw`rounded-2xl bg-white`}
      >
        <Calendar
          theme={theme}
          markingType="custom"
          markedDates={getMarkedDates()}
          onDayPress={(date) =>
            range
              ? handleRangeSelect(date)
              : handleSingleDateSelect(date.dateString)
          }
        />
        <TButton
          disabled={!selectedRange.startDate || !selectedRange.endDate}
          title="Done"
          containerStyle={tw`mt-4`}
          onPress={() => {
            setSelectedRange && setSelectedRange(selectedRange);
            setVisible && setVisible(false);
          }}
        />
      </NormalModal>
    </>
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
          textAlign: "left", // Align the month name to start (left)
          fontWeight: "bold",
          fontSize: 18,
          marginLeft: 10, // Optional for spacing
        },
      },
    },
  },
  "stylesheet.day.basic": {
    today: tw`bg-primary rounded-full`,
    todayText: tw`text-white`,
  },
  // Custom styles for marked dates
  "stylesheet.day.single": {
    base: tw`border border-red-500`, // Add border to marked dates
    text: tw`text-red-500 font-bold`, // Make text red
  },
};
