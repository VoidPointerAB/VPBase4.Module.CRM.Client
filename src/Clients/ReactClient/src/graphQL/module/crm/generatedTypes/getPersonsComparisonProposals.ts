/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ComparisonStateEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPersonsComparisonProposals
// ====================================================

export interface getPersonsComparisonProposals_contactPersonComparisonProposals {
  __typename: "ContactPersonComparisonProposalType";
  comparisonState: ComparisonStateEnum | null;
  contactPersonOneId: string;
  contactPersonOneName: string;
  contactPersonTwoId: string;
  contactPersonTwoName: string;
  percentage: number;
}

export interface getPersonsComparisonProposals {
  contactPersonComparisonProposals: getPersonsComparisonProposals_contactPersonComparisonProposals[] | null;
}
