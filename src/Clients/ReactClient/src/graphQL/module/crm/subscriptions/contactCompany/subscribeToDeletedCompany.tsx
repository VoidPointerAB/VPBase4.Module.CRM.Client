import gql from 'graphql-tag';

export const DELETED_COMPANY_SUBSCRIPTION = gql ` 
    subscription deleteCompanySubscription($contactCompanyId: String) {
        contactCompanyDeletedEvent(contactCompanyId: $contactCompanyId) {
            contactCompanyId
        }
    }
`
;