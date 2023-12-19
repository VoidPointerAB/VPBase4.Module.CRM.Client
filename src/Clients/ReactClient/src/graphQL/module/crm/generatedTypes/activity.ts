/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ActivityEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: activity
// ====================================================

export interface activity_activity_contactCompanies {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface activity_activity_contactPersons {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface activity_activity_companyOptions_contactPersons {
  __typename: "ActivityCompanyOptionPersonType";
  /**
   * Person id.
   */
  contactPersonId: string | null;
}

export interface activity_activity_companyOptions {
  __typename: "ActivityCompanyOptionType";
  /**
   * Company id.
   */
  contactCompanyId: string;
  /**
   * Company name.
   */
  name: string;
  contactPersons: activity_activity_companyOptions_contactPersons[] | null;
}

export interface activity_activity_personOptions_contactCompany {
  __typename: "ActivityPersonOptionCompanyType";
  /**
   * Company id.
   */
  contactCompanyId: string | null;
}

export interface activity_activity_personOptions {
  __typename: "ActivityPersonOptionType";
  /**
   * Person id.
   */
  contactPersonId: string;
  /**
   * Person first name.
   */
  firstName: string;
  /**
   * Person last name.
   */
  lastName: string | null;
  contactCompany: activity_activity_personOptions_contactCompany | null;
}

export interface activity_activity {
  __typename: "ActivityType";
  /**
   * The description of the activity.
   */
  description: string | null;
  /**
   * The date of the activity.
   */
  date: any | null;
  type: ActivityEnum;
  time: string | null;
  /**
   * The id of the activity.
   */
  activityId: string;
  contactCompanies: activity_activity_contactCompanies[] | null;
  contactPersons: activity_activity_contactPersons[] | null;
  companyOptions: activity_activity_companyOptions[] | null;
  personOptions: activity_activity_personOptions[] | null;
}

export interface activity {
  activity: activity_activity | null;
}

export interface activityVariables {
  id: string;
}
