/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { FieldValueTypeEnum, CustomFieldDataTypeEnum, CustomFieldTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCountriesAndFieldValues
// ====================================================

export interface getCountriesAndFieldValues_countries {
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

export interface getCountriesAndFieldValues_fieldValues {
  __typename: "FieldValueType";
  /**
   * The text of the field value.
   */
  text: string;
  type: FieldValueTypeEnum | null;
}

export interface getCountriesAndFieldValues_customFields {
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

export interface getCountriesAndFieldValues {
  countries: getCountriesAndFieldValues_countries[] | null;
  fieldValues: getCountriesAndFieldValues_fieldValues[] | null;
  customFields: getCountriesAndFieldValues_customFields[] | null;
}

export interface getCountriesAndFieldValuesVariables {
  customFieldEntityId: string;
}
