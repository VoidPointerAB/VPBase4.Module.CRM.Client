import gql from 'graphql-tag';

export const DISMISS_MATCH_CONTACT_COMPANY = gql`
    mutation contactCompanyDismissComparison($leftCompanyId: String!, $rightCompanyId: String!) {
        contactCompanyDismissComparison(
            leftCompanyId: $leftCompanyId
            rightCompanyId: $rightCompanyId
        )
    }
`;
