/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressEnum, CustomFieldDataTypeEnum, CustomFieldTypeEnum, FieldValueTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: getContactCompany
// ====================================================

export interface getContactCompany_contactCompany_addresses {
  __typename: "AddressType";
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
  /**
   * The id of the address.
   */
  addressId: string;
  countryId: string;
}

export interface getContactCompany_contactCompany_customFieldsWithValue {
  __typename: "CustomFieldWithValueType";
  /**
   * The id of the custom field entity.
   */
  customFieldEntityId: string;
  /**
   * The name of the custom field entity.
   */
  customFieldEntityName: string;
  /**
   * The id of the custom field.
   */
  customFieldId: string;
  dataType: CustomFieldDataTypeEnum | null;
  fieldType: CustomFieldTypeEnum | null;
  /**
   * The fields of a dropdown.
   */
  optionFieldsJson: string | null;
  /**
   * The values of a dropdown.
   */
  optionValuesJson: string | null;
  /**
   * The tab name of the custom field.
   */
  tabName: string;
  /**
   * The title of the custom field.
   */
  title: string;
  /**
   * The id of the custom field value.
   */
  customFieldValueId: string | null;
  stringValue: string | null;
  intValue: number | null;
  decimalValue: any | null;
  boolValue: boolean | null;
  timeSpanValue: string | null;
  dateTimeValue: string | null;
}

export interface getContactCompany_contactCompany {
  __typename: "ContactCompanyType";
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
   * The phone number of the company.
   */
  phone: string | null;
  /**
   * The email of the company.
   */
  website: string | null;
  /**
   * The id of the user that created the company.
   */
  createdByUserId: string;
  isUserFavorite: boolean | null;
  addresses: getContactCompany_contactCompany_addresses[] | null;
  /**
   * The note of the company.
   */
  note: string | null;
  segment: string[] | null;
  tags: string[] | null;
  /**
   * The organization number of the company.
   */
  organizationNumber: string | null;
  customFieldsWithValue: getContactCompany_contactCompany_customFieldsWithValue[] | null;
}

export interface getContactCompany_countries {
  __typename: "CountryType";
  /**
   * The id of the country
   */
  countryId: string;
  /**
   * The name of the country
   */
  name: string;
}

export interface getContactCompany_fieldValues {
  __typename: "FieldValueType";
  /**
   * The text of the field value.
   */
  text: string;
  type: FieldValueTypeEnum | null;
}

export interface getContactCompany {
  contactCompany: getContactCompany_contactCompany | null;
  countries: getContactCompany_countries[] | null;
  fieldValues: getContactCompany_fieldValues[] | null;
}

export interface getContactCompanyVariables {
  id: string;
}
