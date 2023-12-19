/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ActivityEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: getDashboardActivities
// ====================================================

export interface getDashboardActivities_dashboardActivities_contactCompanies {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface getDashboardActivities_dashboardActivities_contactPersons {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface getDashboardActivities_dashboardActivities {
  __typename: "DashboardActivityListType";
  /**
   * The id of the activity.
   */
  activityId: string;
  type: ActivityEnum;
  /**
   * The description of the activity.
   */
  description: string | null;
  /**
   * The date of the activity.
   */
  date: any | null;
  /**
   * The time of the activity
   */
  time: string | null;
  contactCompanies: getDashboardActivities_dashboardActivities_contactCompanies[] | null;
  contactPersons: getDashboardActivities_dashboardActivities_contactPersons[] | null;
}

export interface getDashboardActivities {
  dashboardActivities: getDashboardActivities_dashboardActivities[] | null;
}

export interface getDashboardActivitiesVariables {
  filterOnOwn?: boolean | null;
  referenceDateTime?: any | null;
  showUpcoming?: boolean | null;
}
