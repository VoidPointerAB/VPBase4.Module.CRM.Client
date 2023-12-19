/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ActivityEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: getActivities
// ====================================================

export interface getActivities_activities_contactPersons {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface getActivities_activities_contactCompanies {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface getActivities_activities {
  __typename: "ActivityListType";
  /**
   * The id of the activity.
   */
  activityId: string;
  /**
   * The description of the activity.
   */
  description: string | null;
  /**
   * The date of the activity.
   */
  date: any | null;
  time: string | null;
  type: ActivityEnum;
  createdUtc: any;
  /**
   * The id of the user that created the activity
   */
  createdByUserId: string;
  contactPersons: getActivities_activities_contactPersons[] | null;
  contactCompanies: getActivities_activities_contactCompanies[] | null;
}

export interface getActivities {
  activities: getActivities_activities[] | null;
}

export interface getActivitiesVariables {
  contactCompanyId?: string | null;
  contactPersonId?: string | null;
  startDate?: any | null;
  endDate?: any | null;
}
