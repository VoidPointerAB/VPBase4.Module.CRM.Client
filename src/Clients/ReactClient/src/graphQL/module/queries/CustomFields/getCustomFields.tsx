import gql from 'graphql-tag';

export const GET_CUSTOM_FIELDS = gql`
query getCustomFieldsForEntity($customFieldEntityId: String!){
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

