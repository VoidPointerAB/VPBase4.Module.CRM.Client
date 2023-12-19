/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressEnum, CustomFieldDataTypeEnum, CustomFieldTypeEnum, FieldValueTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: contactPersonCompare
// ====================================================

export interface contactPersonCompare_left_addresses {
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

export interface contactPersonCompare_left_contactCompany_addresses {
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

export interface contactPersonCompare_left_contactCompany {
  __typename: "ContactCompanyType";
  /**
   * The name of the company.
   */
  name: string;
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  addresses: contactPersonCompare_left_contactCompany_addresses[] | null;
}

export interface contactPersonCompare_left_customFieldsWithValue {
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

export interface contactPersonCompare_left {
  __typename: "ContactPersonType";
  /**
   * The id of the person.
   */
  contactPersonId: string;
  isUserFavorite: boolean | null;
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
  addresses: contactPersonCompare_left_addresses[] | null;
  contactCompany: contactPersonCompare_left_contactCompany | null;
  customFieldsWithValue: contactPersonCompare_left_customFieldsWithValue[] | null;
}

export interface contactPersonCompare_right_addresses {
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

export interface contactPersonCompare_right_contactCompany_addresses {
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

export interface contactPersonCompare_right_contactCompany {
  __typename: "ContactCompanyType";
  /**
   * The name of the company.
   */
  name: string;
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  addresses: contactPersonCompare_right_contactCompany_addresses[] | null;
}

export interface contactPersonCompare_right_customFieldsWithValue {
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

export interface contactPersonCompare_right {
  __typename: "ContactPersonType";
  /**
   * The id of the person.
   */
  contactPersonId: string;
  isUserFavorite: boolean | null;
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
  addresses: contactPersonCompare_right_addresses[] | null;
  contactCompany: contactPersonCompare_right_contactCompany | null;
  customFieldsWithValue: contactPersonCompare_right_customFieldsWithValue[] | null;
}

export interface contactPersonCompare_countries {
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

export interface contactPersonCompare_fieldValues {
  __typename: "FieldValueType";
  /**
   * The text of the field value.
   */
  text: string;
  type: FieldValueTypeEnum | null;
}

export interface contactPersonCompare {
  left: contactPersonCompare_left | null;
  right: contactPersonCompare_right | null;
  countries: contactPersonCompare_countries[] | null;
  fieldValues: contactPersonCompare_fieldValues[] | null;
}

export interface contactPersonCompareVariables {
  id: string;
  id2: string;
}
