import gql from 'graphql-tag';

export const GET_PROPERTIES_FOR_TEMPLATE = gql`
    query properties($exportTemplateId: String, $entity: ExportEntityEnum!) {
        exportProperties(exportTemplateId: $exportTemplateId, entity: $entity) {
            id
            title
            selected
        }
    }
`;
