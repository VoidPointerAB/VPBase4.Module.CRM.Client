import { graphql, DataValue } from 'react-apollo';

import { GET_COMPANIES } from 'graphQL/module/crm/queries/contactCompany/compare/getCompanies';
import { GET_COMPANY_COMPARE_LEFT_RIGHT } from 'graphQL/module/crm/queries/contactCompany/compare/getCompanyComparison';
import { contactCompany_right, contactCompany_left, contactCompany_countries, contactCompany_fieldValues } from 'graphQL/module/crm/generatedTypes/contactCompany';
import { getCompanyData_contactCompanies} from 'graphQL/module/crm/generatedTypes/getCompanyData';

type ResponseCompanyComparison = {
    right: contactCompany_right | null,
    left: contactCompany_left | null,
    countries: contactCompany_countries[] | null,
    fieldValues: contactCompany_fieldValues[] | null
}

type VariablesCompanyComparison = {
    id: string,
    id2: string
}

interface ICompanyComparisonInputProps extends VariablesCompanyComparison {
    history: any
}

type CompanyComparisonChildProps =  ICompanyComparisonInputProps & {
    companyCompare: DataValue<ResponseCompanyComparison, VariablesCompanyComparison>
}

type ResponseCompanies = {
    contactCompanies: getCompanyData_contactCompanies[] | null
}

type VariablesCompanies = {}

interface ICompaniesInputProps extends VariablesCompanies {}

type CompaniesChildProps =  ICompaniesInputProps & {
    companies: DataValue<ResponseCompanies, VariablesCompanies>
}

export const companyComparisonQuery = graphql<ICompanyComparisonInputProps & ICompaniesInputProps, ResponseCompanyComparison, VariablesCompanyComparison, CompanyComparisonChildProps>(GET_COMPANY_COMPARE_LEFT_RIGHT, {name: 'companyCompare'})
export const companiesQuery = graphql<ICompaniesInputProps & CompanyComparisonChildProps, ResponseCompanies, VariablesCompanies, CompaniesChildProps>(GET_COMPANIES, {name: 'companies'})

