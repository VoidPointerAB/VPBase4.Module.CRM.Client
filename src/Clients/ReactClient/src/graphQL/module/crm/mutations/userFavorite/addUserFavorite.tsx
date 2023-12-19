import gql from 'graphql-tag';

export const ADD_USER_FAVORITE = gql`
mutation addUserFavorite($id: String!, $entityType: UserFavoriteEntityTypeEnum! ) {
    addUserFavorite(input: {entityId: $id, entityType: $entityType}) {
      userId
    }
  }
  `;