/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressUpdateInput, CustomFieldValueAddInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateContactPerson
// ====================================================

export interface updateContactPerson {
  updateContactPerson: boolean | null;
}

export interface updateContactPersonVariables {
  id: string;
  firstName: string;
  lastName?: string | null;
  mainPhone?: string | null;
  workPhone?: string | null;
  email?: string | null;
  otherEmail?: string | null;
  website?: string | null;
  skype?: string | null;
  birthday?: any | null;
  description?: string | null;
  tags?: (string | null)[] | null;
  title?: string | null;
  usingCompanyPostAddress?: boolean | null;
  usingCompanyVisitAddress?: boolean | null;
  addresses?: (AddressUpdateInput | null)[] | null;
  isUserFavorite?: boolean | null;
  contactCompanyId?: string | null;
  customFieldValues?: (CustomFieldValueAddInput | null)[] | null;
}
