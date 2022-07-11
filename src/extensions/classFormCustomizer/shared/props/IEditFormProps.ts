import { FormCustomizerContext, IList } from "@microsoft/sp-listview-extensibility";
import { ISPCarros } from "../models/ISPCarros";
import { ISPMarcas } from "../models/ISPMarcas";
import { ISPModelos } from "../models/ISPModelos";
import { ISPSolicitacao } from "../models/ISPSolicitacao";

export interface IEditFormProps {
  ID: number | string;
  Item: ISPSolicitacao;
  list: IList;
  context: FormCustomizerContext;
  brands: ISPMarcas[];
  models: ISPModelos[];
  cars: ISPCarros[];
  onUpdate: (data: any) => void;
  onDelete: () => void;
}