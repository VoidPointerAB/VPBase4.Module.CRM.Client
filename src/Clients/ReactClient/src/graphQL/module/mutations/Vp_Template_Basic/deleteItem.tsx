import gql from 'graphql-tag';

export const DELETE_VP_TEMPLATE_BASIC = gql`
mutation deleteVP_Template_Basic($id: String!){
    deleteVP_Template_Basic(id: $id)
}
`;
