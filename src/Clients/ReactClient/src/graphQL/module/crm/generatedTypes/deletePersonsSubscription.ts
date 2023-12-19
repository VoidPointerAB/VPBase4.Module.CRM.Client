/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: deletePersonsSubscription
// ====================================================

export interface deletePersonsSubscription_contactPersonDeletedEvent {
  __typename: "ContactPersonDeletedEventType";
  contactPersonId: string;
}

export interface deletePersonsSubscription {
  contactPersonDeletedEvent: deletePersonsSubscription_contactPersonDeletedEvent | null;
}
