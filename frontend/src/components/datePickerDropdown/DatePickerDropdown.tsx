import { useState } from "react";
import DatePicker from "react-datepicker";

interface DatePickerDropdownProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (range: { startDate?: Date; endDate?: Date }) => void;
}

export const DatePickerDropdown: React.FC<DatePickerDropdownProps> = (props) => {
  const { startDate: initialStartDate, endDate: initialEndDate, onChange } = props;

  // States
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const handleChange = (range: (Date | undefined)[]) => {
    const [startDate, endDate] = range;

    setStartDate(startDate);
    setEndDate(endDate);

    if (startDate === undefined || endDate === undefined) {
      return;
    }

    onChange({ startDate, endDate });
  };

  console.log("Start date: ", startDate);
  console.log("End date: ", endDate);

  return (
    <div id="DatePickerContainer">
      <DatePicker
        selected={startDate ?? new Date()}
        onChange={(e) => {
          console.log("hi there");
          console.log(e);

          handleChange(e as (Date | undefined)[]);
        }}
        startDate={startDate ?? new Date()}
        endDate={endDate}
        placeholderText="Select Dates"
        selectsRange
      />
    </div>
  );
};
