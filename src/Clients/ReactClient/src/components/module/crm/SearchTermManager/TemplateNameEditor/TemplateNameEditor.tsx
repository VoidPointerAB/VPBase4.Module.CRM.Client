import React, { useContext } from 'react';

import { TemplateManagerContext } from '../TemplateManager/templateManagerContext';

interface ITemplateNameEditorProps {
    name: string;
    updateName(e: any): void;
}

export const TemplateNameEditor = (props: ITemplateNameEditorProps) => {
    const templateManagerContext = useContext(TemplateManagerContext);
    return (
        <>
            {templateManagerContext.canManageTemplate && (
                <div className="mb-3">
                    <label className="control-label font-bold">Filter name</label>
                    <input
                        name="templateName"
                        className="form-control"
                        type="text"
                        value={props.name}
                        onChange={props.updateName}
                    />
                </div>
            )}
        </>
    );
};
