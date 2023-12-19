/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCompanies
// ====================================================

export interface getCompanies_contactCompanies {
  __typename: "ContactCompanyType";
  /**
   * The name of the company.
   */
  name: string;
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  isUserFavorite: boolean | null;
  /**
   * The id of the user that created the company.
   */
  createdByUserId: string;
}

export interface getCompanies {
  contactCompanies: (getCompanies_contactCompanies | null)[] | null;
}
