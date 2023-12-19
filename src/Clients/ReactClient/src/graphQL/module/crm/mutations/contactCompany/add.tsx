import gql from 'graphql-tag';

export const ADD_CONTACTCOMPANY = gql`
    mutation addContactCompany(
        $contactCompanyId: String!
        $isUserFavorite: Boolean
        $name: String!
        $phone: String
        $email: String
        $website: String
        $note: String
        $organizationNumber: String
        $addresses: [AddressAddInput]
        $segment: [String]
        $tags: [String]
        $customFieldValues: [CustomFieldValueAddInput]
    ) {
        addContactCompany(
            input: {
                contactCompanyId: $contactCompanyId
                isUserFavorite: $isUserFavorite
                name: $name
                phone: $phone
                email: $email
                website: $website
                note: $note
                organizationNumber: $organizationNumber
                addresses: $addresses
                segment: $segment
                tags: $tags
                customFieldValues: $customFieldValues
            }
        )
    }
`;
