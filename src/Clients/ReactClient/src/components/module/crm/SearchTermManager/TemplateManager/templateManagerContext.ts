import React from 'react';

interface ITemplateManagerContext {
    canManageTemplate: boolean;
    isShowingTemplateDetails: boolean;
    templateHasContent: boolean;
    isWaitingForServerResponse: boolean;
    openNewTemplateModal(): void;
    saveTemplate(): void;
    removeTemplate(): void;
    loadData(): void;
}

const defaultValues: ITemplateManagerContext = {
    canManageTemplate: true,
    isShowingTemplateDetails: false,
    templateHasContent: false,
    isWaitingForServerResponse: false,
    openNewTemplateModal: () => {
        throw new Error('closeNewTemplateModal() not set');
    },
    saveTemplate: () => {
        throw new Error('saveTemplate() not set');
    },
    removeTemplate: () => {
        throw new Error('removeTemplate() not set');
    },
    loadData: () => {
        throw new Error('loadData() not set');
    },
};

export const TemplateManagerContext = React.createContext(defaultValues);
