/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: deleteActivitySubscription
// ====================================================

export interface deleteActivitySubscription_activityDeletedEvent {
  __typename: "ActivityDeletedEventType";
  activityId: string;
}

export interface deleteActivitySubscription {
  activityDeletedEvent: deleteActivitySubscription_activityDeletedEvent | null;
}

export interface deleteActivitySubscriptionVariables {
  activityId?: string | null;
}
