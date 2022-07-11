import { FormCustomizerContext } from "@microsoft/sp-listview-extensibility";
import { ISPCarros } from "../models/ISPCarros";
import { ISPMarcas } from "../models/ISPMarcas";
import { ISPModelos } from "../models/ISPModelos";
import { ISPSolicitacao } from "../models/ISPSolicitacao";

export interface IDispFormProps {
  ID: number;
  Item: ISPSolicitacao;
  context: FormCustomizerContext;
  brands: ISPMarcas[];
  models: ISPModelos[];
  cars: ISPCarros[];
}