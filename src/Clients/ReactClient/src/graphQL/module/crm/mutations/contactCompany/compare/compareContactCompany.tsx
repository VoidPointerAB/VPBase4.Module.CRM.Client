import gql from 'graphql-tag';

export const COMPARE_CONTACT_COMPANY = gql`
    mutation compareContactCompany(
        $updateCompany: ContactCompanyUpdateInput!
        $transferPersons: Boolean
        $transferActivities: Boolean
        $merge: Boolean
        $fromContactCompanyId: String
    ) {
        compareContactCompany(
            input: {
                updateCompany: $updateCompany
                transferPersons: $transferPersons
                transferActivities: $transferActivities
                merge: $merge
                fromContactCompanyId: $fromContactCompanyId
            }
        )
    }
`;
