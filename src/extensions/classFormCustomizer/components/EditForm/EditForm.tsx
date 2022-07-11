import * as strings from 'ClassFormCustomizerFormCustomizerStrings';
import { DefaultButton, Dropdown, IDropdownOption, PrimaryButton, Stack, StackItem, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { IEditFormProps } from '../../shared/props/IEditFormProps';
import styles from '../Form.module.scss';
import { FilePicker } from '../Inputs/FilePicker';
import { useId } from '@fluentui/react-hooks';
import { nameof } from '../../shared/models/IFormModel';
import { IFormProperties } from '../../shared/models/IFormProperties';
import { getMarcasDropdown, getModelosByMarca, getCarsByModel } from '../../shared/utils/DataFormatter';
import { ControlledDatePicker } from '../Inputs/ControlledInputs/ControlledDatePicker';
import { ControlledDropdown } from '../Inputs/ControlledInputs/ControlledDropdown';
import { ControlledTextField } from '../Inputs/ControlledInputs/ControlledTextField';
import { useForm } from 'react-hook-form';

export function EditForm(props: IEditFormProps) {
   const requesterFieldId = useId('editFormRequester');
   const carBrandsFieldId = useId('editFormBrands');
   const carModelsFieldId = useId('editFormModels');
   const carVeiculosId = useId('editFormCar');
   const carInitialRequestDate = useId('editFormInitialRequestDate');
   const carEndRequestDate = useId('editFormEndRequestDate');

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
      <form className={styles.editForm} onSubmit={handleSubmit((data) => props.onUpdate(data))}>
         <Stack style={{
            width: '100%'
         }}>
            <StackItem className={styles.fieldContainer}>
               <TextField
                  className={styles.field}
                  value={`${props.ID}`}
                  label={"ID da solicitação"}
                  readOnly
               />
            </StackItem>
            <StackItem className={styles.fieldContainer}>
               <ControlledTextField
                  className={styles.field}
                  id={requesterFieldId}
                  required={true}
                  name={nameof<IFormProperties>("Title")}
                  label={strings.RequesterNameLabel}
                  value={props.context.pageContext.user.displayName}
                  control={control}
                  readOnly
                  rules={{
                     required: strings.RequiredFieldMessage
                  }}
               />
            </StackItem>
            <StackItem className={styles.fieldContainer}>
               <ControlledDropdown
                  className={styles.field}
                  id={carBrandsFieldId}
                  required={true}
                  name={nameof<IFormProperties>("MarcaId")}
                  label={strings.CarBrandsLabel}
                  placeholder={strings.CarBrandsPlaceholder}
                  control={control}
                  rules={{
                     required: strings.RequiredFieldMessage
                  }}
                  options={getMarcasDropdown(props.brands)}
               />
            </StackItem>
            <StackItem className={styles.fieldContainer}>
               <ControlledDropdown
                  className={styles.field}
                  id={carModelsFieldId}
                  required={true}
                  name={nameof<IFormProperties>("ModeloId")}
                  label={strings.CarModelsLabel}
                  placeholder={strings.CarModelsPlaceholder}
                  control={control}
                  disabled={!watch(nameof<IFormProperties>("MarcaId"))}
                  rules={{
                     required: strings.RequiredFieldMessage
                  }}
                  options={getModelosByMarca(getValues(nameof<IFormProperties>("MarcaId")), props.models)}
               />
            </StackItem>
            <StackItem className={styles.fieldContainer}>
               <ControlledDropdown
                  className={styles.field}
                  id={carVeiculosId}
                  required={true}
                  name={nameof<IFormProperties>("CarroId")}
                  label={strings.CarModelsLabel}
                  placeholder={strings.CarModelsPlaceholder}
                  control={control}
                  disabled={!watch(nameof<IFormProperties>("ModeloId"))}
                  rules={{
                     required: strings.RequiredFieldMessage
                  }}
                  options={getCarsByModel(getValues(nameof<IFormProperties>("MarcaId")), getValues(nameof<IFormProperties>("ModeloId")), props.cars)}
               />
            </StackItem>
            <StackItem className={styles.fieldContainer}>
               <ControlledDatePicker
                  className={styles.field}
                  id={carInitialRequestDate}
                  isRequired={true}
                  minDate={new Date()}
                  name={nameof<IFormProperties>("DataEntrada")}
                  label={strings.DateStartFieldLabel}
                  placeholder={strings.DateStartFieldPlaceholder}
                  control={control}
                  rules={{
                     required: strings.RequiredFieldMessage,
                     validate: (data: string) => {
                        return (
                           new Date(data) > new Date() ||
                           "Essa data não pode ser menor que hoje"
                        );
                     }
                  }}
               />
               <ControlledDatePicker
                  className={styles.field}
                  id={carEndRequestDate}
                  isRequired={true}
                  minDate={new Date(Date.now() + ( 3600 * 1000 * 24))}
                  name={nameof<IFormProperties>("DataSaida")}
                  label={strings.DateEndFieldLabel}
                  placeholder={strings.DateEndFieldPlaceholder}
                  control={control}
                  rules={{
                     required: strings.RequiredFieldMessage,
                     validate: (data: string) => {
                        return (
                           new Date(data) > new Date() ||
                           "Essa data deve ter um dia entre a data inicial da solicitação"
                        );
                     }
                  }}
               />
            </StackItem>
            <Stack horizontal className={styles.formButtonContainer}>
               <DefaultButton type={"submit"} className={styles.saveButton}>{strings.Edit}</DefaultButton>
               <PrimaryButton type={"button"} className={styles.deleteButton} onClick={props.onDelete}>{strings.Delete}</PrimaryButton>
               <PrimaryButton href={`https://classsolutions.sharepoint.com${props.list.serverRelativeUrl}`}>{strings.Cancel}</PrimaryButton>
            </Stack>
         </Stack>
      </form>
   );
}