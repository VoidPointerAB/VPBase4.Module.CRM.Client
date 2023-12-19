import gql from 'graphql-tag';

import { fieldValueFragment, countriesFragment } from '../../fragments/fragments';

export const DATA_FOR_NEW_PERSON = gql`
query getCompaniesCountriesFieldValuesCustomFields($customFieldEntityId: String!) {
    contactCompanies(take: 100000, sort: ALPHABETICAL_ASC) {
        name
        contactCompanyId
    }

    countries (sort: NAME_ASC){
        ...CountriesData
    }   

    fieldValues {
        ...FieldValueData
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
${fieldValueFragment}${countriesFragment}
`;
