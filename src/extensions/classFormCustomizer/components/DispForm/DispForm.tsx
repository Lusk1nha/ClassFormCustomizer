import { Guid } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';
import * as React from 'react';

interface IDispFormProps {
    ID: number;
    listGUID: string | Guid;
    context: FormCustomizerContext;
}

export function DispForm(props: IDispFormProps) {

    return (
        <form>
        </form>
    );
}