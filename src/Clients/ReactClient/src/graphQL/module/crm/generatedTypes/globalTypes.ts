/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Activity type
 */
export enum ActivityEnum {
  EMAIL = "EMAIL",
  MEETING = "MEETING",
  NOTE = "NOTE",
  OTHER = "OTHER",
  PHONE = "PHONE",
}

/**
 * Address type
 */
export enum AddressEnum {
  PostAddress = "PostAddress",
  VisitAddress = "VisitAddress",
}

/**
 * Advanced filter entity enum
 */
export enum AdvancedFilterEntityEnum {
  ContactCompany = "ContactCompany",
  ContactPerson = "ContactPerson",
  VP_Template_Basic = "VP_Template_Basic",
}

/**
 * Comparison state
 */
export enum ComparisonStateEnum {
  DISMISSED = "DISMISSED",
  MERGED = "MERGED",
  NONE = "NONE",
}

/**
 * Contact company sort type
 */
export enum ContactCompanySortEnum {
  ALPHABETICAL_ASC = "ALPHABETICAL_ASC",
  CREATEDUTC_ASC = "CREATEDUTC_ASC",
  CREATEDUTC_DESC = "CREATEDUTC_DESC",
}

/**
 * Contact Person sort type
 */
export enum ContactPersonSortEnum {
  ALPHABETICAL_ASC = "ALPHABETICAL_ASC",
  CREATEDUTC_ASC = "CREATEDUTC_ASC",
  CREATEDUTC_DESC = "CREATEDUTC_DESC",
}

/**
 * Custom field type type
 */
export enum CustomFieldDataTypeEnum {
  BOOL = "BOOL",
  DATE = "DATE",
  DATETIME = "DATETIME",
  DECIMAL = "DECIMAL",
  INT = "INT",
  STRING = "STRING",
  TIME = "TIME",
}

/**
 * Custom field type type
 */
export enum CustomFieldTypeEnum {
  CHECKBOX = "CHECKBOX",
  DROPDOWN = "DROPDOWN",
  EMAIL = "EMAIL",
  INPUT = "INPUT",
  MULTI_DROPDOWN = "MULTI_DROPDOWN",
  PHONE = "PHONE",
}

/**
 * Export entity enum
 */
export enum ExportEntityEnum {
  ContactCompany = "ContactCompany",
  ContactPerson = "ContactPerson",
  VP_Template_Basic = "VP_Template_Basic",
}

/**
 * Field value types
 */
export enum FieldValueTypeEnum {
  SEGMENT = "SEGMENT",
  TAG = "TAG",
}

/**
 * Search type
 */
export enum SearchEnumType {
  ACTIVITY = "ACTIVITY",
  CONTACTCOMPANY = "CONTACTCOMPANY",
  CONTACTPERSON = "CONTACTPERSON",
  VP_Template_Basic = "VP_Template_Basic",
}

/**
 * User favorite entity type
 */
export enum UserFavoriteEntityTypeEnum {
  COMPANY = "COMPANY",
  PERSON = "PERSON",
}

export interface AddressAddInput {
  addressId: string;
  street: string;
  postCode: string;
  city: string;
  countryId: string;
  addressType: AddressEnum;
}

export interface AddressUpdateInput {
  addressId: string;
  street: string;
  postCode: string;
  city: string;
  countryId: string;
  addressType: AddressEnum;
}

export interface AdvancedFilterConditionFilter {
  term?: string | null;
  has?: boolean | null;
  entity?: AdvancedFilterEntityEnum | null;
}

export interface AdvancedFilterTemplateAddInput {
  advancedFilterTemplateId: string;
  name: string;
  entity: AdvancedFilterEntityEnum;
  filter: (AdvancedFilterTermAddInputType | null)[];
  userTemplate?: boolean | null;
}

export interface AdvancedFilterTemplateUpdateInput {
  advancedFilterTemplateId: string;
  name: string;
  filter: (AdvancedFilterTermAddInputType | null)[];
}

export interface AdvancedFilterTermAddInputType {
  term?: string | null;
  has?: boolean | null;
  entity?: AdvancedFilterEntityEnum | null;
}

export interface ContactCompanyUpdateInput {
  contactCompanyId: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  segment?: (string | null)[] | null;
  note?: string | null;
  tags?: (string | null)[] | null;
  addresses?: (AddressUpdateInput | null)[] | null;
  organizationNumber?: string | null;
  isUserFavorite?: boolean | null;
  customFieldValues?: (CustomFieldValueAddInput | null)[] | null;
}

export interface ContactPersonUpdateInput {
  contactPersonId: string;
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

export interface CustomFieldValueAddInput {
  customFieldValueId: string;
  customFieldId: string;
  dataType: CustomFieldDataTypeEnum;
  stringValue?: string | null;
  decimalValue?: any | null;
  intValue?: number | null;
  boolValue?: boolean | null;
  dateTimeValue?: any | null;
  timeSpanValue?: string | null;
}

export interface ExportTemplateAddInput {
  exportTemplateId: string;
  name: string;
  entity: ExportEntityEnum;
  propertyIds: (string | null)[];
  userTemplate?: boolean | null;
}

export interface ExportTemplateUpdateInput {
  exportTemplateId: string;
  name: string;
  propertyIds: (string | null)[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
