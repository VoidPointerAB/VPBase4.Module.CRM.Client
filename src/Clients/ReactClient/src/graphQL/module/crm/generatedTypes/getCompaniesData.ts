/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCompaniesData
// ====================================================

export interface getCompaniesData_contactCompanies_addresses {
  __typename: "AddressType";
  /**
   * The id of the address.
   */
  addressId: string;
  /**
   * The street of the address.
   */
  street: string;
  /**
   * The city of the address.
   */
  city: string;
  /**
   * The post code of the address.
   */
  postCode: string;
  addressType: AddressEnum;
  countryId: string;
}

export interface getCompaniesData_contactCompanies_contactPersons {
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

export interface getCompaniesData_contactCompanies {
  __typename: "ContactCompanyListType";
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
  addresses: getCompaniesData_contactCompanies_addresses[] | null;
  contactPersons: getCompaniesData_contactCompanies_contactPersons[] | null;
}

export interface getCompaniesData {
  contactCompanies: getCompaniesData_contactCompanies[] | null;
}

export interface getCompaniesDataVariables {
  take?: number | null;
  onlyShowFavorites?: boolean | null;
}
