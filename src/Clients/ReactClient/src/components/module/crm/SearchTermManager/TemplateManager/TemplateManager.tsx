import React from 'react';
import _ from 'lodash';

import { ConfirmDialog } from 'helpers/module/dialogs';
import { genericErrorToast } from 'helpers/module/crm/errorManagement';
import { generateId, entityType } from 'helpers/module/idGenerator';

import { TemplateManagerContext } from './templateManagerContext';
import { TemplateManagerHeader } from '../TemplateManagerHeader/TemplateManagerHeader';
import { TemplateDetailsContainer } from '../TemplateDetailsContainer/TemplateDetailsContainer';
import { NewTemplateModal } from '../NewTemplateModal/NewTemplateModal';

import { IBox, IBoxContent } from 'components/module/inspinia/IBox/IBox';

import apolloClient from 'apolloClient';

import {
    ADVANCED_SEARCH_ADD_TEMPLATE,
    ADVANCED_SEARCH_UPDATE_TEMPLATE,
    ADVANCED_SEARCH_DELETE_TEMPLATE,
} from 'graphQL/module/crm/queries/advancedSearch/advancedSearch';
import { AdvancedFilterEntityEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';
import {
    addAdvancedFilterTemplate,
    addAdvancedFilterTemplateVariables,
} from 'graphQL/module/crm/generatedTypes/addAdvancedFilterTemplate';
import {
    updateAdvancedFilterTemplate,
    updateAdvancedFilterTemplateVariables,
} from 'graphQL/module/crm/generatedTypes/updateAdvancedFilterTemplate';
import {
    deleteAdvancedFilterTemplate,
    deleteAdvancedFilterTemplateVariables,
} from 'graphQL/module/crm/generatedTypes/deleteAdvancedFilterTemplate';
export interface ITemplate {
    id: string;
    name: string;
    isPrivate: boolean;
    searchTerms: ISearchTerm[];
}

export interface ICondition {
    label: string;
    searchDefinition: string;
    description: string;
    entityType: AdvancedFilterEntityEnum | null;
}

export interface ISearchTerm {
    term: string;
    has: boolean;
    entityType: AdvancedFilterEntityEnum | null;
}

interface ITemplateManagerProps {
    selectedTemplateId: string | null;
    initiallyAvailableTemplates: ITemplate[];
    availableConditions: ICondition[];
    entityType: AdvancedFilterEntityEnum;
    loadData(searchTerms: ISearchTerm[]): void;
}

interface ITemplateManagerState {
    selectedTemplateId: string | null;
    currentTemplateName: string;
    availableTemplates: ITemplate[];
    currentSearchTerms: ISearchTerm[];
    isShowingTemplateDetails: boolean;
    newTemplateModalIsOpen: boolean;
    isWaitingForServerResponse: boolean;
}

export class TemplateManager extends React.Component<ITemplateManagerProps, ITemplateManagerState> {
    public constructor(props: ITemplateManagerProps) {
        super(props);

        const { selectedTemplateId } = props;
        let availableTemplates = _.cloneDeep(this.props.initiallyAvailableTemplates);
        availableTemplates = _.sortBy(availableTemplates, ['name']);
        const selectedTemplate = getSelectedTemplate(selectedTemplateId, availableTemplates);

        this.state = {
            selectedTemplateId: selectedTemplateId,
            currentTemplateName: selectedTemplate.name,
            availableTemplates: availableTemplates,
            currentSearchTerms: selectedTemplate.searchTerms,
            isShowingTemplateDetails: selectedTemplateId === null,
            newTemplateModalIsOpen: false,
            isWaitingForServerResponse: false,
        };
    }

    public openTemplateModal = () => {
        this.setState({ newTemplateModalIsOpen: true });
    };

    public closeTemplateModal = () => {
        this.setState({ newTemplateModalIsOpen: false });
    };

    public createNewTemplate = (templateName: string, isPrivate: boolean) => {
        if (!templateName) {
            return;
        }

        const idRandomizer = generateId(entityType.AdvancedSearchTemplate);

        this.setState({ isWaitingForServerResponse: true }, () =>
            apolloClient
                .mutate<addAdvancedFilterTemplate, addAdvancedFilterTemplateVariables>({
                    mutation: ADVANCED_SEARCH_ADD_TEMPLATE,
                    variables: {
                        input: {
                            advancedFilterTemplateId: idRandomizer,
                            name: templateName,
                            entity: this.props.entityType,
                            filter: this.state.currentSearchTerms.map(searchTerm => {
                                return {
                                    term: searchTerm.term,
                                    has: searchTerm.has,
                                    entity: searchTerm.entityType,
                                };
                            }),
                            userTemplate: isPrivate,
                        },
                    },
                })
                .then((response: any) => {
                    if (response.errors) {
                        genericErrorToast();
                        return;
                    }

                    let updatedAvailableTemplates = _.cloneDeep(this.state.availableTemplates);
                    updatedAvailableTemplates.push({
                        id: idRandomizer,
                        name: templateName,
                        isPrivate: isPrivate,
                        searchTerms: this.state.currentSearchTerms,
                    });
                    updatedAvailableTemplates = _.sortBy(updatedAvailableTemplates, ['name']);

                    this.setState({
                        availableTemplates: updatedAvailableTemplates,
                        selectedTemplateId: idRandomizer,
                        currentTemplateName: templateName,
                        newTemplateModalIsOpen: false,
                    });
                })
                .catch(genericErrorToast)
                .finally(() => this.setState({ isWaitingForServerResponse: false }))
        );
    };

    public saveCurrentTemplate = () => {
        if (this.state.selectedTemplateId === null) {
            return;
        }

        const save = () => {
            this.setState({ isWaitingForServerResponse: true }, () =>
                apolloClient
                    .mutate<updateAdvancedFilterTemplate, updateAdvancedFilterTemplateVariables>({
                        mutation: ADVANCED_SEARCH_UPDATE_TEMPLATE,
                        variables: {
                            input: {
                                advancedFilterTemplateId: this.state.selectedTemplateId as string,
                                name: this.state.currentTemplateName,
                                filter: this.state.currentSearchTerms.map(searchTerm => {
                                    return {
                                        term: searchTerm.term,
                                        has: searchTerm.has,
                                        entity: searchTerm.entityType,
                                    };
                                }),
                            },
                        },
                    })
                    .then((response: any) => {
                        if (response.errors) {
                            genericErrorToast();
                            return;
                        }

                        const selectedTemplate = getSelectedTemplate(
                            this.state.selectedTemplateId,
                            this.state.availableTemplates
                        );
                        selectedTemplate.name = this.state.currentTemplateName;
                        selectedTemplate.searchTerms = this.state.currentSearchTerms;

                        let updatedAvailableTemplates = this.state.availableTemplates.filter(
                            template => template.id !== this.state.selectedTemplateId
                        );
                        updatedAvailableTemplates.push(selectedTemplate);
                        updatedAvailableTemplates = _.sortBy(updatedAvailableTemplates, ['name']);

                        this.setState({
                            selectedTemplateId: selectedTemplate.id,
                            currentTemplateName: selectedTemplate.name,
                            availableTemplates: updatedAvailableTemplates,
                        });
                    })
                    .catch(genericErrorToast)
                    .finally(() => this.setState({ isWaitingForServerResponse: false }))
            );
        };

        const templateNameInSelect = getSelectedTemplate(
            this.state.selectedTemplateId,
            this.state.availableTemplates
        ).name;

        ConfirmDialog(
            `Save "${templateNameInSelect}"?`,
            'Are you sure you want to update this filter?'
        )
            .then(result => {
                if (result.value) {
                    save();
                }
            })
            .catch(genericErrorToast);
    };

    public removeTemplate = () => {
        if (this.state.selectedTemplateId === null) {
            return;
        }

        const remove = () =>
            this.setState({ isWaitingForServerResponse: true }, () =>
                apolloClient
                    .mutate<deleteAdvancedFilterTemplate, deleteAdvancedFilterTemplateVariables>({
                        mutation: ADVANCED_SEARCH_DELETE_TEMPLATE,
                        variables: {
                            id: this.state.selectedTemplateId as string,
                        },
                    })
                    .then((response: any) => {
                        if (response.errors) {
                            genericErrorToast();
                            return;
                        }

                        const availableTemplatesAfterRemoval = this.state.availableTemplates.filter(
                            template => template.id !== this.state.selectedTemplateId
                        );
                        const selectedIdAfterRemoval =
                            availableTemplatesAfterRemoval.length > 0
                                ? availableTemplatesAfterRemoval[0].id
                                : null;

                        this.setState(
                            {
                                availableTemplates: availableTemplatesAfterRemoval,
                            },
                            () => this.setSelectedTemplateId(selectedIdAfterRemoval)
                        );
                    })
                    .catch(genericErrorToast)
                    .finally(() => this.setState({ isWaitingForServerResponse: false }))
            );

        const templateNameInSelect = getSelectedTemplate(
            this.state.selectedTemplateId,
            this.state.availableTemplates
        ).name;

        ConfirmDialog(`Delete "${templateNameInSelect}"?`)
            .then(result => {
                if (result.value) {
                    remove();
                }
            })
            .catch(genericErrorToast);
    };

    public updateTemplateName = (e: any) => {
        this.setState({ currentTemplateName: e.target.value });
    };

    public loadData = () => {
        this.props.loadData(this.state.currentSearchTerms);
    };

    public toggleShowTemplateDetails = () =>
        this.setState((prevState: ITemplateManagerState) => ({
            isShowingTemplateDetails: !prevState.isShowingTemplateDetails,
        }));

    public setSelectedTemplateId = (id: string | null) => {
        if (id === null) {
            this.setState({
                selectedTemplateId: null,
                currentTemplateName: '',
                currentSearchTerms: [],
                isShowingTemplateDetails: true,
            });
            return;
        }

        const newTemplate = getSelectedTemplate(id, this.state.availableTemplates);

        this.setState({
            selectedTemplateId: newTemplate.id,
            currentTemplateName: newTemplate.name,
            currentSearchTerms: newTemplate.searchTerms,
        });
    };

    public addSearchTerm = (searchTerm: ISearchTerm) => {
        const newSearchTerms = _.cloneDeep(this.state.currentSearchTerms);
        newSearchTerms.push(searchTerm);
        this.setState({ currentSearchTerms: newSearchTerms });
    };

    public removeSearchTerm = (searchTermToRemove: ISearchTerm) => {
        this.setState({
            currentSearchTerms: this.state.currentSearchTerms.filter(
                searchTerm => searchTerm.term !== searchTermToRemove.term
            ),
        });
    };

    public render() {
        return (
            <TemplateManagerContext.Provider
                value={{
                    openNewTemplateModal: this.openTemplateModal,
                    isShowingTemplateDetails: this.state.isShowingTemplateDetails,
                    templateHasContent: this.state.currentSearchTerms.length > 0,
                    canManageTemplate: this.state.selectedTemplateId !== null,
                    isWaitingForServerResponse: this.state.isWaitingForServerResponse,
                    saveTemplate: this.saveCurrentTemplate,
                    removeTemplate: this.removeTemplate,
                    loadData: this.loadData,
                }}
            >
                <IBox>
                    <NewTemplateModal
                        isOpen={this.state.newTemplateModalIsOpen}
                        onCreate={this.createNewTemplate}
                        onDismiss={this.closeTemplateModal}
                    />
                    <IBoxContent>
                        <TemplateManagerHeader
                            isShowingTemplateDetails={this.state.isShowingTemplateDetails}
                            selectedTemplateId={this.state.selectedTemplateId}
                            availableTemplates={this.state.availableTemplates}
                            setSelectedTemplateId={this.setSelectedTemplateId}
                            toggleShowTemplateDetails={this.toggleShowTemplateDetails}
                        />
                    </IBoxContent>
                    {this.state.isShowingTemplateDetails && (
                        <IBoxContent className="pt-0 pb-0">
                            <TemplateDetailsContainer
                                currentTemplateId={this.state.selectedTemplateId}
                                currentTemplateName={this.state.currentTemplateName}
                                currentSearchTerms={this.state.currentSearchTerms}
                                availableConditions={this.props.availableConditions}
                                updateTemplateName={this.updateTemplateName}
                                addSearchTerm={this.addSearchTerm}
                                removeSearchTerm={this.removeSearchTerm}
                            />
                        </IBoxContent>
                    )}
                </IBox>
            </TemplateManagerContext.Provider>
        );
    }
}

function getSelectedTemplate(
    templateId: string | null,
    availableTemplates: ITemplate[]
): ITemplate {
    if (templateId === null) {
        return {
            id: '',
            name: '',
            isPrivate: false,
            searchTerms: [],
        };
    }

    const currentTemplate = _.find(availableTemplates, {
        id: templateId,
    });

    if (currentTemplate === undefined) {
        throw new Error(`Tried to select unknown template with id ${templateId}`);
    }

    return _.cloneDeep(currentTemplate);
}
