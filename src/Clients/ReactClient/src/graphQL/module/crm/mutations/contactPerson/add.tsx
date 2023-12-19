import gql from 'graphql-tag';

export const ADD_CONTACT_PERSON = gql`
    mutation addContactPerson(
        $contactPersonId: String!
        $firstName: String!
        $isUserFavorite: Boolean
        $lastName: String!
        $contactCompanyId: String
        $email: String
        $otherEmail: String
        $website: String
        $mainPhone: String
        $workPhone: String
        $skype: String
        $description: String
        $tags: [String]
        $title: String
        $addresses: [AddressAddInput]
        $birthday: Date
        $usingCompanyPostAddress: Boolean
        $usingCompanyVisitAddress: Boolean
        $customFieldValues: [CustomFieldValueAddInput]
    ) {
        addContactPerson(
            input: {
                contactPersonId: $contactPersonId
                firstName: $firstName
                isUserFavorite: $isUserFavorite
                contactCompanyId: $contactCompanyId
                lastName: $lastName
                email: $email
                otherEmail: $otherEmail
                website: $website
                mainPhone: $mainPhone
                workPhone: $workPhone
                skype: $skype
                description: $description
                tags: $tags
                title: $title
                addresses: $addresses
                birthday: $birthday
                usingCompanyPostAddress: $usingCompanyPostAddress
                usingCompanyVisitAddress: $usingCompanyVisitAddress
                customFieldValues: $customFieldValues
            }
        )
    }
`;
