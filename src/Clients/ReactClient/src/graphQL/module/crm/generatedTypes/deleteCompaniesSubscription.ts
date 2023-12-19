/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: deleteCompaniesSubscription
// ====================================================

export interface deleteCompaniesSubscription_contactCompanyDeletedEvent {
  __typename: "ContactCompanyDeletedEventType";
  contactCompanyId: string;
}

export interface deleteCompaniesSubscription {
  contactCompanyDeletedEvent: deleteCompaniesSubscription_contactCompanyDeletedEvent | null;
}
