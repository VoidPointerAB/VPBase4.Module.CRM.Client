/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPersonData
// ====================================================

export interface getPersonData_contactPersons {
  __typename: "ContactPersonListType";
  /**
   * The first name of the person.
   */
  firstName: string;
  /**
   * The last name of the person.
   */
  lastName: string | null;
  /**
   * The id of the person.
   */
  contactPersonId: string;
}

export interface getPersonData {
  contactPersons: getPersonData_contactPersons[] | null;
}
