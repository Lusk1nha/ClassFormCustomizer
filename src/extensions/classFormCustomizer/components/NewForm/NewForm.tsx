import { TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { INewFormProps } from '../../shared/props/INewFormProps';
import styles from '../Form.module.scss';

export function NewForm(props: INewFormProps) {

    return (
        <form className={styles.newForm}>
            <TextField style={{
                width: '100%',
                background: 'red'
            }} />
            <TextField />
            <TextField />
        </form>
    );
}