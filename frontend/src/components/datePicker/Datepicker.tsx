import React, { useState } from "react";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"; // Ensure you import the CSS


export default function DatePickerDropdown() {

// States
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleChange = (range) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div id="DatePickerContainer">
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        placeholderText="Select Dates"
        selectsRange/>
    </div>
  );
}