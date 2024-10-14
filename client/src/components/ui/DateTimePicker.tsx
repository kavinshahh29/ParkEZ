import React, { useState } from "react";

type DateTimePickerProps = {
  label: string;
  selectedDateTime: Date | null;
  onChange: (value: Date) => void;
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  selectedDateTime,
  onChange,
}) => {
  const [date, setDate] = useState(selectedDateTime || new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    const updatedDate = new Date(
      newDate.setHours(date.getHours(), date.getMinutes())
    );
    setDate(updatedDate);
    onChange(updatedDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":")?.map(Number);
    const updatedDate = new Date(date.setHours(hours, minutes));
    setDate(updatedDate);
    onChange(updatedDate);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex items-center space-x-2">
        {/* Date Picker */}
        <input
          type="date"
          className="border-gray-300 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
          value={date.toISOString().substr(0, 10)}
          onChange={handleDateChange}
          onFocus={() => setIsDatePickerOpen(true)}
          onBlur={() => setIsDatePickerOpen(false)}
        />
        {/* Time Picker */}
        <input
          type="time"
          className="border-gray-300 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={`${String(date.getHours()).padStart(2, "0")}:${String(
            date.getMinutes()
          ).padStart(2, "0")}`}
          onChange={handleTimeChange}
          onFocus={() => setIsTimePickerOpen(true)}
          onBlur={() => setIsTimePickerOpen(false)}
        />
      </div>

      {/* Dropdown indicators */}
      {isDatePickerOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded shadow-lg p-4">
          <p className="text-gray-700 dark:text-gray-300">Select a date</p>
        </div>
      )}

      {isTimePickerOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded shadow-lg p-4">
          <p className="text-gray-700 dark:text-gray-300">Select a time</p>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
