import gql from 'graphql-tag';

export const DELETE_TEMPLATE = gql`
    mutation deleteExportTemplate($id: String!) {
        deleteExportTemplate(id: $id)
    }
`;
