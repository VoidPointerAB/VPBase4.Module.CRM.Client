/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: getContactPersons
// ====================================================

export interface getContactPersons_contactPersons_addresses {
  __typename: "AddressType";
  /**
   * The id of the address.
   */
  addressId: string;
  addressType: AddressEnum;
  /**
   * The street of the address.
   */
  street: string;
  /**
   * The post code of the address.
   */
  postCode: string;
  /**
   * The city of the address.
   */
  city: string;
  countryId: string;
  /**
   * The time the row was created in the database (universal time).
   */
  createdUtc: any;
  /**
   * The last time the row was modified in the database (universal time).
   */
  modifiedUtc: any | null;
}

export interface getContactPersons_contactPersons_contactCompany {
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

export interface getContactPersons_contactPersons {
  __typename: "ContactPersonListType";
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
  addresses: getContactPersons_contactPersons_addresses[] | null;
  contactCompany: getContactPersons_contactPersons_contactCompany | null;
}

export interface getContactPersons {
  contactPersons: getContactPersons_contactPersons[] | null;
}

export interface getContactPersonsVariables {
  take?: number | null;
  contactCompanyId?: string | null;
  onlyShowFavorites?: boolean | null;
}
