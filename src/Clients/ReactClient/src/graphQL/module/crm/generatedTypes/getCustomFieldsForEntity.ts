/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CustomFieldDataTypeEnum, CustomFieldTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCustomFieldsForEntity
// ====================================================

export interface getCustomFieldsForEntity_customFields {
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

export interface getCustomFieldsForEntity {
  customFields: getCustomFieldsForEntity_customFields[] | null;
}

export interface getCustomFieldsForEntityVariables {
  customFieldEntityId: string;
}
