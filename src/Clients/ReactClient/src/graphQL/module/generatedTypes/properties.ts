/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ExportEntityEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: properties
// ====================================================

export interface properties_exportProperties {
  __typename: "ExportPropertyType";
  /**
   * The id of the export property.
   */
  id: string;
  /**
   * The title of the export property.
   */
  title: string;
  /**
   * If the property is selected.
   */
  selected: boolean;
}

export interface properties {
  exportProperties: properties_exportProperties[] | null;
}

export interface propertiesVariables {
  exportTemplateId?: string | null;
  entity: ExportEntityEnum;
}
