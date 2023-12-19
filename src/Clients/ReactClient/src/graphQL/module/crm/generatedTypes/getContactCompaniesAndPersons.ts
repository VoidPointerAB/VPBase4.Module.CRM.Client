/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getContactCompaniesAndPersons
// ====================================================

export interface getContactCompaniesAndPersons_contactCompaniesLite_contactPersons {
  __typename: "ContactPersonInnerLiteListType";
  /**
   * The id of the person.
   */
  contactPersonId: string;
}

export interface getContactCompaniesAndPersons_contactCompaniesLite {
  __typename: "ContactCompanyLiteListType";
  /**
   * The id of the company.
   */
  contactCompanyId: string;
  /**
   * The name of the company.
   */
  name: string;
  contactPersons: getContactCompaniesAndPersons_contactCompaniesLite_contactPersons[] | null;
}

export interface getContactCompaniesAndPersons_contactPersonsLite_contactCompany {
  __typename: "ContactCompanyInnerLiteListType";
  /**
   * The id of the company.
   */
  contactCompanyId: string;
}

export interface getContactCompaniesAndPersons_contactPersonsLite {
  __typename: "ContactPersonLiteListType";
  /**
   * The id of the person.
   */
  contactPersonId: string;
  /**
   * The last name of the person.
   */
  lastName: string | null;
  /**
   * The first name of the person.
   */
  firstName: string;
  contactCompany: getContactCompaniesAndPersons_contactPersonsLite_contactCompany | null;
}

export interface getContactCompaniesAndPersons {
  contactCompaniesLite: getContactCompaniesAndPersons_contactCompaniesLite[] | null;
  contactPersonsLite: getContactCompaniesAndPersons_contactPersonsLite[] | null;
}
