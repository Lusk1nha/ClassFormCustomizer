import { FormCustomizerContext } from "@microsoft/sp-listview-extensibility";
import { spfi, SPFI, SPFx } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/presets/all";

import { IItem } from "@pnp/sp/items";
import { ISPMarcas } from "../../models/ISPMarcas";
import BaseRepository from "./BaseRepository";

export default class SPMarcasService extends BaseRepository<ISPMarcas> {
   private _sp: SPFI;
   private _context: FormCustomizerContext;
   public listName: string = null;

   constructor(private context: FormCustomizerContext) {
      super();
      this._sp = spfi().using(SPFx(context));
      this._context = context;
      this.listName = 'SPFXMarcas'
   }

   public async get(select?: string, expand?: string, filter?: string, top?: number, orderBy?: string): Promise<IItem[]> {
      let items: IItem[] | null = null;

      try {
         items = await this._sp.web.lists.getByTitle(this.listName).items
            .select(select || '*')
            .expand(expand || '')
            .filter(filter || '')
            .top(top || 100)
            .orderBy(orderBy || '', true)();

         console.log(items);
         return items
      } catch (err) {
         console.error(err);
      }
   }
}