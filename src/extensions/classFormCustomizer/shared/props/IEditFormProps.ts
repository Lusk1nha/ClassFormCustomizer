import { Guid } from "@microsoft/sp-core-library";
import { FormCustomizerContext } from "@microsoft/sp-listview-extensibility";

export interface IEditFormProps {
  ID: number;
  listGUID: string | Guid;
  context: FormCustomizerContext;
}
