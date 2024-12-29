"use client";

import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateInputProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
}

export function DateInput({ value, onChange, placeholder = "MM-DD-YYYY" }: DateInputProps) {
  const [inputValue, setInputValue] = React.useState(
    value ? format(value, "MM-dd-yyyy") : ""
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Try to parse the date
    if (newValue.length === 10) { // Only try to parse if the input is complete
      const parsedDate = parse(newValue, "MM-dd-yyyy", new Date());
      if (isValid(parsedDate)) {
        onChange(parsedDate);
      }
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      setInputValue(format(date, "MM-dd-yyyy"));
    }
    onChange(date);
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-[150px]"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-10 p-0",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleCalendarSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
