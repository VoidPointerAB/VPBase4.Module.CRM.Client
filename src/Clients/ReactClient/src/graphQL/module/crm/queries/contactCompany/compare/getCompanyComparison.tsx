import gql from 'graphql-tag';

export const GET_COMPANY_COMPARE_LEFT_RIGHT = gql`
    query contactCompany($id: String!, $id2: String!) {
        left: contactCompany(id: $id) {
            contactCompanyId
            activityCount
            name
            email
            phone
            website
            createdByUserId
            isUserFavorite
            addresses {
                street
                city
                postCode
                addressType
                addressId
                countryId
            }
            note
            segment
            tags
            organizationNumber
            contactPersons{
                contactPersonId
                firstName 
                lastName
            }
            customFieldsWithValue {
                customFieldEntityId
                customFieldEntityName
                customFieldId
                dataType
                fieldType
                optionFieldsJson
                optionValuesJson
                tabName,
                title,
                customFieldValueId
                stringValue
                intValue
                decimalValue
                boolValue
                timeSpanValue
                dateTimeValue                
            }
        }

        right: contactCompany(id: $id2) {
            contactCompanyId
            activityCount
            name
            email
            phone
            website
            createdByUserId
            isUserFavorite
            addresses {
                street
                city
                postCode
                addressType
                addressId
                countryId
            }
            note
            segment
            tags
            organizationNumber
            contactPersons{
                contactPersonId
                firstName 
                lastName
            }
            customFieldsWithValue {
                customFieldEntityId
                customFieldEntityName
                customFieldId
                dataType
                fieldType
                optionFieldsJson
                optionValuesJson
                tabName,
                title,
                customFieldValueId
                stringValue
                intValue
                decimalValue
                boolValue
                timeSpanValue
                dateTimeValue                
            }
        }

        countries{
            countryId
            name
        }

        fieldValues {
            text
            type
        }
    }
`;