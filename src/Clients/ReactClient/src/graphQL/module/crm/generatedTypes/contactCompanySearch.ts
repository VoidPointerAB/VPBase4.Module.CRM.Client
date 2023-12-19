/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AdvancedFilterConditionFilter, ContactCompanySortEnum, AddressEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: contactCompanySearch
// ====================================================

export interface contactCompanySearch_contactCompanySearch_addresses {
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

export interface contactCompanySearch_contactCompanySearch_contactPersons {
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

export interface contactCompanySearch_contactCompanySearch {
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
  addresses: contactCompanySearch_contactCompanySearch_addresses[] | null;
  contactPersons: contactCompanySearch_contactCompanySearch_contactPersons[] | null;
}

export interface contactCompanySearch {
  contactCompanySearch: contactCompanySearch_contactCompanySearch[] | null;
}

export interface contactCompanySearchVariables {
  searchTerms: (AdvancedFilterConditionFilter | null)[];
  sort?: ContactCompanySortEnum | null;
  skip?: number | null;
  take?: number | null;
}
