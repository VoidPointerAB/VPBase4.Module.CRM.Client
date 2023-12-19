import gql from 'graphql-tag';

export const DELETED_ACTIVITY_SUBSCRIPTION = gql `
    subscription deleteActivitySubscription($activityId: String) {
        activityDeletedEvent(activityId: $activityId) {
            activityId
        }
    }
`
;