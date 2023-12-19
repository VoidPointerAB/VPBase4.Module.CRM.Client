import gql from 'graphql-tag';

export const UPDATE_VP_TEMPLATE_BASIC = gql`
    mutation updateVp_Template_Basic(
        $vP_Template_BasicId: String!
        $title: String!
        $values: [CustomFieldValueAddInput]
    ) {
        updateVP_Template_Basic(
            input: {
                vP_Template_BasicId: $vP_Template_BasicId
                title: $title
                customFieldValues: $values
            }
        )
    }
`;
