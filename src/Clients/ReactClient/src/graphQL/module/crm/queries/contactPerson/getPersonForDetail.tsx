import gql from 'graphql-tag';
import { personFragment } from '../../fragments/fragments';

export const GET_PERSON_FOR_DETAIL = gql`
query contactPersonDetail($id: String!) {
    contactPerson(id: $id) {
        contactPersonId
        isUserFavorite
        activities {
            activityId
            contactPersons {
                id
                name
            }
            contactCompanies {
                id
                name
            }
            description
            date
            time
            type
            createdUtc
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
        ...Persondata
    }
}
${personFragment}
`;
