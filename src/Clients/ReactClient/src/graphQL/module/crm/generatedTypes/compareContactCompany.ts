/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ContactCompanyUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: compareContactCompany
// ====================================================

export interface compareContactCompany {
  compareContactCompany: boolean | null;
}

export interface compareContactCompanyVariables {
  updateCompany: ContactCompanyUpdateInput;
  transferPersons?: boolean | null;
  transferActivities?: boolean | null;
  merge?: boolean | null;
  fromContactCompanyId?: string | null;
}
