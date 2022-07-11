import { FormDisplayMode } from "@microsoft/sp-core-library";
import { FormCustomizerContext, IList } from "@microsoft/sp-listview-extensibility";
import { ISPSolicitacao } from "../models/ISPSolicitacao";
import SPAutomoveisService from "../services/SPAutomoveisService";
import { IClassFormCustomizerFormCustomizerProperties } from "./IClassFormCustomizerFormCustomizerProperties";

export interface IFormProps extends IClassFormCustomizerFormCustomizerProperties {
  itemID: number | undefined;
  properties: any;
  list: IList;
  context: FormCustomizerContext;
  displayMode: FormDisplayMode;
  brands: any[];
  models: any[];
  cars: any[];
  SPSolicitacao: SPAutomoveisService;
  onSave: () => void;
  onClose: () => void;
}