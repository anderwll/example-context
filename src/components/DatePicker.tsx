/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { DatePicker as DatePickerMui } from "@mui/x-date-pickers/DatePicker";
import { isAfter, isBefore } from "date-fns";

type DatePickerProps = {
  label: string;
  disabledBefore?: Date | null;
  disabledAfter?: Date | null;
  fullWidth?: boolean;
} & React.ComponentProps<typeof DatePickerMui>;

export function DatePicker({
  disabledAfter,
  disabledBefore,
  fullWidth,
  ...rest
}: DatePickerProps) {
  function invalidRange(date: Date) {
    return (
      (disabledBefore && isBefore(date, disabledBefore)) ||
      (disabledAfter && isAfter(date, disabledAfter)) ||
      false
    );
  }

  return (
    <DatePickerMui
      sx={{
        width: fullWidth ? "100%" : undefined,
      }}
      shouldDisableDate={(date: any) => invalidRange(date)}
      {...rest}
    />
  );
}
