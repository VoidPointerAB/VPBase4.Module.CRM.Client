import gql from 'graphql-tag';

export const ADVANCED_SEARCH_DATA = gql`
    query advancedSearchData($entityType: AdvancedFilterEntityEnum!) {
        advancedFilterConditions(entity: $entityType) {
            friendlyName
            conditionKey
            description
            entity
        }
        advancedFilterTemplates(entity: $entityType) {
            advancedFilterTemplateId
            name
            filter {
                term
                has
                entity
            }
        }
    }
`;

export const ADVANCED_SEARCH_ADD_TEMPLATE = gql`
    mutation addAdvancedFilterTemplate($input: AdvancedFilterTemplateAddInput!) {
        addAdvancedFilterTemplate(input: $input)
    }
`;

export const ADVANCED_SEARCH_UPDATE_TEMPLATE = gql`
    mutation updateAdvancedFilterTemplate($input: AdvancedFilterTemplateUpdateInput!) {
        updateAdvancedFilterTemplate(input: $input)
    }
`;

export const ADVANCED_SEARCH_DELETE_TEMPLATE = gql`
    mutation deleteAdvancedFilterTemplate($id: String!) {
        deleteAdvancedFilterTemplate(id: $id)
    }
`;