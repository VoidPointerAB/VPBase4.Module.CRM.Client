/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: deleteCompanySubscription
// ====================================================

export interface deleteCompanySubscription_contactCompanyDeletedEvent {
  __typename: "ContactCompanyDeletedEventType";
  contactCompanyId: string;
}

export interface deleteCompanySubscription {
  contactCompanyDeletedEvent: deleteCompanySubscription_contactCompanyDeletedEvent | null;
}

export interface deleteCompanySubscriptionVariables {
  contactCompanyId?: string | null;
}
