import gql from 'graphql-tag';

export const companyFragment = gql`
    fragment Companydata on ContactCompanyType {
        createdUtc
        createdByUserId
        contactCompanyId
        name
        email
        website
        phone
        segment
        tags
        addresses {
            addressId
            street
            city
            postCode
            addressType
            countryId
        }
        organizationNumber
    }
`;

export const personFragment = gql`
    fragment Persondata on ContactPersonType {
        firstName
        lastName
        createdByUserId
        birthday
        description
        workPhone
        mainPhone
        email
        otherEmail
        skype
        tags
        title
        website
        createdUtc
        activityCount
        usingCompanyPostAddress
        usingCompanyVisitAddress
        addresses {
            addressId
            addressType
            street
            postCode
            city
            countryId
            countryName
        }
        contactCompany {
            name
            contactCompanyId
            addresses {
                addressId
                street
                city
                postCode
                addressType
                countryId
            }
        }
    }
`;

export const fieldValueFragment = gql`
    fragment FieldValueData on FieldValueType {
        text
        type
    }
`;

export const countriesFragment = gql`
    fragment CountriesData on CountryType {
        countryId
        name
    }
`;
