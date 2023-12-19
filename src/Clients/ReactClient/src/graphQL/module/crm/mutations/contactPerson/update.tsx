import gql from 'graphql-tag';

export const UPDATE_CONTACT_PERSON = gql`
    mutation updateContactPerson(
        $id: String!
        $firstName: String!
        $lastName: String
        $mainPhone: String
        $workPhone: String
        $email: String
        $otherEmail: String
        $website: String
        $skype: String
        $birthday: Date
        $description: String
        $tags: [String]
        $title: String
        $usingCompanyPostAddress: Boolean
        $usingCompanyVisitAddress: Boolean
        $addresses: [AddressUpdateInput]
        $isUserFavorite: Boolean
        $contactCompanyId: String
        $customFieldValues: [CustomFieldValueAddInput]
    ) {
        updateContactPerson(
            input: {
                contactPersonId: $id
                firstName: $firstName
                lastName: $lastName
                mainPhone: $mainPhone
                workPhone: $workPhone
                email: $email
                otherEmail: $otherEmail
                website: $website
                skype: $skype
                birthday: $birthday
                description: $description
                tags: $tags
                title: $title
                usingCompanyPostAddress: $usingCompanyPostAddress
                usingCompanyVisitAddress: $usingCompanyVisitAddress
                addresses: $addresses
                isUserFavorite: $isUserFavorite
                contactCompanyId: $contactCompanyId
                customFieldValues: $customFieldValues
            }
        )
    }
`;
