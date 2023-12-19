/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCompanyListData
// ====================================================

export interface getCompanyListData_contactCompanyList_contactPersons {
  __typename: "ContactPersonInnerListType";
  /**
   * The first name of the person.
   */
  firstName: string;
  /**
   * The last name of the person.
   */
  lastName: string | null;
  /**
   * The id of the person.
   */
  contactPersonId: string;
}

export interface getCompanyListData_contactCompanyList {
  __typename: "ContactCompaniesForListType";
  /**
   * Count of how many activities are connected to the company.
   */
  activityCount: number;
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  /**
   * Contact company tag list.
   */
  tags: string[];
  isUserFavorite: boolean;
  /**
   * The name of the company.
   */
  name: string;
  /**
   * The phone number of the company.
   */
  phone: string | null;
  /**
   * The email of the company.
   */
  email: string | null;
  contactPersons: getCompanyListData_contactCompanyList_contactPersons[] | null;
}

export interface getCompanyListData {
  contactCompanyList: getCompanyListData_contactCompanyList[] | null;
}

export interface getCompanyListDataVariables {
  take?: number | null;
  onlyShowFavorites?: boolean | null;
}
