import { DatePicker, IDatePicker, IDatePickerProps } from "@fluentui/react";
import * as React from "react";
import { Controller } from "react-hook-form";
import { IControlledProps } from "../../../shared/props/IControlledProps";

export function ControlledDatePicker(props: IControlledProps & IDatePickerProps) {
   return (
      <Controller
         name={props.name}
         control={props.control}
         rules={props.rules}
         defaultValue={props.defaultValue || ""}
         render={({
            field: { onChange, onBlur, name: fieldName, value },
            fieldState: { error }
         }) => (
            <DatePicker
               {...props}
               textField={{
                  name: fieldName,
                  errorMessage: error && error.message
                }}
                onSelectDate={(date) => {
                  onChange(date);
                }}
                value={value}
                onBlur={onBlur}
                defaultValue={undefined}
            />
         )}
      />
   );
}