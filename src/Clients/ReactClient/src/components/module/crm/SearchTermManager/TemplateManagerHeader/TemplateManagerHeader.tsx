import React, { useContext } from 'react';
import Select from 'react-select';

import { ITemplate } from '../TemplateManager/TemplateManager';
import { TemplateManagerContext } from '../TemplateManager/templateManagerContext';

import { reactSelectDefaultStyles } from 'components/module/Form/Select/Select';

interface ITemplateSelectorProps {
    isShowingTemplateDetails: boolean;
    selectedTemplateId: string | null;
    availableTemplates: ITemplate[];
    setSelectedTemplateId(id: string | null): void;
    toggleShowTemplateDetails(): void;
}

export const TemplateManagerHeader = (props: ITemplateSelectorProps) => {
    const availableTemplates = props.availableTemplates.map(template => ({
        value: template.id,
        label: template.name,
    }));

    const selectedValue = props.selectedTemplateId
        ? availableTemplates.filter(template => template.value === props.selectedTemplateId)
        : null;

    const { isShowingTemplateDetails, templateHasContent, loadData } = useContext(
        TemplateManagerContext
    );

    return (
        <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
                <label className="font-bold mb-0 mr-2">Filter:</label>
                <div style={{ width: '300px' }}>
                    <Select
                        placeholder=""
                        styles={reactSelectDefaultStyles}
                        className="flex-grow-1"
                        value={selectedValue}
                        options={availableTemplates}
                        onChange={(selectedValue: any) =>
                            props.setSelectedTemplateId(selectedValue.value)
                        }
                    />
                </div>

                <button
                    className="btn btn-primary ml-2 h-100"
                    onClick={() => props.setSelectedTemplateId(null)}
                >
                    New
                </button>

                {!isShowingTemplateDetails && templateHasContent && (
                    <button className="btn btn-primary ml-2 h-100" onClick={loadData}>
                        Load
                    </button>
                )}
            </div>
            <button className="btn btn-primary" onClick={props.toggleShowTemplateDetails}>
                {`${props.isShowingTemplateDetails ? 'Hide' : 'Show'} details`}
            </button>
        </div>
    );
};
