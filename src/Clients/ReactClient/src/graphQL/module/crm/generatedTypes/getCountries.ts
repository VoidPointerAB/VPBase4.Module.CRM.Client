/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCountries
// ====================================================

export interface getCountries_countries {
  __typename: "CountryType";
  /**
   * The code of the country
   */
  code: string;
  /**
   * The id of the country
   */
  countryId: string;
  /**
   * The time the row was created in the database (universal time).
   */
  createdUtc: any;
  /**
   * The culture of the country
   */
  culture: string;
  /**
   * The name of the country
   */
  name: string;
}

export interface getCountries {
  countries: (getCountries_countries | null)[] | null;
}
