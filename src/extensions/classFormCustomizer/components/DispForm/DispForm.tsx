import { TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { IDispFormProps } from '../../shared/props/IDispFormProps';
import styles from '../Form.module.scss';


export function DispForm(props: IDispFormProps) {

    return ( 
        <form className={styles.dispForm}>
            <TextField />
            <TextField />
            <TextField />
        </form>
    );
}