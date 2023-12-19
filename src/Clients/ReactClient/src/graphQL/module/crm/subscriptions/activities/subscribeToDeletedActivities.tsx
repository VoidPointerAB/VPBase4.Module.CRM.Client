import gql from 'graphql-tag';

export const DELETED_ACTIVITIES_SUBSCRIPTION = gql `
    subscription deleteActivitiesSubscription {
        activityDeletedEvent {
            activityId
        }
    }
`
;