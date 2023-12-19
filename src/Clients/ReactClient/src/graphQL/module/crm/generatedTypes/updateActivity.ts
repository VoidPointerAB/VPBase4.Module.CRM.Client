/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ActivityEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateActivity
// ====================================================

export interface updateActivity {
  updateActivity: boolean | null;
}

export interface updateActivityVariables {
  id: string;
  description: string;
  date?: any | null;
  contactPersonIds?: (string | null)[] | null;
  contactCompanyIds?: (string | null)[] | null;
  type: ActivityEnum;
  time?: string | null;
}
