import gql from 'graphql-tag';

export const ADD_VP_TEMPLATE_BASIC = gql`
    mutation addVP_Template_Basic(
        $vP_Template_BasicId: String!
        $title: String!
        $values: [CustomFieldValueAddInput]
    ) {
        addVP_Template_Basic(
            input: {
                vP_Template_BasicId: $vP_Template_BasicId
                title: $title
                customFieldValues: $values
            }
        )
    }
`;
