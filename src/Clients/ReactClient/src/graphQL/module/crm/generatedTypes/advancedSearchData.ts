/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AdvancedFilterEntityEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: advancedSearchData
// ====================================================

export interface advancedSearchData_advancedFilterConditions {
  __typename: "AdvancedFilterConditionType";
  friendlyName: string | null;
  conditionKey: string | null;
  description: string | null;
  entity: AdvancedFilterEntityEnum | null;
}

export interface advancedSearchData_advancedFilterTemplates_filter {
  __typename: "AdvancedFilterTermType";
  term: string | null;
  has: boolean | null;
  entity: AdvancedFilterEntityEnum | null;
}

export interface advancedSearchData_advancedFilterTemplates {
  __typename: "AdvancedFilterTemplateType";
  advancedFilterTemplateId: string | null;
  name: string | null;
  filter: (advancedSearchData_advancedFilterTemplates_filter | null)[] | null;
}

export interface advancedSearchData {
  advancedFilterConditions: (advancedSearchData_advancedFilterConditions | null)[] | null;
  advancedFilterTemplates: (advancedSearchData_advancedFilterTemplates | null)[] | null;
}

export interface advancedSearchDataVariables {
  entityType: AdvancedFilterEntityEnum;
}
