import gql from 'graphql-tag';


export const GET_COMPANIES_PERSONS_LIST = gql`
query getContactCompaniesAndPersons {
    contactCompaniesLite(take: 100000, sort: ALPHABETICAL_ASC) {
        contactCompanyId
        name
        contactPersons{
            contactPersonId
        }
    }
    contactPersonsLite(take: 100000, sort: ALPHABETICAL_ASC) {
        contactPersonId
        lastName
        firstName
        contactCompany {
            contactCompanyId
        }
    }
}
`;
