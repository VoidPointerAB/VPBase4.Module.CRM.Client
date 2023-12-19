import gql from 'graphql-tag';

export const DELETED_COMPANIES_SUBSCRIPTION = gql `
    subscription deleteCompaniesSubscription {
        contactCompanyDeletedEvent {
            contactCompanyId
        }
    }
`
;