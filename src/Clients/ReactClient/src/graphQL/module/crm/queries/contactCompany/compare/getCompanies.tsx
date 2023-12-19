import gql from 'graphql-tag';

export const GET_COMPANIES =  gql`
  query getCompanyData {
    contactCompanies(sort: ALPHABETICAL_ASC) {
      name
      contactCompanyId
    }
  }
`;
