/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: deleteActivitiesSubscription
// ====================================================

export interface deleteActivitiesSubscription_activityDeletedEvent {
  __typename: "ActivityDeletedEventType";
  activityId: string;
}

export interface deleteActivitiesSubscription {
  activityDeletedEvent: deleteActivitiesSubscription_activityDeletedEvent | null;
}
