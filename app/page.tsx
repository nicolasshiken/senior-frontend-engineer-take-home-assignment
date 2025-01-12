"use client";
import {
  DropdownSelect,
  IOption,
} from "@/components/DropdownSelect/DropdownSelect";
// import { useState } from "react";

const OPTIONS = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "yellow", label: "Yellow" },
  { value: "orange", label: "Orange" },
  { value: "pink", label: "Pink" },
  { value: "purple", label: "Purple" },
];

export default function Home() {
  // const [value, setValue] = useState<IOption>(OPTIONS[5]);

  const handleChange = (option: IOption) => {
    console.log({ option });
    // setValue(option);
  };

  return (
    <main className="p-4">
      {/* {value?.label} */}
      <DropdownSelect
        options={OPTIONS}
        onChange={handleChange}
        label="Select a Color"
        isSearchable
        // value={value}
        // open
      />
    </main>
  );
}
