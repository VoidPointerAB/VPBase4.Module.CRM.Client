import gql from 'graphql-tag';

export const COMPARE_CONTACT_PERSON = gql`
    mutation compareContactPerson(
        $updatePerson: ContactPersonUpdateInput!
        $transferActivities: Boolean
        $merge: Boolean
        $fromContactPersonId: String
    ) {
        compareContactPerson(
            input: {
                updatePerson: $updatePerson
                transferActivities: $transferActivities
                merge: $merge
                fromContactPersonId: $fromContactPersonId
            }
        )
    }
`;
