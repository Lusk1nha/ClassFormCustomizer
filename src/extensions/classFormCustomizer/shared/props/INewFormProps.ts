import { FormCustomizerContext, IList } from "@microsoft/sp-listview-extensibility";
import { ISPCarros } from "../models/ISPCarros";
import { ISPMarcas } from "../models/ISPMarcas";
import { ISPModelos } from "../models/ISPModelos";

export interface INewFormProps {
  list: IList;
  context: FormCustomizerContext;
  brands: ISPMarcas[],
  models: ISPModelos[],
  cars: ISPCarros[],
  onCreate: (data: any) => void;
}