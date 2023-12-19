/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressEnum, CustomFieldDataTypeEnum, CustomFieldTypeEnum, ActivityEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: getContactCompanyDetails
// ====================================================

export interface getContactCompanyDetails_contactCompany_addresses {
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
  countryName: string;
}

export interface getContactCompanyDetails_contactCompany_contactPersons {
  __typename: "ContactPersonType";
  /**
   * The id of the person.
   */
  contactPersonId: string;
  /**
   * The first name of the person.
   */
  firstName: string;
  /**
   * The last name of the person.
   */
  lastName: string | null;
}

export interface getContactCompanyDetails_contactCompany_customFieldsWithValue {
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

export interface getContactCompanyDetails_contactCompany_activities_contactPersons {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface getContactCompanyDetails_contactCompany_activities_contactCompanies {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface getContactCompanyDetails_contactCompany_activities {
  __typename: "ActivityType";
  /**
   * The id of the activity.
   */
  activityId: string;
  contactPersons: getContactCompanyDetails_contactCompany_activities_contactPersons[] | null;
  contactCompanies: getContactCompanyDetails_contactCompany_activities_contactCompanies[] | null;
  /**
   * The description of the activity.
   */
  description: string | null;
  /**
   * The date of the activity.
   */
  date: any | null;
  time: string | null;
  type: ActivityEnum;
  createdUtc: any;
}

export interface getContactCompanyDetails_contactCompany {
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
  addresses: getContactCompanyDetails_contactCompany_addresses[] | null;
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
  contactPersons: getContactCompanyDetails_contactCompany_contactPersons[] | null;
  customFieldsWithValue: getContactCompanyDetails_contactCompany_customFieldsWithValue[] | null;
  activities: getContactCompanyDetails_contactCompany_activities[] | null;
}

export interface getContactCompanyDetails {
  contactCompany: getContactCompanyDetails_contactCompany | null;
}

export interface getContactCompanyDetailsVariables {
  id: string;
}
