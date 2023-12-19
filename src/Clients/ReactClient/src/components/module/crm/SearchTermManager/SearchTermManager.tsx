import React from 'react';
import { Query } from 'react-apollo';

import {
    TemplateManager,
    ITemplate,
    ISearchTerm,
    ICondition,
} from './TemplateManager/TemplateManager';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import { ADVANCED_SEARCH_DATA } from 'graphQL/module/crm/queries/advancedSearch/advancedSearch';
import { AdvancedFilterEntityEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';
import { advancedSearchData, advancedSearchDataVariables } from 'graphQL/module/crm/generatedTypes/advancedSearchData';

interface IAdvancedFilterProps {
    selectedTemplateId?: string;
    entityType: AdvancedFilterEntityEnum;
    activeSearchTerms: ISearchTerm[];
    setActiveSearchTerms(searchTerms: ISearchTerm[]): void;
}

export const SearchTermManager = (props: IAdvancedFilterProps) => (
    <Query<advancedSearchData, advancedSearchDataVariables> 
        query={ADVANCED_SEARCH_DATA} 
        variables={{ entityType: props.entityType }}
    >
        {({ loading, error, data }) => {
            const queryPreData = queryPreDataHandler({ loading, error, data });

            if (queryPreData) {
                return queryPreData;
            }

            if (!data || !data.advancedFilterTemplates || !data.advancedFilterConditions) {
                return null;
            }

            const availableTemplates = data.advancedFilterTemplates.map(
                (template: any): ITemplate => {
                    return {
                        id: template.advancedFilterTemplateId,
                        isPrivate: false,
                        name: template.name,
                        searchTerms: template.filter.map(
                            (searchTerm: any): ISearchTerm => {
                                return {
                                    term: searchTerm.term,
                                    has: searchTerm.has,
                                    entityType: searchTerm.entity,
                                };
                            }
                        ),
                    };
                }
            );

            const availableConditions = data.advancedFilterConditions.map(
                (condition: any): ICondition => {
                    return {
                        label: condition.friendlyName,
                        searchDefinition: condition.conditionKey,
                        description: condition.description,
                        entityType: condition.entity,
                    };
                }
            );

            const selectedTemplateId =
                availableTemplates.length > 0 ? availableTemplates[0].id : null;

            return (
                <TemplateManager
                    selectedTemplateId={
                        props.selectedTemplateId ? props.selectedTemplateId : selectedTemplateId
                    }
                    initiallyAvailableTemplates={availableTemplates}
                    availableConditions={availableConditions}
                    entityType={props.entityType}
                    loadData={props.setActiveSearchTerms}
                />
            );
        }}
    </Query>
);
