import { Guid } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';
import * as React from 'react';

interface INewFormProps {
    listGUID: string | Guid;
    context: FormCustomizerContext;
}

export function NewForm(props: INewFormProps) {

    return (
        <form>
        </form>
    );
}