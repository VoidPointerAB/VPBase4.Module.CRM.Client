/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CustomFieldDataTypeEnum, CustomFieldTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: vp_Template_Basic
// ====================================================

export interface vp_Template_Basic_vp_Template_Basic_customFieldsWithValue {
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

export interface vp_Template_Basic_vp_Template_Basic {
  __typename: "VP_Template_BasicType";
  /**
   * The title of the VP_Template_Basic.
   */
  title: string;
  customFieldsWithValue: vp_Template_Basic_vp_Template_Basic_customFieldsWithValue[] | null;
}

export interface vp_Template_Basic {
  vp_Template_Basic: vp_Template_Basic_vp_Template_Basic | null;
}

export interface vp_Template_BasicVariables {
  id: string;
}
