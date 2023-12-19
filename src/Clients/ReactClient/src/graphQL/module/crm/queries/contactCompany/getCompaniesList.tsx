import gql from 'graphql-tag';

export const GET_COMPANIES_LIST = gql`
  query getCompanyListData($take: Int, $onlyShowFavorites: Boolean) {
    contactCompanyList(take: $take, onlyShowFavorites: $onlyShowFavorites) {
      activityCount
      contactCompanyId
      tags
      isUserFavorite
      name
      phone
      email
      contactPersons {
        firstName
        lastName
        contactPersonId
      }
    }
  }
`;
