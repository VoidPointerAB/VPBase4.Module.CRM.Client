/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getContactPersonList
// ====================================================

export interface getContactPersonList_contactPersonList_contactCompany {
  __typename: "ContactCompanyInnerListType";
  /**
   * The name of the company.
   */
  name: string;
  /**
   * The id of the company.
   */
  contactCompanyId: string;
}

export interface getContactPersonList_contactPersonList {
  __typename: "ContactPersonsForListType";
  /**
   * The count of activities for this person.
   */
  activityCount: number;
  /**
   * The id of the person.
   */
  contactPersonId: string;
  isUserFavorite: boolean;
  /**
   * Contact person tag list.
   */
  tags: string[];
  /**
   * The title of the person.
   */
  title: string | null;
  /**
   * The first name of the person.
   */
  firstName: string;
  /**
   * The last name of the person.
   */
  lastName: string | null;
  /**
   * The skype address of the person.
   */
  skype: string | null;
  /**
   * The email of the person.
   */
  email: string | null;
  /**
   * The main phone for the person.
   */
  mainPhone: string | null;
  /**
   * The website for the person.
   */
  website: string | null;
  createdUtc: any;
  contactCompany: getContactPersonList_contactPersonList_contactCompany | null;
}

export interface getContactPersonList {
  contactPersonList: getContactPersonList_contactPersonList[] | null;
}

export interface getContactPersonListVariables {
  take?: number | null;
  onlyShowFavorites?: boolean | null;
}
