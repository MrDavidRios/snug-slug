import { useState } from "react";
import DatePicker from "react-datepicker";

interface DatePickerDropdownProps {
  startDate: Date;
  endDate: Date;
  onChange: (range: { startDate: Date; endDate: Date }) => void;
}

export const DatePickerDropdown: React.FC<DatePickerDropdownProps> = (props) => {
  const { startDate: initialStartDate, endDate: initialEndDate, onChange } = props;

  // States
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const handleChange = (range: Date[]) => {
    const [startDate, endDate] = range;

    setStartDate(startDate);
    setEndDate(endDate);

    if (startDate === null || endDate === null) {
      return;
    }

    onChange({ startDate, endDate });
  };

  return (
    <div id="DatePickerContainer">
      <DatePicker
        selected={startDate}
        onChange={(e) => {
          handleChange(e as Date[]);
        }}
        startDate={startDate}
        endDate={endDate}
        allowSameDay={false}
        placeholderText="Select Dates"
        isClearable={true}
        selectsRange
      />
    </div>
  );
};
