import gql from 'graphql-tag';

export const DISMISS_MATCH_CONTACT_PERSON = gql`
    mutation contactPersonDismissComparison($leftPersonId: String!, $rightPersonId: String!) {
        contactPersonDismissComparison(
            leftPersonId: $leftPersonId
            rightPersonId: $rightPersonId
        )
    }
`;
