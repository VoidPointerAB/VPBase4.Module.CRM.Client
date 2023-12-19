/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressUpdateInput, CustomFieldValueAddInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateContactCompany
// ====================================================

export interface updateContactCompany {
  updateContactCompany: boolean | null;
}

export interface updateContactCompanyVariables {
  isUserFavorite?: boolean | null;
  id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  note?: string | null;
  addresses?: (AddressUpdateInput | null)[] | null;
  tags?: (string | null)[] | null;
  segment?: (string | null)[] | null;
  organizationNumber?: string | null;
  customFieldValues?: (CustomFieldValueAddInput | null)[] | null;
}
