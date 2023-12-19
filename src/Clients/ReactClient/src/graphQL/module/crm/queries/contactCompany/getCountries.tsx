import gql from 'graphql-tag';

export const GET_COUNTRIES_FIELDVALUES_CUSTOMFIELDS = gql`
    query getCountriesAndFieldValues($customFieldEntityId: String!) {
        countries (sort: NAME_ASC){
            countryId
            name
        }

        fieldValues {
            text
            type
        }

        customFields(customFieldEntityId: $customFieldEntityId) {
            customFieldEntityId
            customFieldEntityName
            customFieldId
            dataType
            fieldType
            optionFieldsJson
            optionValuesJson
            tabName
            title
        }
    }
`;
