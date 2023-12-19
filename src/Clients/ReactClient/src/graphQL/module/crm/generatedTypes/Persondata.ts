/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressEnum } from "./globalTypes";

// ====================================================
// GraphQL fragment: Persondata
// ====================================================

export interface Persondata_addresses {
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
  countryName: string;
}

export interface Persondata_contactCompany_addresses {
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

export interface Persondata_contactCompany {
  __typename: "ContactCompanyType";
  /**
   * The name of the company.
   */
  name: string;
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  addresses: Persondata_contactCompany_addresses[] | null;
}

export interface Persondata {
  __typename: "ContactPersonType";
  /**
   * The first name of the person.
   */
  firstName: string;
  /**
   * The last name of the person.
   */
  lastName: string | null;
  /**
   * The id of the user that created the person.
   */
  createdByUserId: string;
  /**
   * The birthday of the person.
   */
  birthday: any | null;
  /**
   * The description of the person.
   */
  description: string | null;
  /**
   * The work phone for the person.
   */
  workPhone: string | null;
  /**
   * The main phone for the person.
   */
  mainPhone: string | null;
  /**
   * The email of the person.
   */
  email: string | null;
  /**
   * The other email of the person.
   */
  otherEmail: string | null;
  /**
   * The skype address of the person.
   */
  skype: string | null;
  tags: string[] | null;
  /**
   * The title of the person.
   */
  title: string | null;
  /**
   * The website for the person.
   */
  website: string | null;
  createdUtc: any;
  /**
   * The count of activities for this person.
   */
  activityCount: number;
  /**
   * If the person is using company post address.
   */
  usingCompanyPostAddress: boolean;
  /**
   * If the person is using company visit address.
   */
  usingCompanyVisitAddress: boolean;
  addresses: Persondata_addresses[] | null;
  contactCompany: Persondata_contactCompany | null;
}
