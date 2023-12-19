import gql from 'graphql-tag';

export const GET_DASHBOARD_COMPANIES  = gql` 
    query getDashboardCompanies($filterOnOwn: Boolean) {
        dashboardContactCompanies(filterOnOwn: $filterOnOwn) {
            contactCompanyId
            name
            isUserFavorite
        }
}
`
