/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ContactPersonUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: compareContactPerson
// ====================================================

export interface compareContactPerson {
  compareContactPerson: boolean | null;
}

export interface compareContactPersonVariables {
  updatePerson: ContactPersonUpdateInput;
  transferActivities?: boolean | null;
  merge?: boolean | null;
  fromContactPersonId?: string | null;
}
