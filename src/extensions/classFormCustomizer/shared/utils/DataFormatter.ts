import { IDropdownOption } from "office-ui-fabric-react";
import { ISPCarros } from "../models/ISPCarros";
import { ISPMarcas } from "../models/ISPMarcas";
import { ISPModelos } from "../models/ISPModelos";

function getMarcasDropdown(array: ISPMarcas[]): IDropdownOption[] {
   return array.map((el => {
      return {
         key: el.Id,
         text: el.Title
      }
   }))
}

function getModelosDropdown(array: ISPModelos[]): IDropdownOption[] {
   return array.map((el => {
      return {
         key: el.Id,
         text: el.Title
      }
   }))
}

function getModelosByMarca(marca: any, modelos: ISPModelos[]): IDropdownOption[] {
   const modelosFiltered = modelos.filter((modelo) => {
      return modelo.MarcaId === marca
   })

   return getModelosDropdown(modelosFiltered);
}

function getCarsDropdown(array: ISPCarros[]): IDropdownOption[] {
   return array.map((el => {
      return {
         key: el.Id,
         text: `${el.Title} - ${el.Ano}`
      }
   }))
}

function getCarsByModel(marca: any, model: any, cars: ISPCarros[]): IDropdownOption[] {
   const carsFiltered = cars.filter((car) => {
      return car.MarcaId === marca && car.ModeloId === model;
   })

   return getCarsDropdown(carsFiltered);
}

export {
   getMarcasDropdown,
   getModelosDropdown,
   getModelosByMarca,
   getCarsDropdown,
   getCarsByModel
}