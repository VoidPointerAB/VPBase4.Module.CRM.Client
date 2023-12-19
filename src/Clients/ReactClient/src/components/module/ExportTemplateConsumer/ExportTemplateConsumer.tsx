import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify'

import Modal from 'components/module/Modal/VPModal';

import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import { exportToExcel } from 'helpers/module/excelExporter';

import { GET_TEMPLATES } from 'graphQL/module/queries/exportTemplate/getTemplates';
import {
    exportTemplates,
    exportTemplatesVariables,
} from 'graphQL/module/generatedTypes/exportTemplates';
import { ExportEntityEnum } from 'graphQL/module/generatedTypes/globalTypes';

import styles from './ExportTemplateConsumer.module.css';

interface ExportTemplateConsumerProps {
    entityType: string;
    entityIds?: string[];
    entityIdGetter?(): string[];
    wrapperClassName?: string;
    children?: any;
}

interface TemplateData {
    id: string;
    name: string;
}

export const ExportTemplateConsumer = (props: ExportTemplateConsumerProps) => {
    const [isOpen, setOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | undefined>(undefined);

    const openModal = () => setOpen(true);
    const closeModal = () => {
        setOpen(false);
        setSelectedTemplate(undefined);
    };

    const runExport = () => {
        let entityIds: string[] = [];

        if (selectedTemplate === undefined) {
            alert('No template selected');
            return;
        }

        if (props.entityIds === undefined && props.entityIdGetter === undefined) {
            alert('Invalid params to runExport()');
            console.error('Must have either a getter or a list of strings');
            return;
        }

        if (props.entityIdGetter) {
            entityIds = props.entityIdGetter();
        } else if (props.entityIds) {
            entityIds = props.entityIds;
        }

        if (entityIds.length === 0) {
            toast.info('Found no data to export!');
            closeModal();
            return;
        }

        exportToExcel({
            type: 'template',
            fileName: selectedTemplate.name,
            templateId: selectedTemplate.id,
            entityIds: entityIds,
        });

        closeModal();
    };

    const defaultConsumerElement = (
        <button className="btn btn-primary">
            <FontAwesomeIcon icon="download" size="1x" />
            {' Export'}
        </button>
    );

    const modal = (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <div className="modal-content" style={{ minWidth: '500px' }}>
                <div className="modal-header">
                    <h4>Available export templates</h4>
                </div>
                <div className="modal-body">
                    <Query<exportTemplates, exportTemplatesVariables>
                        query={GET_TEMPLATES}
                        variables={{ entity: props.entityType as ExportEntityEnum }}
                        fetchPolicy="cache-first"
                    >
                        {({ loading, error, data }) => {
                            const queryPreData = queryPreDataHandler({ loading, error, data });
                            if (queryPreData) {
                                return queryPreData;
                            }

                            if (!data || !data.exportTemplates) {
                                return null;
                            }

                            const templates = data.exportTemplates.map((template: any) => (
                                <li
                                    key={template.exportTemplateId}
                                    className={
                                        selectedTemplate &&
                                        selectedTemplate.id === template.exportTemplateId
                                            ? `${styles.item} ${styles.selected}`
                                            : styles.item
                                    }
                                    onClick={() =>
                                        setSelectedTemplate({
                                            id: template.exportTemplateId,
                                            name: template.name,
                                        })
                                    }
                                >
                                    {template.name}
                                </li>
                            ));

                            return (
                                <ul className={styles.list}>
                                    {templates.length > 0 ? templates : <i>No templates found</i>}
                                </ul>
                            );
                        }}
                    </Query>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={closeModal}>
                        Close
                    </button>
                    {selectedTemplate && (
                        <button onClick={runExport} className="btn btn-primary">
                            Export
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );

    return (
        <>
            <div
                className={`${props.wrapperClassName ? props.wrapperClassName : ''}`}
                onClick={openModal}
            >
                {props.children || defaultConsumerElement}
            </div>
            {modal}
        </>
    );
};
