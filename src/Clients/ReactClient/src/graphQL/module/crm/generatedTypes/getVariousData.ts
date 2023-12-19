/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ActivityEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: getVariousData
// ====================================================

export interface getVariousData_contactPersons_contactCompany {
  __typename: "ContactCompanyInnerListType";
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  /**
   * The name of the company.
   */
  name: string;
}

export interface getVariousData_contactPersons {
  __typename: "ContactPersonListType";
  /**
   * The id of the person.
   */
  contactPersonId: string;
  contactCompany: getVariousData_contactPersons_contactCompany | null;
  /**
   * The first name of the person.
   */
  firstName: string;
  /**
   * The last name of the person.
   */
  lastName: string | null;
  isUserFavorite: boolean;
  createdUtc: any;
  /**
   * The id of the user that created the person.
   */
  createdByUserId: string;
}

export interface getVariousData_withUserId_contactCompany {
  __typename: "ContactCompanyInnerListType";
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  /**
   * The name of the company.
   */
  name: string;
}

export interface getVariousData_withUserId {
  __typename: "ContactPersonListType";
  /**
   * The id of the person.
   */
  contactPersonId: string;
  contactCompany: getVariousData_withUserId_contactCompany | null;
  /**
   * The first name of the person.
   */
  firstName: string;
  /**
   * The last name of the person.
   */
  lastName: string | null;
  isUserFavorite: boolean;
  createdUtc: any;
  /**
   * The id of the user that created the person.
   */
  createdByUserId: string;
}

export interface getVariousData_upcoming_contactPersons {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface getVariousData_upcoming_contactCompanies {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface getVariousData_upcoming {
  __typename: "ActivityListType";
  /**
   * The id of the activity.
   */
  activityId: string;
  /**
   * The id of the user that created the activity
   */
  createdByUserId: string;
  contactPersons: getVariousData_upcoming_contactPersons[] | null;
  contactCompanies: getVariousData_upcoming_contactCompanies[] | null;
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
}

export interface getVariousData_passed_contactPersons {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface getVariousData_passed_contactCompanies {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface getVariousData_passed {
  __typename: "ActivityListType";
  /**
   * The id of the activity.
   */
  activityId: string;
  /**
   * The id of the user that created the activity
   */
  createdByUserId: string;
  contactPersons: getVariousData_passed_contactPersons[] | null;
  contactCompanies: getVariousData_passed_contactCompanies[] | null;
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
}

export interface getVariousData_upcomingWithUserId_contactPersons {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface getVariousData_upcomingWithUserId_contactCompanies {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface getVariousData_upcomingWithUserId {
  __typename: "ActivityListType";
  /**
   * The id of the activity.
   */
  activityId: string;
  /**
   * The id of the user that created the activity
   */
  createdByUserId: string;
  contactPersons: getVariousData_upcomingWithUserId_contactPersons[] | null;
  contactCompanies: getVariousData_upcomingWithUserId_contactCompanies[] | null;
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
}

export interface getVariousData_passedWithUserId_contactPersons {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface getVariousData_passedWithUserId_contactCompanies {
  __typename: "ActivityContactType";
  id: string;
  name: string;
}

export interface getVariousData_passedWithUserId {
  __typename: "ActivityListType";
  /**
   * The id of the activity.
   */
  activityId: string;
  /**
   * The id of the user that created the activity
   */
  createdByUserId: string;
  contactPersons: getVariousData_passedWithUserId_contactPersons[] | null;
  contactCompanies: getVariousData_passedWithUserId_contactCompanies[] | null;
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
}

export interface getVariousData {
  contactPersons: getVariousData_contactPersons[] | null;
  withUserId: getVariousData_withUserId[] | null;
  upcoming: getVariousData_upcoming[] | null;
  passed: getVariousData_passed[] | null;
  upcomingWithUserId: getVariousData_upcomingWithUserId[] | null;
  passedWithUserId: getVariousData_passedWithUserId[] | null;
}

export interface getVariousDataVariables {
  date?: string | null;
  createdByUserId?: string | null;
}
