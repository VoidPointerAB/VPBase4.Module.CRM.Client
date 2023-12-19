/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getContactCompanyIdNamePairs
// ====================================================

export interface getContactCompanyIdNamePairs_contactCompanies {
  __typename: "ContactCompanyListType";
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  /**
   * The name of the company.
   */
  name: string;
}

export interface getContactCompanyIdNamePairs {
  contactCompanies: getContactCompanyIdNamePairs_contactCompanies[] | null;
}
