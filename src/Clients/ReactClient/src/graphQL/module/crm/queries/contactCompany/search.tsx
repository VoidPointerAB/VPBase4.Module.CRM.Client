import gql from 'graphql-tag';

export const GET_SEARCH_RESULTS = gql`
    query search($text: String!, $limit: Int!) {
        search(text: $text, limit: $limit) {
            entityId
            entityName
            entityType
        }
    }
`;