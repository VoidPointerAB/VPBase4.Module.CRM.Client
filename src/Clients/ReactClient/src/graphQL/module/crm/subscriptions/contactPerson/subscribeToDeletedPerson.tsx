import gql from 'graphql-tag';

export const DELETED_PERSON_SUBSCRIPTION = gql `
    subscription deletePersonSubscription($contactPersonId: String) {
        contactPersonDeletedEvent(contactPersonId: $contactPersonId) {
            contactPersonId
        }
    }
`
;