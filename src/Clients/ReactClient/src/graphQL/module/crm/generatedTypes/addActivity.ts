/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ActivityEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addActivity
// ====================================================

export interface addActivity {
  addActivity: boolean | null;
}

export interface addActivityVariables {
  activityId: string;
  description: string;
  date?: any | null;
  time?: string | null;
  contactPersonIds?: (string | null)[] | null;
  contactCompanyIds?: (string | null)[] | null;
  type: ActivityEnum;
}
