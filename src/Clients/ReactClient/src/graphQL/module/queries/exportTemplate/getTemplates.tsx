import gql from 'graphql-tag';

export const GET_TEMPLATES = gql`
    query exportTemplates($entity: ExportEntityEnum!) {
        exportTemplates(entity: $entity) {
            exportTemplateId
            name
            userTemplate
        }
    }
`;
