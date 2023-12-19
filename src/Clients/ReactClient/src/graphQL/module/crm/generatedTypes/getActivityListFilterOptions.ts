/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getActivityListFilterOptions
// ====================================================

export interface getActivityListFilterOptions_contactCompaniesLite {
  __typename: "ContactCompanyLiteListType";
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  /**
   * The name of the company.
   */
  name: string;
}

export interface getActivityListFilterOptions_contactPersonsLite {
  __typename: "ContactPersonLiteListType";
  /**
   * The id of the person.
   */
  contactPersonId: string;
  /**
   * The last name of the person.
   */
  lastName: string | null;
  /**
   * The first name of the person.
   */
  firstName: string;
}

export interface getActivityListFilterOptions {
  contactCompaniesLite: getActivityListFilterOptions_contactCompaniesLite[] | null;
  contactPersonsLite: getActivityListFilterOptions_contactPersonsLite[] | null;
}
