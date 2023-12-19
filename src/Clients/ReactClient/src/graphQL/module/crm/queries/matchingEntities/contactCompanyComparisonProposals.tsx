import gql from 'graphql-tag';

export const GET_COMPANY_COMPARISON_LIST = gql`
    query getCompanyComparisonProposals {
        contactCompanyComparisonProposals {
            comparisonState
            contactCompanyOneId
            contactCompanyOneName
            contactCompanyTwoId
            contactCompanyTwoName
            percentage
        }
    }
`;

export const GET_NUMBER_OF_COMPANY_COMPARISONS = gql`
    query numberOfContactCompanyComparisonProposals {
        numberOfContactCompanyComparisonProposals
    }
`;
