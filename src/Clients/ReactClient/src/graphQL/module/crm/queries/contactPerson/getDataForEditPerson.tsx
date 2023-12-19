import gql from 'graphql-tag';
import { countriesFragment, fieldValueFragment, personFragment } from '../../fragments/fragments';

export const GET_DATA_FOR_PERSON_EDIT = gql`
query contactPerson($id: String!) {
    contactPerson(id: $id) {
        contactPersonId
        isUserFavorite
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

    fieldValues {
        ...FieldValueData
    }

    countries (sort: NAME_ASC){
        ...CountriesData
    }

    contactCompanies(take: 100000, sort: ALPHABETICAL_ASC) {
        contactCompanyId
        name
    }
}
${personFragment}
${fieldValueFragment}
${countriesFragment}
`;
