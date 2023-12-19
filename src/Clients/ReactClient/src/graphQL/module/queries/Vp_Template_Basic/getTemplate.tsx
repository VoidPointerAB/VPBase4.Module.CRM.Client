import gql from 'graphql-tag';

export const GET_VP_TEMPLATE_BASIC = gql `
    query vp_Template_Basic($id: String!) {
        vp_Template_Basic(id: $id){
            title
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
    }
`