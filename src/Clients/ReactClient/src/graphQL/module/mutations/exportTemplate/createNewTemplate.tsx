import gql from 'graphql-tag';

export const CREATE_TEMPLATE = gql`
    mutation addExportTemplate($input: ExportTemplateAddInput!) {
        addExportTemplate(input: $input)
    }
`;
