import { IAddress } from 'components/module/crm/Address';
import { FieldValueTypeEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';

export interface ICountries {
    countryId: string,
    name: string,
}
export interface ICompanies {
    contactCompanyId: string,
    name: string,
    addresses: IAddress[] | null
}

export interface ICompaniesOptions {
    contactCompanyId: string,
    name: string,
}
export interface IFieldValues {
    text: string,
    type: FieldValueTypeEnum | null
}
