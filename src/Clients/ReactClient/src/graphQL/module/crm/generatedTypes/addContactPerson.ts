/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressAddInput, CustomFieldValueAddInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addContactPerson
// ====================================================

export interface addContactPerson {
  addContactPerson: boolean | null;
}

export interface addContactPersonVariables {
  contactPersonId: string;
  firstName: string;
  isUserFavorite?: boolean | null;
  lastName: string;
  contactCompanyId?: string | null;
  email?: string | null;
  otherEmail?: string | null;
  website?: string | null;
  mainPhone?: string | null;
  workPhone?: string | null;
  skype?: string | null;
  description?: string | null;
  tags?: (string | null)[] | null;
  title?: string | null;
  addresses?: (AddressAddInput | null)[] | null;
  birthday?: any | null;
  usingCompanyPostAddress?: boolean | null;
  usingCompanyVisitAddress?: boolean | null;
  customFieldValues?: (CustomFieldValueAddInput | null)[] | null;
}
