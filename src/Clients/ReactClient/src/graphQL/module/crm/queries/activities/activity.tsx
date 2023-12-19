import gql from 'graphql-tag';


export const GET_ACTIVITY_COMPANIESLIST_PERSONSLIST = gql`
query activity($id: String!) {
        activity(id: $id) {
        description
        date
        type
        time
        activityId
        contactCompanies{
            id
            name
        }
        contactPersons{
            id
            name
        }
        companyOptions {
            contactCompanyId
            name
            contactPersons {
              contactPersonId
            }
        }
        personOptions {
          contactPersonId
          firstName
          lastName
          contactCompany {
            contactCompanyId
          }
        }
    }
}
`;
