import gql from 'graphql-tag';

export const UPDATE_CONTACTCOMPANY = gql`
    mutation updateContactCompany(
        $isUserFavorite: Boolean
        $id: String!
        $name: String!
        $phone: String
        $email: String
        $website: String
        $note: String
        $addresses: [AddressUpdateInput]
        $tags: [String]
        $segment: [String]
        $organizationNumber: String
        $customFieldValues: [CustomFieldValueAddInput]
    ) {
        updateContactCompany(
            input: {
                isUserFavorite: $isUserFavorite
                contactCompanyId: $id
                name: $name
                phone: $phone
                email: $email
                website: $website
                note: $note
                addresses: $addresses
                segment: $segment
                tags: $tags
                organizationNumber: $organizationNumber
                customFieldValues: $customFieldValues
            }
        )
    }
`;
