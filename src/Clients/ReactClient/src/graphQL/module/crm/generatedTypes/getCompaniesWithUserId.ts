/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCompaniesWithUserId
// ====================================================

export interface getCompaniesWithUserId_filteredUserId {
  __typename: "ContactCompanyListType";
  /**
   * The name of the company.
   */
  name: string;
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  isUserFavorite: boolean;
  /**
   * The id of the user that created the company.
   */
  createdByUserId: string;
}

export interface getCompaniesWithUserId_contactCompanies {
  __typename: "ContactCompanyListType";
  /**
   * The name of the company.
   */
  name: string;
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  isUserFavorite: boolean;
  /**
   * The id of the user that created the company.
   */
  createdByUserId: string;
}

export interface getCompaniesWithUserId {
  filteredUserId: getCompaniesWithUserId_filteredUserId[] | null;
  contactCompanies: getCompaniesWithUserId_contactCompanies[] | null;
}

export interface getCompaniesWithUserIdVariables {
  createdByUserId?: string | null;
}
