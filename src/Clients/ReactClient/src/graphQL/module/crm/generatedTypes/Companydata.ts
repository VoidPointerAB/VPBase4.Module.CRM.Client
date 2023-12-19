/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressEnum } from "./globalTypes";

// ====================================================
// GraphQL fragment: Companydata
// ====================================================

export interface Companydata_addresses {
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

export interface Companydata {
  __typename: "ContactCompanyType";
  createdUtc: any;
  /**
   * The id of the user that created the company.
   */
  createdByUserId: string;
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  /**
   * The name of the company.
   */
  name: string;
  /**
   * The email of the company.
   */
  email: string | null;
  /**
   * The email of the company.
   */
  website: string | null;
  /**
   * The phone number of the company.
   */
  phone: string | null;
  segment: string[] | null;
  tags: string[] | null;
  addresses: Companydata_addresses[] | null;
  /**
   * The organization number of the company.
   */
  organizationNumber: string | null;
}
