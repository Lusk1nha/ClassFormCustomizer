import { IDropdownOption } from "office-ui-fabric-react";
import { ISPMarcas } from "../models/ISPMarcas";

function getMarcasDropdown(array: ISPMarcas[]): IDropdownOption[] {
  return array.map((el => {
    return {
      key: el.Id,
      text: el.Title
    }
  }))
}

export {
  getMarcasDropdown
}