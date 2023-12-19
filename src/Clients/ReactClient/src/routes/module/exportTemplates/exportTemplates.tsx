import React from 'react';
import { Query } from 'react-apollo';
import ReactSelect from 'react-select';
import _ from 'lodash';
import { toast } from 'react-toastify';

import apolloClient from 'apolloClient';

import { generateId, entityType } from 'helpers/module/idGenerator';
import { handleGraphQlErrors, handleGraphQlException } from 'helpers/module/errorManagement';
import { ConfirmDialog } from 'helpers/module/dialogs';

import IBox from 'components/module/inspinia/IBox/templates/IBox-template-basic';

import { TemplateEditor } from './TemplateEditor/TemplateEditor';

import { GET_TEMPLATES } from 'graphQL/module/queries/exportTemplate/getTemplates';
import { GET_PROPERTIES_FOR_TEMPLATE } from 'graphQL/module/queries/exportTemplate/getPropertiesForTemplate';
import { CREATE_TEMPLATE } from 'graphQL/module/mutations/exportTemplate/createNewTemplate';
import { UPDATE_TEMPLATE } from 'graphQL/module/mutations/exportTemplate/updateTemplate';
import { DELETE_TEMPLATE } from 'graphQL/module/mutations/exportTemplate/deleteTemplate';
import {
    updateExportTemplate,
    updateExportTemplateVariables,
} from 'graphQL/module/generatedTypes/updateExportTemplate';
import {
    addExportTemplate,
    addExportTemplateVariables,
} from 'graphQL/module/generatedTypes/addExportTemplate';
import {
    deleteExportTemplate,
    deleteExportTemplateVariables,
} from 'graphQL/module/generatedTypes/deleteExportTemplate';
import {
    exportTemplates,
    exportTemplatesVariables,
} from 'graphQL/module/generatedTypes/exportTemplates';
import { properties, propertiesVariables } from 'graphQL/module/generatedTypes/properties';

import { reactSelectDefaultStyles } from 'components/module/Form/Select/Select';

import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import { exportToExcel } from 'helpers/module/excelExporter';

import { ENTITY_TYPES } from './exportTemplateEntities';

import styles from './exportTemplates.module.css';
import { ExportEntityEnum } from 'graphQL/module/generatedTypes/globalTypes';

interface ExportTemplatesProps {}

interface ExportTemplatesState {
    entityType: string;
    templateId: string | undefined;
    editorState: EditorState;
    isWaitingForServerResponse: boolean;
}

export type EditorState = 'HIDDEN' | 'EDIT' | 'CREATE';

export interface TemplateProperty {
    id: string;
    title: string;
    selected: boolean;
}

class ExportTemplates extends React.Component<ExportTemplatesProps, ExportTemplatesState> {
    public constructor(props: ExportTemplatesProps) {
        super(props);

        this.state = {
            entityType: Object.keys(ENTITY_TYPES)[0],
            templateId: undefined,
            editorState: 'HIDDEN',
            isWaitingForServerResponse: false,
        };
    }

    private currentTemplates: { id: string; name: string }[] = [];

    public setEntity = (id: string) => {
        this.setState({ entityType: id, templateId: undefined, editorState: 'HIDDEN' });
    };

    public setTemplate = (id: string) => {
        this.setState({ templateId: id, editorState: 'HIDDEN' });
    };

    public setEditorState = (editorState: EditorState) => {
        this.setState({ editorState: editorState });
    };

    public updateTemplate = (name: string, properties: TemplateProperty[]) => {
        if (this.foundError(name, properties)) {
            return;
        }

        if (this.state.templateId === undefined) {
            return;
        }

        this.setState({ isWaitingForServerResponse: true }, () =>
            apolloClient
                .mutate<updateExportTemplate, updateExportTemplateVariables>({
                    mutation: UPDATE_TEMPLATE,
                    refetchQueries: [
                        { query: GET_TEMPLATES, variables: { entity: this.state.entityType } },
                    ],
                    variables: {
                        input: {
                            exportTemplateId: this.state.templateId as string,
                            name: name,
                            propertyIds: properties.map(property => property.id),
                        },
                    },
                })
                .then(({ errors }: any) => {
                    handleGraphQlErrors(errors, () => {
                        toast.info('Template updated');

                        this.setState({ editorState: 'HIDDEN' });
                    });
                })
                .catch((error: any) => {
                    handleGraphQlException(error);
                })
                .finally(() => this.setState({ isWaitingForServerResponse: false }))
        );
    };

    public createTemplate = (name: string, isPersonal: boolean, properties: TemplateProperty[]) => {
        if (this.foundError(name, properties)) {
            return;
        }

        const generatedId = generateId(entityType.ExportTemplate);

        this.setState({ isWaitingForServerResponse: true }, () =>
            apolloClient
                .mutate<addExportTemplate, addExportTemplateVariables>({
                    mutation: CREATE_TEMPLATE,
                    refetchQueries: [
                        { query: GET_TEMPLATES, variables: { entity: this.state.entityType } },
                    ],
                    variables: {
                        input: {
                            exportTemplateId: generatedId,
                            name: name,
                            entity: this.state.entityType as ExportEntityEnum,
                            propertyIds: properties.map(property => property.id),
                            userTemplate: isPersonal,
                        },
                    },
                })
                .then(({ errors }: any) => {
                    handleGraphQlErrors(errors, () => {
                        toast.info(`Created template "${name}"`);

                        this.setState({ templateId: generatedId, editorState: 'HIDDEN' });
                    });
                })
                .catch((error: any) => {
                    handleGraphQlException(error);
                })
                .finally(() => this.setState({ isWaitingForServerResponse: false }))
        );
    };

    public deleteTemplate = () => {
        ConfirmDialog('Delete template', 'Are you sure you want to delete this template?').then(
            result => {
                if (result.value) {
                    if (this.state.templateId === undefined) {
                        return;
                    }

                    this.setState({ isWaitingForServerResponse: true }, () =>
                        apolloClient
                            .mutate<deleteExportTemplate, deleteExportTemplateVariables>({
                                mutation: DELETE_TEMPLATE,
                                refetchQueries: [
                                    {
                                        query: GET_TEMPLATES,
                                        variables: { entity: this.state.entityType },
                                    },
                                ],
                                variables: {
                                    id: this.state.templateId as string,
                                },
                            })
                            .then(({ errors }: any) => {
                                handleGraphQlErrors(errors, () => {
                                    toast.info('Template deleted');

                                    this.setState({ templateId: undefined, editorState: 'HIDDEN' });
                                });
                            })
                            .catch((error: any) => {
                                handleGraphQlException(error);
                            })
                            .finally(() => this.setState({ isWaitingForServerResponse: false }))
                    );
                }
            }
        );
    };

    public export = (fileName: string) => {
        exportToExcel({
            type: 'template',
            fileName,
            templateId: this.state.templateId,
            entityIds: [],
        });
    };

    private foundError(name: string, properties: TemplateProperty[]) {
        toast.dismiss();
        let foundError = false;

        if (!name) {
            toast.error('Template name is required');
            foundError = true;
        }

        const findCondition =
            this.state.editorState === 'CREATE'
                ? (t: any) => t.name === name
                : (t: any) => t.id !== this.state.templateId && t.name === name;
        if (_.find(this.currentTemplates, findCondition)) {
            toast.error('A template with this name already exists');
            foundError = true;
        }

        if (properties.length === 0) {
            toast.error('A template must include at least one property');
            foundError = true;
        }

        return foundError;
    }

    public render() {
        return (
            <Query<exportTemplates, exportTemplatesVariables>
                query={GET_TEMPLATES}
                variables={{ entity: this.state.entityType as ExportEntityEnum }}
            >
                {({ loading, error, data }) => {
                    const queryPreData = queryPreDataHandler({ loading, error, data });
                    if (queryPreData) {
                        return queryPreData;
                    }
                    if (!data) {
                        return null;
                    }
                    const { exportTemplates } = data;
                    const currentTemplate: any = _.find(exportTemplates, {
                        exportTemplateId: this.state.templateId,
                    });

                    const entityOptions = Object.keys(ENTITY_TYPES).map(entityType => ({
                        value: entityType,
                        label: ENTITY_TYPES[entityType],
                    }));

                    if (!exportTemplates) {
                        return null;
                    }

                    const templateOptions: { value: string; label: string }[] = exportTemplates.map(
                        ({ exportTemplateId, name }: any) => ({
                            value: exportTemplateId,
                            label: name,
                        })
                    );

                    this.currentTemplates = exportTemplates.map(
                        ({ exportTemplateId, name }: any) => ({ id: exportTemplateId, name })
                    );

                    let selectedTemplate: any = _.find(templateOptions, {
                        value: this.state.templateId,
                    });
                    if (!selectedTemplate) {
                        selectedTemplate = null;
                    }

                    return (
                        <IBox className={styles.exportTemplates}>
                            <div className={styles.selectWrapper}>
                                <h4>Entity</h4>
                                <ReactSelect
                                    options={entityOptions}
                                    value={_.find(entityOptions, { value: this.state.entityType })}
                                    styles={reactSelectDefaultStyles}
                                    onChange={(selectedValue: any) =>
                                        this.setEntity(selectedValue.value)
                                    }
                                />
                            </div>

                            <div className="mt-3 mb-3">
                                <h4>Template</h4>
                                <div>
                                    <div className={styles.selectWrapper}>
                                        <ReactSelect
                                            options={templateOptions}
                                            value={selectedTemplate}
                                            styles={reactSelectDefaultStyles}
                                            onChange={(selectedValue: any) =>
                                                this.setTemplate(selectedValue.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {this.state.editorState === 'HIDDEN' && (
                                <div className={styles.buttonContainer}>
                                    {this.state.templateId && (
                                        <>
                                            <button
                                                className="btn btn-success"
                                                onClick={() => this.export(selectedTemplate.label)}
                                            >
                                                Export data to excel
                                            </button>

                                            <div className={styles.buttonSeparator} />
                                        </>
                                    )}

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => this.setEditorState('CREATE')}
                                    >
                                        Create new
                                    </button>

                                    {this.state.templateId && (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => this.setEditorState('EDIT')}
                                        >
                                            Edit
                                        </button>
                                    )}

                                    {this.state.templateId && (
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => this.deleteTemplate()}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            )}

                            {this.state.editorState !== 'HIDDEN' && (
                                <Query<properties, propertiesVariables>
                                    query={GET_PROPERTIES_FOR_TEMPLATE}
                                    variables={{
                                        entity: this.state.entityType as ExportEntityEnum,
                                        exportTemplateId: this.state.templateId,
                                    }}
                                >
                                    {({ loading, error, data }) => {
                                        const queryPreData = queryPreDataHandler({
                                            loading,
                                            error,
                                            data,
                                        });
                                        if (queryPreData) {
                                            return queryPreData;
                                        }

                                        if (!data) {
                                            return null;
                                        }

                                        const isEditing = this.state.editorState === 'EDIT';

                                        const name = isEditing ? currentTemplate.name : '';

                                        const isPersonal = isEditing
                                            ? currentTemplate.userTemplate
                                            : false;

                                        let { exportProperties } = data;

                                        if (!exportProperties) {
                                            return null;
                                        }
                                        exportProperties = isEditing
                                            ? exportProperties
                                            : exportProperties.map((property: any) => ({
                                                  ...property,
                                                  selected: false,
                                              }));

                                        return (
                                            <TemplateEditor
                                                editorState={this.state.editorState}
                                                name={name}
                                                isPersonal={isPersonal}
                                                entityProperties={exportProperties}
                                                isWaitingForServerResponse={this.state.isWaitingForServerResponse}
                                                update={this.updateTemplate}
                                                create={this.createTemplate}
                                                close={() => this.setEditorState('HIDDEN')}
                                            />
                                        );
                                    }}
                                </Query>
                            )}
                        </IBox>
                    );
                }}
            </Query>
        );
    }
}

export default ExportTemplates;
