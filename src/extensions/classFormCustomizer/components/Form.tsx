import * as React from 'react';
import { Log } from '@microsoft/sp-core-library';

import { IFormProps } from '../shared/props/IFormProps'

import styles from './Form.module.scss';


const LOG_SOURCE: string = 'ClassFormCustomizer';

export default class Form extends React.Component<IFormProps, {}> {
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: ClassFormCustomizer mounted');
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: ClassFormCustomizer unmounted');
  }

  public render(): React.ReactElement<{}> {
    return <div className={styles.classFormCustomizer} />;
  }
}
