export interface IFormModel {
   type: string;
   name: string;
   value: string;
   defaultValue: any;
   isDisabled: boolean;
   required: boolean;
}

export const nameof = <T extends {}>(name: keyof T) => name;
