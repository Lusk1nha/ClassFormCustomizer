import * as React from 'react';
import { Log, FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';

import styles from './ClassFormCustomizer.module.scss';

export interface IClassFormCustomizerProps {
  context: FormCustomizerContext;
  displayMode: FormDisplayMode;
  onSave: () => void;
  onClose: () => void;
}

const LOG_SOURCE: string = 'ClassFormCustomizer';

export default class ClassFormCustomizer extends React.Component<IClassFormCustomizerProps, {}> {
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
