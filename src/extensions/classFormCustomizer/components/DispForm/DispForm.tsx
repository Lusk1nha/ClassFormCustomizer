import * as strings from 'ClassFormCustomizerFormCustomizerStrings';
import { DefaultButton, Dropdown, PrimaryButton, Stack, StackItem, TextField, IDropdownOption } from 'office-ui-fabric-react';
import * as React from 'react';
import { IDispFormProps } from '../../shared/props/IDispFormProps';
import styles from '../Form.module.scss';
import { useForm } from 'react-hook-form';
import { nameof } from '../../shared/models/IFormModel';
import { IFormProperties } from '../../shared/models/IFormProperties';
import { getMarcasDropdown, getModelosByMarca, getCarsByModel } from '../../shared/utils/DataFormatter';
import { ControlledDatePicker } from '../Inputs/ControlledInputs/ControlledDatePicker';
import { ControlledDropdown } from '../Inputs/ControlledInputs/ControlledDropdown';
import { ControlledTextField } from '../Inputs/ControlledInputs/ControlledTextField';

const TestDropdown = [
   {
      key: "1",
      text: "Marca 1"
   },
   {
      key: "2",
      text: "Marca 2"
   }
] as IDropdownOption[]


export function DispForm(props: IDispFormProps) {
   const { handleSubmit, control, watch, getValues } = useForm<IFormProperties, any>({
      mode: "all",
      reValidateMode: "onSubmit",
      defaultValues: {
         Title: props.context.pageContext.user.displayName,
         MarcaId: props.Item.MarcaId,
         ModeloId: props.Item.ModeloId,
         CarroId: props.Item.CarroId,
         DataEntrada: new Date(props.Item.DataEntrada),
         DataSaida: new Date(props.Item.DataSaida)
      }
   });

   return (
      <form className={styles.editForm}>
         <Stack style={{
            width: '100%'
         }}>
            <StackItem className={styles.fieldContainer}>
               <TextField
                  className={styles.field}
                  value={`${props.ID}`}
                  label={"ID da solicitação"}
                  disabled
                  readOnly
               />
            </StackItem>
            <StackItem className={styles.fieldContainer}>
               <ControlledTextField
                  className={styles.field}
                  required={true}
                  name={nameof<IFormProperties>("Title")}
                  label={strings.RequesterNameLabel}
                  value={props.context.pageContext.user.displayName}
                  control={control}
                  disabled
                  readOnly
                  rules={{
                     required: strings.RequiredFieldMessage
                  }}
               />
            </StackItem>
            <StackItem className={styles.fieldContainer}>
               <ControlledDropdown
                  className={styles.field}
                  required={true}
                  name={nameof<IFormProperties>("MarcaId")}
                  label={strings.CarBrandsLabel}
                  placeholder={strings.CarBrandsPlaceholder}
                  control={control}
                  disabled
                  rules={{
                     required: strings.RequiredFieldMessage
                  }}
                  options={getMarcasDropdown(props.brands)}
               />
            </StackItem>
            <StackItem className={styles.fieldContainer}>
               <ControlledDropdown
                  className={styles.field}

                  required={true}
                  name={nameof<IFormProperties>("ModeloId")}
                  label={strings.CarModelsLabel}
                  placeholder={strings.CarModelsPlaceholder}
                  control={control}
                  disabled
                  rules={{
                     required: strings.RequiredFieldMessage
                  }}
                  options={getModelosByMarca(getValues(nameof<IFormProperties>("MarcaId")), props.models)}
               />
            </StackItem>
            <StackItem className={styles.fieldContainer}>
               <ControlledDropdown
                  className={styles.field}
                  required={true}
                  name={nameof<IFormProperties>("CarroId")}
                  label={strings.CarModelsLabel}
                  placeholder={strings.CarModelsPlaceholder}
                  control={control}
                  disabled
                  rules={{
                     required: strings.RequiredFieldMessage
                  }}
                  options={getCarsByModel(getValues(nameof<IFormProperties>("MarcaId")), getValues(nameof<IFormProperties>("ModeloId")), props.cars)}
               />
            </StackItem>
            <StackItem className={styles.fieldContainer}>
               <ControlledDatePicker
                  className={styles.field}
                  isRequired={true}
                  minDate={new Date()}
                  name={nameof<IFormProperties>("DataEntrada")}
                  disabled
                  label={strings.DateStartFieldLabel}
                  placeholder={strings.DateStartFieldPlaceholder}
                  control={control}
                  rules={{
                     required: strings.RequiredFieldMessage,
                     validate: (data: string) => {
                        return (
                           new Date(data) > new Date() ||
                           "The date should be greater than today"
                        );
                     }
                  }}
               />
               <ControlledDatePicker
                  className={styles.field}
                  isRequired={true}
                  name={nameof<IFormProperties>("DataSaida")}
                  label={strings.DateEndFieldLabel}
                  placeholder={strings.DateEndFieldPlaceholder}
                  disabled
                  control={control}
                  rules={{
                     required: strings.RequiredFieldMessage
                  }}
               />
            </StackItem>
         </Stack>
      </form>
   );
}