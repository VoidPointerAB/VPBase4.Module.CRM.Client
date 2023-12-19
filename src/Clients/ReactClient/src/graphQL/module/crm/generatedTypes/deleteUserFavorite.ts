/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserFavoriteEntityTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteUserFavorite
// ====================================================

export interface deleteUserFavorite {
  deleteUserFavorite: boolean | null;
}

export interface deleteUserFavoriteVariables {
  id: string;
  entityType: UserFavoriteEntityTypeEnum;
}
