/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AdvancedFilterConditionFilter, ContactPersonSortEnum, AddressEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: contactPersonSearch
// ====================================================

export interface contactPersonSearch_contactPersonSearch_addresses {
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

export interface contactPersonSearch_contactPersonSearch_contactCompany {
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

export interface contactPersonSearch_contactPersonSearch {
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
  createdUtc: any;
  addresses: contactPersonSearch_contactPersonSearch_addresses[] | null;
  contactCompany: contactPersonSearch_contactPersonSearch_contactCompany | null;
}

export interface contactPersonSearch {
  contactPersonSearch: contactPersonSearch_contactPersonSearch[] | null;
}

export interface contactPersonSearchVariables {
  searchTerms: (AdvancedFilterConditionFilter | null)[];
  sort?: ContactPersonSortEnum | null;
  skip?: number | null;
  take?: number | null;
}
