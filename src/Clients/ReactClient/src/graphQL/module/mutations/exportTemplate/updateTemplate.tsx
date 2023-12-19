import gql from 'graphql-tag';

export const UPDATE_TEMPLATE = gql`
    mutation updateExportTemplate($input: ExportTemplateUpdateInput!) {
        updateExportTemplate(input: $input)
    }
`;
