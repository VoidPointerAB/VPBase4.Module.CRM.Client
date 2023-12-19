import gql from 'graphql-tag';

export const CONTACT_PERSON_SEARCH = gql`
    query contactPersonSearch(
        $searchTerms: [AdvancedFilterConditionFilter]!
        $sort: ContactPersonSortEnum
        $skip: Int
        $take: Int
    ) {
        contactPersonSearch(searchTerms: $searchTerms, sort: $sort, skip: $skip, take: $take) {
            activityCount
            contactPersonId
            isUserFavorite
            tags
            title
            firstName
            lastName
            createdUtc
            addresses {
                addressId
                addressType
                street
                postCode
                city
                countryId
                createdUtc
                modifiedUtc
            }
            contactCompany {
                name
                contactCompanyId
            }
        }
    }
`;
