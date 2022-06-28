import { FormDisplayMode } from "@microsoft/sp-core-library";
import { FormCustomizerContext, IList } from "@microsoft/sp-listview-extensibility";
import { IClassFormCustomizerFormCustomizerProperties } from "./IClassFormCustomizerFormCustomizerProperties";

export interface IFormProps extends IClassFormCustomizerFormCustomizerProperties {
  itemID: number | undefined;
  list: IList;
  context: FormCustomizerContext;
  displayMode: FormDisplayMode;
  onSave: () => void;
  onClose: () => void;
}