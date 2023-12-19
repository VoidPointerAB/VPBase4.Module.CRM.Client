/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Custom field type type
 */
export enum CustomFieldDataTypeEnum {
  BOOL = "BOOL",
  DATE = "DATE",
  DATETIME = "DATETIME",
  DECIMAL = "DECIMAL",
  INT = "INT",
  STRING = "STRING",
  TIME = "TIME",
}

/**
 * Custom field type type
 */
export enum CustomFieldTypeEnum {
  CHECKBOX = "CHECKBOX",
  DROPDOWN = "DROPDOWN",
  EMAIL = "EMAIL",
  INPUT = "INPUT",
  MULTI_DROPDOWN = "MULTI_DROPDOWN",
  PHONE = "PHONE",
}

/**
 * Export entity enum
 */
export enum ExportEntityEnum {
  VP_Template_Basic = "VP_Template_Basic",
}

export interface CustomFieldValueAddInput {
  customFieldValueId: string;
  customFieldId: string;
  dataType: CustomFieldDataTypeEnum;
  stringValue?: string | null;
  decimalValue?: any | null;
  intValue?: number | null;
  boolValue?: boolean | null;
  dateTimeValue?: any | null;
  timeSpanValue?: string | null;
}

export interface ExportTemplateAddInput {
  exportTemplateId: string;
  name: string;
  entity: ExportEntityEnum;
  propertyIds: (string | null)[];
  userTemplate?: boolean | null;
}

export interface ExportTemplateUpdateInput {
  exportTemplateId: string;
  name: string;
  propertyIds: (string | null)[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
