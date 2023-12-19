import gql from 'graphql-tag';

export const DELETE_ACTIVITY = gql`
mutation deleteActivity ($id: String!) {
    deleteActivity(id: $id)
}
`;

