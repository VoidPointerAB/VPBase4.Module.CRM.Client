import gql from 'graphql-tag';
import { personFragment } from '../../../fragments/fragments';

export const GET_PERSON_COMPARE_LEFT_RIGHT = gql`
    query contactPersonCompare($id: String!, $id2: String!) {
        left: contactPerson(id: $id) {
            contactPersonId
            isUserFavorite
            ...Persondata
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
        right: contactPerson(id: $id2) {
            contactPersonId
            isUserFavorite
            ...Persondata
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
    ${personFragment}
`;