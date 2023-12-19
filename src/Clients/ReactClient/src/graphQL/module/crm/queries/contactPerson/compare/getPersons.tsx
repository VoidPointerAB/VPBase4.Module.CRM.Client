import gql from 'graphql-tag';

export const GET_CONTACTPERSONS_SHORT =  gql`
  query getPersonData {
    contactPersons(sort: ALPHABETICAL_ASC) {
      firstName
      lastName
      contactPersonId
    }
  }
`;
