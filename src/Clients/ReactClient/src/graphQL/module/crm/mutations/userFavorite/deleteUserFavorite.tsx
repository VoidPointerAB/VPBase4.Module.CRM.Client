import gql from 'graphql-tag';

export const DELETE_USER_FAVORITE = gql`
mutation deleteUserFavorite($id: String!, $entityType: UserFavoriteEntityTypeEnum!) {
  deleteUserFavorite(input: {entityId: $id, entityType: $entityType})
  }
  `;