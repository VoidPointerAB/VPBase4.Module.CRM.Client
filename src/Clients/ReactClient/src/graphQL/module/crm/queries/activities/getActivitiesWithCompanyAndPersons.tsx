import gql from 'graphql-tag';

export const GET_ACTIVITIES_WITH_COMPANIES_PERSONS_LIST = gql`
    query getActivities(
        $contactCompanyId: String
        $contactPersonId: String
        $startDate: Date
        $endDate: Date
    ) {
        activities(
            take: 500
            sort: ACTIVITY_DATE_AND_TIME_DESC
            contactCompanyId: $contactCompanyId
            contactPersonId: $contactPersonId
            filter: { startDate: $startDate, endDate: $endDate }
        ) {
            activityId
            description
            date
            time
            type
            createdUtc
            createdByUserId
            contactPersons {
                id
                name
            }
            contactCompanies {
                id
                name
            }
        }
    }
`;
