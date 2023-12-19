/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ExportEntityEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: exportTemplates
// ====================================================

export interface exportTemplates_exportTemplates {
  __typename: "ExportTemplateType";
  exportTemplateId: string | null;
  name: string | null;
  userTemplate: boolean | null;
}

export interface exportTemplates {
  exportTemplates: (exportTemplates_exportTemplates | null)[] | null;
}

export interface exportTemplatesVariables {
  entity: ExportEntityEnum;
}
