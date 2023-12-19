/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: deletePersonSubscription
// ====================================================

export interface deletePersonSubscription_contactPersonDeletedEvent {
  __typename: "ContactPersonDeletedEventType";
  contactPersonId: string;
}

export interface deletePersonSubscription {
  contactPersonDeletedEvent: deletePersonSubscription_contactPersonDeletedEvent | null;
}

export interface deletePersonSubscriptionVariables {
  contactPersonId?: string | null;
}
