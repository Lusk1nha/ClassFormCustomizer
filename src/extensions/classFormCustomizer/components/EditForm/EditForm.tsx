import { Guid } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';
import * as React from 'react';

interface IEditFormProps {
    ID: number;
    listGUID: string | Guid;
    context: FormCustomizerContext;
}

export function EditForm(props: IEditFormProps) {
    
    return (
        <form>
        </form>
    );
}