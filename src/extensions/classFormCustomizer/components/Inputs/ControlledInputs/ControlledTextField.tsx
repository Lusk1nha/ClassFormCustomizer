import { ITextFieldProps, TextField } from "office-ui-fabric-react";
import * as React from "react";
import { Controller } from "react-hook-form";
import { IControlledProps } from "../../../shared/props/IControlledProps";


export function ControlledTextField(props: IControlledProps & ITextFieldProps) {
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
            <TextField
               {...props}
               name={fieldName}
               onChange={onChange}
               value={value}
               onBlur={onBlur}
               errorMessage={error && error.message}
               defaultValue={undefined}
            />
         )}
      />
   );
}