import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import dayjs from "dayjs";
import { Calendar } from "react-native-calendars";

const bookedDates = ["2025-03-10", "2025-03-15", "2025-03-18"]; // Example booked dates

const DatePickerScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRange, setSelectedRange] = useState({});

  const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");

  const handleSingleDateSelect = (day) => {
    setSelectedDate(day.dateString);
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select a Date</Text>
      <Calendar
        markedDates={getMarkedDates()}
        onDayPress={handleSingleDateSelect}
      />

      <Text style={styles.heading}>Select a Date Range</Text>
      <Calendar
        markedDates={getMarkedDates()}
        markingType="period"
        onDayPress={handleRangeSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default DatePickerScreen;
