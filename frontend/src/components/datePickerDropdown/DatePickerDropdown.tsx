import { useState } from "react";
import DatePicker from "react-datepicker";

interface DatePickerDropdownProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (range: { startDate: Date | null; endDate: Date | null }) => void;
  placeholderText: string;
}

export const DatePickerDropdown: React.FC<DatePickerDropdownProps> = (props) => {
  const { startDate: initialStartDate, endDate: initialEndDate, onChange, placeholderText } = props;

  // States
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const handleChange = (range: (Date | null)[]) => {
    const [startDate, endDate] = range;

    setStartDate(startDate);
    setEndDate(endDate);

    onChange({ startDate, endDate });
  };

  return (
    <div id="DatePickerContainer">
      <DatePicker
        selected={startDate ?? new Date()}
        onChange={(e) => {
          handleChange(e as (Date | null)[]);
        }}
        startDate={startDate}
        endDate={endDate}
        placeholderText={placeholderText}
        selectsRange
      />
    </div>
  );
};
