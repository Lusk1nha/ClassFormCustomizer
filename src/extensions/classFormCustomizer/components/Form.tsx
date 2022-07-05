import * as React from 'react';
import { FormDisplayMode, Log } from '@microsoft/sp-core-library';

const LOG_SOURCE: string = 'ClassFormCustomizer';

import { IFormProps } from '../shared/props/IFormProps';
import { DispForm } from './DispForm/DispForm';
import { NewForm } from './NewForm/NewForm';
import { EditForm } from './EditForm/EditForm';

import styles from './Form.module.scss';

export default function Form(props: IFormProps) {
  console.log(props);
  console.log(props.context);

  const formSelector = (mode: FormDisplayMode): React.ReactNode => {
    let component;

    switch(mode) {
      case FormDisplayMode.Display:
        component = <DispForm ID={props.itemID} listGUID={props.list.guid} context={props.context} />;
        break;
      case FormDisplayMode.New:
        component = <NewForm listGUID={props.list.guid} context={props.context} />;
        break;
      case FormDisplayMode.Edit:
        component = <EditForm ID={props.itemID} listGUID={props.list.guid} context={props.context} />;
    }

    return component
  }

  return (
    <section className={styles.classFormCustomizer}>
      <section className={styles.form}>
        <div className={styles.formTitle}>
          Cadastro de Automóveis
        </div>
        <div className={styles.formContent}>
          {
            formSelector(props.displayMode)
          }
        </div>
      </section>
    </section>
  );
}
