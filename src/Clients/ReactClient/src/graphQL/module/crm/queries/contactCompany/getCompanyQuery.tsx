import gql from 'graphql-tag';

export const GET_COMPANY_COUNTRIES_FIELDVALUES = gql`
    query getContactCompany($id: String!) {
        contactCompany(id: $id) {
            contactCompanyId
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
        countries (sort: NAME_ASC){
            countryId
            name
        }
        fieldValues {
            text
            type
        }
    }
`;