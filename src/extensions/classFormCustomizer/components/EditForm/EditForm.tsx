import { TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { IEditFormProps } from '../../shared/props/IEditFormProps';
import styles from '../Form.module.scss';


export function EditForm(props: IEditFormProps) {

  return (
    <form className={styles.editForm}>
      <TextField />
      <TextField />
      <TextField />
    </form>
  );
}