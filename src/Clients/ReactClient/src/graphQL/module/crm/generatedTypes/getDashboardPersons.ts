/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDashboardPersons
// ====================================================

export interface getDashboardPersons_dashboardContactPersons {
  __typename: "DashboardContactPersonType";
  /**
   * The id of the person.
   */
  contactPersonId: string;
  /**
   * The name of the person.
   */
  contactPersonName: string;
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  /**
   * The name of the company.
   */
  contactCompanyName: string;
  /**
   * If the company is marked as a favorite by the user.
   */
  isUserFavorite: boolean;
}

export interface getDashboardPersons {
  dashboardContactPersons: getDashboardPersons_dashboardContactPersons[] | null;
}

export interface getDashboardPersonsVariables {
  filterOnOwn?: boolean | null;
}
