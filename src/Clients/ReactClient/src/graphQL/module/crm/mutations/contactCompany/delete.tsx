import gql from 'graphql-tag';

export const DELETE_CONTACTCOMPANY =  gql`
mutation deleteContactCompany($id: String!) {
    deleteContactCompany(id: $id)
}
`;

