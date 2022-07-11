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
import SPAutomoveisService from './shared/services/SPAutomoveisService';
import SPMarcasService from './shared/services/Repositories/MarcasService';
import SPModelosService from './shared/services/Repositories/ModelosService';
import * as strings from 'ClassFormCustomizerFormCustomizerStrings';
import SPCarrosService from './shared/services/Repositories/CarrosService';
import { ISPMarcas } from './shared/models/ISPMarcas';
import { ISPModelos } from './shared/models/ISPModelos';
import { ISPCarros } from './shared/models/ISPCarros';

const LOG_SOURCE: string = 'ClassFormCustomizerFormCustomizer';

export default class ClassFormCustomizerFormCustomizer
   extends BaseFormCustomizer<IClassFormCustomizerFormCustomizerProperties> {
   private _spAutomoveisService: SPAutomoveisService = null;
   private _spMarcas: SPMarcasService = null;
   private _spModelos: SPModelosService = null;
   private _spCars: SPCarrosService = null;

   public onInit(): Promise<void> {
      Log.info(LOG_SOURCE, 'Activated ClassFormCustomizerFormCustomizer with properties:');
      Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));

      this._spAutomoveisService = new SPAutomoveisService(this.context);
      this._spMarcas = new SPMarcasService(this.context);
      this._spModelos = new SPModelosService(this.context);
      this._spCars = new SPCarrosService(this.context);


      return Promise.resolve();
   }

   public async render(): Promise<void> {
      let formItem: IItem | null;
      if (this.context.itemId) {
         formItem = await this._spAutomoveisService.getItemByID(this.context.list.guid, this.context.itemId);
      }

      let brands: IItem[] | ISPMarcas = await this._spMarcas.get("*", "", "Ativo eq 'Sim'", 5000, 'Title');
      let models: IItem[] | ISPModelos = await this._spModelos.get("*", "", "Ativo eq 'Sim'", 5000, 'Title');
      let cars: IItem[] | ISPCarros = await this._spCars.get("*", "", "Ativo eq 'Sim'", 5000, 'Title');

      console.log(formItem)

      const classFormCustomizer: React.ReactElement<{}> =
         React.createElement(Form, {
            itemID: this.context.itemId,
            properties: formItem,
            list: this.context.list,
            context: this.context,
            displayMode: this.displayMode,
            brands: brands,
            models: models,
            cars: cars,
            SPSolicitacao: this._spAutomoveisService,
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
