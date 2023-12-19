import gql from 'graphql-tag';

export const DELETED_PERSONS_SUBSCRIPTION = gql `
    subscription deletePersonsSubscription {
        contactPersonDeletedEvent {
            contactPersonId
        }
    }
`
;