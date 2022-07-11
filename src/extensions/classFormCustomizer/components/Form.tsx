import * as React from 'react';
import { FormDisplayMode, Log } from '@microsoft/sp-core-library';

const LOG_SOURCE: string = 'ClassFormCustomizer';

import { IFormProps } from '../shared/props/IFormProps';
import { DispForm } from './DispForm/DispForm';
import { NewForm } from './NewForm/NewForm';
import { EditForm } from './EditForm/EditForm';

import styles from './Form.module.scss';

interface IFormSelector {
   component: React.ReactNode;
   title: string;
}

export default function Form(props: IFormProps) {
   const handleCreateNewItem = async (properties: any) => {
      console.log(properties)
      const item: any = await props.SPSolicitacao.createItem(props.list.guid, properties);
      window.location.replace(`https://classsolutions.sharepoint.com${props.list.serverRelativeUrl}/DispForm.aspx?ID=${item.data.Id}`)

   };

   const handleEditItem = async (properties) => {
      const item = await props.SPSolicitacao.updateItem(props.list.guid, props.itemID, properties)
      window.location.replace(`https://classsolutions.sharepoint.com${props.list.serverRelativeUrl}/DispForm.aspx?ID=${props.itemID}`)
   };

   const handleDeleteItem = () => {
      props.SPSolicitacao.deleteItem(props.list.guid, props.itemID)
      window.location.replace(`https://classsolutions.sharepoint.com${props.list.serverRelativeUrl}`)
   };

   console.log(props)

   const formSelector = (mode: FormDisplayMode): IFormSelector => {
      let component;
      let title;

      switch (mode) {
         case FormDisplayMode.Display:
            component = <DispForm ID={props.itemID} Item={props.properties} context={props.context} brands={props.brands} models={props.models} cars={props.cars} />;
            title = 'Visualização'
            break;
         case FormDisplayMode.New:
            component = <NewForm list={props.list} context={props.context} brands={props.brands} models={props.models} cars={props.cars} onCreate={handleCreateNewItem} />;
            title = 'Novo item'
            break;
         case FormDisplayMode.Edit:
            component = <EditForm ID={props.itemID} Item={props.properties} list={props.list} context={props.context} brands={props.brands} models={props.models} cars={props.cars} onUpdate={handleEditItem} onDelete={handleDeleteItem} />;
            title = 'Edição'
            break;
      }

      return {
         component,
         title
      }
   }

   return (
      <section className={styles.classFormCustomizer}>
         <section className={styles.form}>
            <div className={styles.formTitle}>
               {props.list.title} - {formSelector(props.displayMode).title}
            </div>
            <div className={styles.formContent}>
               {formSelector(props.displayMode).component}
            </div>
         </section>
      </section>
   );
}
