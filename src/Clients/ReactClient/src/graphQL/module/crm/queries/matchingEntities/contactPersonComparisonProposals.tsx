import gql from 'graphql-tag';

export const GET_PERSON_COMPARISON_LIST = gql`
    query getPersonsComparisonProposals {
        contactPersonComparisonProposals {
            comparisonState
            contactPersonOneId
            contactPersonOneName
            contactPersonTwoId
            contactPersonTwoName
            percentage
        }
    }
`;

export const GET_NUMBER_OF_PERSON_COMPARISONS = gql`
    query numberOfContactPersonComparisonProposals {
        numberOfContactPersonComparisonProposals
    }
`;
