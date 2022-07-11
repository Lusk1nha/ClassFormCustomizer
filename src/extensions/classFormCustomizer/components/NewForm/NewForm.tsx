import { Label, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { INewFormProps } from '../../shared/props/INewFormProps';
import styles from '../Form.module.scss';

import * as strings from 'ClassFormCustomizerFormCustomizerStrings';
import { useId } from '@fluentui/react-hooks';
import { IFormModel, nameof } from '../../shared/models/IFormModel';
import { DefaultButton, Dropdown, IDropdownOption, Persona, PrimaryButton, Stack, StackItem } from '@fluentui/react';
import { FilePicker } from '../Inputs/FilePicker';

import { Controller, FormProvider, useForm } from "react-hook-form";
import { ControlledTextField } from '../Inputs/ControlledInputs/ControlledTextField';
import { ControlledDropdown } from '../Inputs/ControlledInputs/ControlledDropdown';
import { ControlledDatePicker } from '../Inputs/ControlledInputs/ControlledDatePicker';
import { getCarsByModel, getMarcasDropdown, getModelosByMarca, getModelosDropdown } from '../../shared/utils/DataFormatter';
import { IFormProperties } from '../../shared/models/IFormProperties';

export function NewForm(props: INewFormProps) {
  const requesterFieldId = useId('newFormRequester');
  const carBrandsFieldId = useId('newFormBrands');
  const carModelsFieldId = useId('newFormModels');
  const carVeiculosId = useId('newFormCar');
  const carInitialRequestDate = useId('newFormInitialRequestDate');
  const carEndRequestDate = useId('newFormEndRequestDate');
  const requestCommentId = useId('newFormRequestComment');

  const { handleSubmit, control, watch, getValues } = useForm<IFormProperties, any>({
    mode: "all",
    reValidateMode: "onSubmit",
    defaultValues: {
      Title: props.context.pageContext.user.displayName,
      MarcaId: null,
      ModeloId: null,
      CarroId: null,
      DataEntrada: null,
      DataSaida: null,
      SolicitacaoComentario: null
    }
  });

  return (
    <form className={styles.newForm} onSubmit={handleSubmit((data) => props.onCreate(data))}>
      <Stack style={{
        width: '100%'
      }}>
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
            label={strings.CarSelectLabel}
            placeholder={strings.CarSelectPlaceholder}
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
            minDate={new Date(Date.now() + (3600 * 1000 * 24))}
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
        <StackItem className={styles.fieldContainer}>
          <ControlledTextField
            className={styles.field}
            id={requestCommentId}
            name={nameof<IFormProperties>("SolicitacaoComentario")}
            label={strings.RequestCommentLabel}
            placeholder={strings.RequestCommentPlaceholder}
            control={control}
            multiline
            rows={4}
            resizable={false}
          />
        </StackItem>
        <Stack horizontal className={styles.formButtonContainer}>
          <DefaultButton type={"submit"} className={styles.saveButton}>{strings.Save}</DefaultButton>
          <PrimaryButton href={`https://classsolutions.sharepoint.com${props.list.serverRelativeUrl}`}>{strings.Cancel}</PrimaryButton>
        </Stack>
      </Stack>
    </form>
  );
}