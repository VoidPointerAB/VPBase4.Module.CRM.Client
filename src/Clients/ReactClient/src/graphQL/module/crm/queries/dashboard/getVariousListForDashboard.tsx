import gql from 'graphql-tag';

export const GET_VARIOUS_LISTS_FOR_DASHBOARD = gql`
  query getVariousData($date: String, $createdByUserId: String) {    
    contactPersons(sort: CREATEDUTC_DESC take: 4) {
      contactPersonId
      contactCompany {
        contactCompanyId
        name
      }
      firstName
      lastName
      isUserFavorite
      createdUtc
      createdByUserId
    }

    withUserId: contactPersons(sort: CREATEDUTC_DESC take: 4, createdByUserId: $createdByUserId) {
      contactPersonId
      contactCompany {
        contactCompanyId
        name
      }
      firstName
      lastName
      isUserFavorite
      createdUtc
      createdByUserId
    }

    upcoming: activities(filter: {date: $date, filter: UPCOMING_ACTIVITIES} take: 4 sort:ACTIVITY_DATE_ASC) {
      activityId
      createdByUserId
      contactPersons {
        id
        name
      }
      contactCompanies {
        id
        name
      }
      description
      date
      time
      type
      createdUtc
    }

    passed: activities(filter: {date: $date, filter: PASSED_ACTIVITIES} take: 4 sort:ACTIVITY_DATE_DESC) {
      activityId
      createdByUserId
      contactPersons {
        id
        name
      }
      contactCompanies {
        id
        name
      }
      description
      date
      time
      type
      createdUtc
    }
    upcomingWithUserId: activities(filter: {date: $date, filter: UPCOMING_ACTIVITIES} take: 4 sort:ACTIVITY_DATE_ASC, createdByUserId: $createdByUserId) {
      activityId
      createdByUserId
      contactPersons {
        id
        name
      }
      contactCompanies {
        id
        name
      }
      description
      date
      time
      type
      createdUtc
    }

    passedWithUserId: activities(filter: {date: $date, filter: PASSED_ACTIVITIES} take: 4 sort:ACTIVITY_DATE_DESC, createdByUserId: $createdByUserId) {
      activityId
      createdByUserId
      contactPersons {
        id
        name
      }
      contactCompanies {
        id
        name
      }
      description
      date
      time
      type
      createdUtc
    }
  }
`;
