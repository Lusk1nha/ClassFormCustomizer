import { FormCustomizerContext } from "@microsoft/sp-listview-extensibility";
import { SPFI, spfi, SPFx } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/presets/all";
import "@pnp/sp/lists"
import { IItem } from "@pnp/sp/presets/all";
import { Guid } from "@microsoft/sp-core-library";

export default class SPService {
    private _sp: SPFI;
    private _context: FormCustomizerContext;
  
    constructor(private context: FormCustomizerContext) {
      this._sp = spfi().using(SPFx(context));
      this._context = context;
    }

    public async getItemByID(listGUID: any, itemID: number): Promise<IItem> {
        try {
            const item: IItem = await this._sp.web.lists.getById(listGUID).items.getById(itemID)();
            return item
        } catch (error) {
            console.error(`ERRO para obter o item com ID ${itemID}`)
        }
    }
}  