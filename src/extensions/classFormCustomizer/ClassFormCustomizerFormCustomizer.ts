import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Log } from '@microsoft/sp-core-library';
import {
  BaseFormCustomizer
} from '@microsoft/sp-listview-extensibility';

import Form from './components/Form';
import { IFormProps } from './shared/props/IFormProps';
import { IClassFormCustomizerFormCustomizerProperties } from './shared/props/IClassFormCustomizerFormCustomizerProperties';
import { IItem } from '@pnp/sp/items';
import SPService from './shared/services/SPService';

const LOG_SOURCE: string = 'ClassFormCustomizerFormCustomizer';

export default class ClassFormCustomizerFormCustomizer
  extends BaseFormCustomizer<IClassFormCustomizerFormCustomizerProperties> {
    private spService: SPService = null;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Activated ClassFormCustomizerFormCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));

    this.spService = new SPService(this.context);

    return Promise.resolve();
  }

  public async render(): Promise<void> {
    let item: IItem | null = await this.spService.getItemByID(this.context.list.guid, this.context.itemId);
    console.log(item);

    const classFormCustomizer: React.ReactElement<{}> =
      React.createElement(Form, {
        itemID: this.context.itemId,
        list: this.context.list,
        context: this.context,
        displayMode: this.displayMode,
        onSave: this._onSave,
        onClose: this._onClose
      } as IFormProps);

    ReactDOM.render(classFormCustomizer, this.domElement);
  }

  public onDispose(): void {
    ReactDOM.unmountComponentAtNode(this.domElement);
    super.onDispose();
  }

  private _onSave = (): void => {
    this.formSaved();
  }

  private _onClose = (): void => {
    this.formClosed();
  }
}
