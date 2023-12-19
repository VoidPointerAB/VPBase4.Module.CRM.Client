/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDashboardCompanies
// ====================================================

export interface getDashboardCompanies_dashboardContactCompanies {
  __typename: "DashboardContactCompanyType";
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  /**
   * The name of the company.
   */
  name: string;
  /**
   * If the company is marked as a favorite by the user.
   */
  isUserFavorite: boolean;
}

export interface getDashboardCompanies {
  dashboardContactCompanies: getDashboardCompanies_dashboardContactCompanies[] | null;
}

export interface getDashboardCompaniesVariables {
  filterOnOwn?: boolean | null;
}
