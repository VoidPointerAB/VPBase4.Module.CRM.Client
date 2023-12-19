import gql from 'graphql-tag';

export const GET_DASHBOARD_ACTIVITIES = gql`
    query getDashboardActivities($filterOnOwn: Boolean, $referenceDateTime: DateTime, $showUpcoming: Boolean) {
        dashboardActivities(
            filterOnOwn: $filterOnOwn
            referenceDateTime: $referenceDateTime
            showUpcoming: $showUpcoming
        ) {
            activityId
            type
            description
            date
            time
            contactCompanies {
                id
                name
            }
            contactPersons {
                id
                name
            }
        }
    }
`;
