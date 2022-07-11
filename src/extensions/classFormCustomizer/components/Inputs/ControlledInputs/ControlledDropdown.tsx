import { Dropdown, IDropdownOption, IDropdownProps } from "@fluentui/react";
import * as React from "react";
import { Controller } from "react-hook-form";
import { IControlledProps } from "../../../shared/props/IControlledProps";


export function ControlledDropdown(props: IControlledProps & IDropdownProps) {
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
            <Dropdown
               {...props}
               selectedKey={value}
               onChange={(evt, option: IDropdownOption) => {
                  onChange(option.key);
               }}
               onBlur={onBlur}
               errorMessage={error && error.message}
               defaultValue={undefined}
            />
         )}
      />
   );
}