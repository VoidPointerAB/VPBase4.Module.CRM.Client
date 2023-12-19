/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { FieldValueTypeEnum, CustomFieldDataTypeEnum, CustomFieldTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCompaniesCountriesFieldValuesCustomFields
// ====================================================

export interface getCompaniesCountriesFieldValuesCustomFields_contactCompanies {
  __typename: "ContactCompanyListType";
  /**
   * The name of the company.
   */
  name: string;
  /**
   * The id of the company.
   */
  contactCompanyId: string;
}

export interface getCompaniesCountriesFieldValuesCustomFields_countries {
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

export interface getCompaniesCountriesFieldValuesCustomFields_fieldValues {
  __typename: "FieldValueType";
  /**
   * The text of the field value.
   */
  text: string;
  type: FieldValueTypeEnum | null;
}

export interface getCompaniesCountriesFieldValuesCustomFields_customFields {
  __typename: "CustomFieldType";
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
}

export interface getCompaniesCountriesFieldValuesCustomFields {
  contactCompanies: getCompaniesCountriesFieldValuesCustomFields_contactCompanies[] | null;
  countries: getCompaniesCountriesFieldValuesCustomFields_countries[] | null;
  fieldValues: getCompaniesCountriesFieldValuesCustomFields_fieldValues[] | null;
  customFields: getCompaniesCountriesFieldValuesCustomFields_customFields[] | null;
}

export interface getCompaniesCountriesFieldValuesCustomFieldsVariables {
  customFieldEntityId: string;
}
