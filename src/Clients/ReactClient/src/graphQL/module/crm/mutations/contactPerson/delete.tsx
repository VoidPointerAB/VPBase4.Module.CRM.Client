import gql from 'graphql-tag';

export const DELETE_CONTACT_PERSON =  gql`
mutation deleteContactPerson($id: String!) {
    deleteContactPerson(id: $id)
}
`;

