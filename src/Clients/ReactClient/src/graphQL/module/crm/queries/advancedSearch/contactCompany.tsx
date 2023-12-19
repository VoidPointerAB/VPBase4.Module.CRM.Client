import gql from 'graphql-tag';

export const CONTACT_COMPANY_SEARCH = gql`
    query contactCompanySearch(
        $searchTerms: [AdvancedFilterConditionFilter]!
        $sort: ContactCompanySortEnum
        $skip: Int
        $take: Int
    ) {
        contactCompanySearch(searchTerms: $searchTerms, sort: $sort, skip: $skip, take: $take) {
            activityCount
            contactCompanyId
            tags
            isUserFavorite
            name
            phone
            email
            addresses {
                addressId
                street
                city
                postCode
                addressType
                countryId
            }
            contactPersons {
                firstName
                lastName
                contactPersonId
            }
        }
    }
`;
