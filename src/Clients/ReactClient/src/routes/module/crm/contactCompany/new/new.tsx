import React from 'react';
import i18next from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik, FormikActions, FormikProps } from "formik";
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';

import {
    formikToastErrorMessages,
    formikHandleGraphQlErrors,
    formikHandleGraphQlException,
} from 'helpers/module/crm/errorManagement';

import * as customFieldManager from 'helpers/module/customFields/customFieldManager';
import { CrmTabbedFormBuilder } from 'helpers/module/crm/crmTabbedFormBuilder';
import { onCancel } from 'helpers/module/crm/genericFormFunctionality/genericFormCancelation';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import { generateId, entityType } from 'helpers/module/idGenerator';

import AddressTab from '../sharedItems/tabs/AddressTab';
import ContactTab from '../sharedItems/tabs/ContactTab';
import DetailsTab from '../sharedItems/tabs/DetailsTab';
import OtherTab from '../sharedItems/tabs/OtherTab';
import { formValidation } from '../sharedItems/contactCompanyValidationSchema';

import { FormWrapper } from 'components/module/Form/VPForm';
import { IOptionsProps } from 'components/module/crm/interfaceOption';
import IBox from 'components/module/inspinia/IBox/templates/IBox-template-basic';
import Button from 'components/module/Buttons/BoostrapButton';

import { ADD_CONTACTCOMPANY } from 'graphQL/module/crm/mutations/contactCompany/add';
import { GET_COUNTRIES_FIELDVALUES_CUSTOMFIELDS } from 'graphQL/module/crm/queries/contactCompany/getCountries';
import { getCountriesAndFieldValues, getCountriesAndFieldValuesVariables } from 'graphQL/module/crm/generatedTypes/getCountriesAndFieldValues';
import { addContactCompany, addContactCompanyVariables } from 'graphQL/module/crm/generatedTypes/addContactCompany';
import { AddressEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';

import '../sharedItems/companies.css';

interface INewCompanyProps {
	history: any,
	location: any,
	match: any
}

interface IValuesNewCompany {
	isUserFavorite: boolean | null,
	email: string | null,
	name: string,
	note: string | null,
	organizationNumber: string | null,
	phone: string | null,
	postAddressCty: string,
	postAddressCountryId: string,
	postAddressPNbr: string,
	postAddStr: string,
	visitAddressCty: string,
	visitAddressCountryId: string,
	visitAddressPNbr: string,
	visitAddStr: string,
	segment: string[] | null,
	tags: string[] | null,
	website: string,
}
export interface IAddressAddInput {
	street: string,
	postCode: string,
	city: string,
	countryId: string,
	addressType: AddressEnum,
	addressId: string
}
class New extends React.Component<INewCompanyProps> {
	
	public render() {
		return (
			<Query<getCountriesAndFieldValues, getCountriesAndFieldValuesVariables> query={GET_COUNTRIES_FIELDVALUES_CUSTOMFIELDS} variables={{ customFieldEntityId: 'VPBase_Crm_CustomFieldDefinition_ContactCompany' }} >
				{({ loading, error, data }) => {
					const queryPreData = queryPreDataHandler({loading, error, data})
				
					if (queryPreData) {
						return queryPreData;
					}

					if (!data || !data.fieldValues || data.customFields === null){
						return null;
					}
					const tags: IOptionsProps[] = [];
                    const segments: IOptionsProps[] = [];
                    const countryOptions: IOptionsProps[] = []
                    const countries = data.countries;

                    data.fieldValues.forEach(items => {
                        if (items.type === 'TAG') { tags.push({ value: items.text, label: items.text }) }
                        else if (items.type === 'SEGMENT') { segments.push({ value: items.text, label: items.text }) }
                    });

                    if (countries) { countries.forEach((country: any) => countryOptions.push({ value: country.countryId, label: country.name })) }

                    const customFieldValues = customFieldManager.getAsCustomFieldValues(data.customFields);
                    const customFieldInitialValues = customFieldManager.getInitialValues(customFieldValues);

					return (
						<Mutation<addContactCompany, addContactCompanyVariables>
							mutation={ADD_CONTACTCOMPANY}
						>
							{addContactCompany => (
								<div className="row m-0">
									<IBox className="mb-0 col-lg-12">
										<Formik
											initialValues={{
												isUserFavorite: false,
												email: '',
												name: '',
												note: '',
												organizationNumber: '',
												phone: '',
												postAddressCty: '',
												postAddressCountryId: null,
												postAddressPNbr: '',
												postAddStr: '',
												visitAddressCty: '',
												visitAddressCountryId: null,
												visitAddressPNbr: '',
												visitAddStr: '',
												segment: [],
												tags: [],
												website: '',
												...customFieldInitialValues,
											}}
											onSubmit={(values: IValuesNewCompany, formikActions: FormikActions<any>) => {
												const contactCompanyId = generateId(entityType.ContactCompany);
												const addresses: (IAddressAddInput | null)[] = []
												
												if (values.postAddStr || values.postAddressPNbr || values.postAddressCty || values.postAddressCountryId) {
													addresses.push({
														street: values.postAddStr,
														postCode: values.postAddressPNbr,
														city: values.postAddressCty,
														countryId: values.postAddressCountryId,
														addressType:  AddressEnum.PostAddress,
														addressId: generateId(entityType.Address)
													})
												}

												if (values.visitAddStr|| values.visitAddressPNbr || values.visitAddressCty || values.visitAddressCountryId) {
													addresses.push({
														street: values.visitAddStr,
														postCode: values.visitAddressPNbr,
														city: values.visitAddressCty,
														countryId: values.visitAddressCountryId,
														addressType: AddressEnum.VisitAddress,
														addressId: generateId(entityType.Address)
													})
												}
												addContactCompany({
													variables: {
														contactCompanyId: contactCompanyId,
														name: values.name,
														isUserFavorite: values.isUserFavorite,
														phone: values.phone,
														email: values.email,
														website: values.website,
														note: values.note,
														organizationNumber: values.organizationNumber,
														tags: values.tags && values.tags.map((tag: any) => tag.label),
														segment: values.segment && values.segment.map((segment: any) => segment.label),
														addresses,
														customFieldValues: customFieldManager.getCustomFieldValuesFromForm(values, customFieldValues),
													}
												})
												.then(({data, errors}: any) => {
													formikHandleGraphQlErrors(errors, formikActions, () => {
														toast.success(() => <><FontAwesomeIcon icon="check-circle" size="1x" className="ml-2 mr-3" />{values.name} {i18next.t('messages.successCreated')}!</>);
														this.props.history.push(`/contactcompanies/view/${contactCompanyId}`)
													})
												})
												.catch((res: any) => {
													formikHandleGraphQlException(res, formikActions);
												});
											}}
											validationSchema={formValidation}
											render={(formikBag: FormikProps<any>) => {
												formikToastErrorMessages(formikBag);

												const tabBuilder: any = new CrmTabbedFormBuilder();
                                                tabBuilder.addRawTab(i18next.t('tabs.companyDetails'), [{ content: <DetailsTab segments={segments} /> }]);
                                                tabBuilder.addRawTab(i18next.t("tabs.address"), [{ content: <AddressTab countryOptions={countryOptions} formikBag={formikBag} /> }]);
                                                tabBuilder.addRawTab(i18next.t("tabs.contactInformation"), [{ content: <ContactTab /> }]);
                                                tabBuilder.addRawTab(i18next.t("tabs.other"), [{ content: <OtherTab tags={tags} /> }]);
                                                customFieldManager.addCustomFieldsToTabbedForm(tabBuilder, customFieldValues);

                                                const formContent = tabBuilder.buildForm();

												return (
													<FormWrapper className="col-sm-12" alignment="vertical">
														<Form>
															{formContent}
															<div className="d-flex justify-content-end">
																<Button className="mb-2 mt-4 mr-2" isDisabled={formikBag.isSubmitting} type="default" isSubmit={false} onClick={() => onCancel(formikBag, this.props.history)}>
																	{i18next.t('button.cancel')}
																</Button>
																<Button className="mb-2 mt-4 ml-2" isDisabled={formikBag.isSubmitting} type="primary" isSubmit={true}>
																	{i18next.t('buttonLabels.submit')}
																</Button>
															</div>
														</Form>
													</FormWrapper>
												)
											}}
										/>
									</IBox>
								</div>
							)}
						</Mutation>
					);
				}}
			</Query>
		);
	}
}

export default withRouter<any>(New);
