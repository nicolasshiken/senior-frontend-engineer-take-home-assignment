"use client";
import { IconChevron } from "@/icons/IconChevron";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";

export interface IOption {
  label: string;
  value: string;
}

export interface IDropdownSelectProps {
  options: IOption[];
  label: string;
  onChange: (option: IOption) => void;
  isSearchable?: boolean;
  open?: boolean;
  value?: IOption | null;
}

export const DropdownSelect = ({
  options,
  open,
  value,
  label,
  onChange,
  isSearchable,
}: IDropdownSelectProps) => {
  const [internalValue, setInternalValue] = useState<IOption | null>(null);
  const [opened, setOpened] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<IOption[]>(options);
  const [hoveredOption, setHoveredOption] = useState<IOption | null>(
    internalValue || null
  );

  useEffect(() => {
    if (value === undefined) return;
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (open === undefined) return;
    setOpened(open);
  }, [open]);

  const filterOptions = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setFilteredOptions(() => {
      return options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          option.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const toggleOpened = () => {
    setOpened((prev) => !prev);
    setSearchTerm("");
    setHoveredOption(internalValue);
    setFilteredOptions(options);
  };

  const handleOptionSelect = (option: IOption) => {
    setInternalValue(option);
    onChange(option);
    toggleOpened();
  };

  const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.code !== "ArrowDown" && e.code !== "ArrowUp" && e.code !== "Enter")
      return;

    const hoveredOptionIndex = filteredOptions.findIndex(
      ({ value }) => value === hoveredOption?.value
    );

    if (e.code === "ArrowDown") {
      const newHoveredOption =
        filteredOptions[
          Math.min(filteredOptions.length - 1, hoveredOptionIndex + 1)
        ];
      setHoveredOption(newHoveredOption);
      const element = document.getElementById(newHoveredOption.value);
      element?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (e.code === "ArrowUp") {
      const newHoveredOption =
        filteredOptions[Math.max(0, hoveredOptionIndex - 1)];
      setHoveredOption(newHoveredOption);
      const element = document.getElementById(newHoveredOption.value);
      element?.scrollIntoView({
        behavior: "smooth",
      });
      return;
    }

    if (hoveredOption) handleOptionSelect(hoveredOption as IOption);
  };

  return (
    <div onKeyDown={handleKeyPress} className="bg-white flex flex-col gap-1">
      <div
        className="border rounded p-1 bg-white text-black flex justify-between items-center"
        onClick={toggleOpened}
      >
        {internalValue?.label || label}
        <div
          className={`${
            opened ? "-rotate-90" : "rotate-90"
          } transition-all flex align-center justify-center max-h-4 max-w-4`}
        >
          <IconChevron />
        </div>
      </div>
      {opened && (
        <div className="border rounded overflow-hidden">
          {isSearchable && (
            <div className="p-1 bg-gray-300">
              <input
                autoFocus
                className="text-black w-full border rounded px-1"
                value={searchTerm}
                onChange={(e) => filterOptions(e.target.value)}
                type="text"
              />
            </div>
          )}
          <div className="max-h-40 overflow-auto">
            {filteredOptions.map((option) => (
              <div
                id={option.value}
                className={`p-1 cursor-pointer ${
                  internalValue?.label === option.label
                    ? "bg-item-selected text-white"
                    : option.value === hoveredOption?.value
                    ? "bg-item-hover"
                    : ""
                }`}
                onClick={() => handleOptionSelect(option)}
                onMouseEnter={() => setHoveredOption(option)}
                onMouseLeave={() => setHoveredOption(option)}
                key={option.value}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
