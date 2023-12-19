import gql from 'graphql-tag';

export const GET_DASHBOARD_PERSONS  = gql` 
    query getDashboardPersons($filterOnOwn: Boolean) {
        dashboardContactPersons(filterOnOwn: $filterOnOwn) {
            contactPersonId
            contactPersonName
            contactCompanyId
            contactCompanyName
            isUserFavorite
        }
}
`
