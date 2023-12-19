/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressAddInput, CustomFieldValueAddInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addContactCompany
// ====================================================

export interface addContactCompany {
  addContactCompany: boolean | null;
}

export interface addContactCompanyVariables {
  contactCompanyId: string;
  isUserFavorite?: boolean | null;
  name: string;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  note?: string | null;
  organizationNumber?: string | null;
  addresses?: (AddressAddInput | null)[] | null;
  segment?: (string | null)[] | null;
  tags?: (string | null)[] | null;
  customFieldValues?: (CustomFieldValueAddInput | null)[] | null;
}
