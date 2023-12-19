/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCompanyData
// ====================================================

export interface getCompanyData_contactCompanies {
  __typename: "ContactCompanyListType";
  /**
   * The name of the company.
   */
  name: string;
  /**
   * The id of the company.
   */
  contactCompanyId: string;
}

export interface getCompanyData {
  contactCompanies: getCompanyData_contactCompanies[] | null;
}
