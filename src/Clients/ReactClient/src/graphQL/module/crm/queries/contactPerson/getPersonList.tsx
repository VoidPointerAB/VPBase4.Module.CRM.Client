import gql from 'graphql-tag';

export const GET_PERSON_LIST = gql`
    query getContactPersonList($take: Int, $onlyShowFavorites: Boolean) {
        contactPersonList(take: $take, onlyShowFavorites: $onlyShowFavorites) {
            activityCount
            contactPersonId
            isUserFavorite
            tags
            title
            firstName
            lastName
            skype
            email
            mainPhone
            website
            createdUtc
            contactCompany {
                name
                contactCompanyId
            }
        }
    }
`;
