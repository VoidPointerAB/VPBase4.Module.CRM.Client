/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchEnumType } from "./globalTypes";

// ====================================================
// GraphQL query operation: search
// ====================================================

export interface search_search {
  __typename: "SearchType";
  /**
   * The id of the search result.
   */
  entityId: string;
  /**
   * The name of the search result.
   */
  entityName: string;
  entityType: SearchEnumType | null;
}

export interface search {
  search: (search_search | null)[] | null;
}

export interface searchVariables {
  text: string;
  limit: number;
}
