/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: contactCompanyListSearch
// ====================================================

export interface contactCompanyListSearch_contactCompanySearch {
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

export interface contactCompanyListSearch {
  contactCompanySearch: contactCompanyListSearch_contactCompanySearch[] | null;
}

export interface contactCompanyListSearchVariables {
  term: string;
}
