/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CustomFieldValueAddInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addVP_Template_Basic
// ====================================================

export interface addVP_Template_Basic {
  addVP_Template_Basic: boolean | null;
}

export interface addVP_Template_BasicVariables {
  vP_Template_BasicId: string;
  title: string;
  values?: (CustomFieldValueAddInput | null)[] | null;
}
