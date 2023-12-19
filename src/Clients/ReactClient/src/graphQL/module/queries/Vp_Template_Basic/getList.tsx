import gql from 'graphql-tag';

export const GET_VP_TEMPLATE_BASIC_LIST = gql`
    query getVp_Template_Basics {
        vp_Template_Basics {
            vP_Template_BasicId
            title
        }
    }
`;
