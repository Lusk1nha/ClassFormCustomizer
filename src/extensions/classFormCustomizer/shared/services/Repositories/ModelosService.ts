import { FormCustomizerContext } from "@microsoft/sp-listview-extensibility";
import { spfi, SPFI, SPFx } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/presets/all";

import { IItem } from "@pnp/sp/items";
import { ISPModelos } from "../../models/ISPModelos";
import BaseRepository from "./BaseRepository";

export default class SPModelosService extends BaseRepository<ISPModelos> {
  private _sp: SPFI;
  private _context: FormCustomizerContext;

  constructor(private context: FormCustomizerContext) {
    super();
    this._sp = spfi().using(SPFx(context));
    this._context = context;
  }

  public async get(listGUID: any, select: string[], expand: string[], filter: string, top: number): Promise<IItem[]> {
    let items: IItem[] | null = null;

    try {
      items = await this._sp.web.lists.getById(listGUID).items.select(select.join(',')).expand(expand.join(',')).filter(filter).top(top)();
      return items
    } catch (err) {
      console.error(err);
    }
  }
}