/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserFavoriteEntityTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addUserFavorite
// ====================================================

export interface addUserFavorite_addUserFavorite {
  __typename: "UserFavoriteType";
  /**
   * The user id.
   */
  userId: string;
}

export interface addUserFavorite {
  addUserFavorite: addUserFavorite_addUserFavorite | null;
}

export interface addUserFavoriteVariables {
  id: string;
  entityType: UserFavoriteEntityTypeEnum;
}
