/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ComparisonStateEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCompanyComparisonProposals
// ====================================================

export interface getCompanyComparisonProposals_contactCompanyComparisonProposals {
  __typename: "ContactCompanyComparisonProposalType";
  comparisonState: ComparisonStateEnum | null;
  contactCompanyOneId: string;
  contactCompanyOneName: string;
  contactCompanyTwoId: string;
  contactCompanyTwoName: string;
  percentage: number;
}

export interface getCompanyComparisonProposals {
  contactCompanyComparisonProposals: getCompanyComparisonProposals_contactCompanyComparisonProposals[] | null;
}
