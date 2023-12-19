/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { FieldValueTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: getFieldValues
// ====================================================

export interface getFieldValues_fieldValues {
  __typename: "FieldValueType";
  /**
   * The text of the field value.
   */
  text: string;
  type: FieldValueTypeEnum | null;
}

export interface getFieldValues {
  fieldValues: (getFieldValues_fieldValues | null)[] | null;
}
