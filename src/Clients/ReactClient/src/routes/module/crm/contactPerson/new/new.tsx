import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik, FormikActions, FormikProps } from "formik";
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import moment from 'moment';
import i18next from 'i18next';

import {
    formikToastErrorMessages,
    formikHandleGraphQlErrors,
    formikHandleGraphQlException,
} from 'helpers/module/crm/errorManagement';

import * as customFieldManager from 'helpers/module/customFields/customFieldManager';
import { CrmTabbedFormBuilder } from 'helpers/module/crm/crmTabbedFormBuilder';
import { onCancel } from 'helpers/module/crm/genericFormFunctionality/genericFormCancelation';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import { serverDateFormat } from 'helpers/module/dateTimeHelper';
import { generateId, entityType } from 'helpers/module/idGenerator';

import ContactTab from '../sharedItems/form/tabs/ContactTab';
import DetailsTab from '../sharedItems/form/tabs/DetailsTab';
import OtherTab from '../sharedItems/form/tabs/OtherTab';
import AddressTab from '../sharedItems/form/tabs/AddressTab';
import { formValidation } from '../sharedItems/form/contactPersonValidationSchema';
import { ICountries, IFieldValues } from '../sharedItems/form/types';
import { IAddressAddInput } from '../../contactCompany/new/new';

import { IOptionsProps } from 'components/module/crm/interfaceOption';
import { FormWrapper } from 'components/module/Form/VPForm';
import IBox from 'components/module/inspinia/IBox/templates/IBox-template-basic';
import Button from 'components/module/Buttons/BoostrapButton';

import { ADD_CONTACT_PERSON } from 'graphQL/module/crm/mutations/contactPerson/add';
import { DATA_FOR_NEW_PERSON } from 'graphQL/module/crm/queries/contactPerson/getDataForNewPerson';
import { getCompaniesCountriesFieldValuesCustomFields, getCompaniesCountriesFieldValuesCustomFieldsVariables } from 'graphQL/module/crm/generatedTypes/getCompaniesCountriesFieldValuesCustomFields';
import { addContactPerson, addContactPersonVariables } from 'graphQL/module/crm/generatedTypes/addContactPerson';
import { AddressEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';

import '../sharedItems/persons.css';

interface INewPersonProps {
	contactPersonId?: string,
	contactCompanyId?: string,
	history: any,
	match: any,
	location: any
}

interface INewPersonValues {
	isUserFavorite: boolean,
	contactCompanyId: string,
	birthday: string | null,
	email: string,
	otherEmail: string,
	firstName: string,
	lastName: string,
	description: string,
	mainPhone: string,
	workPhone: string,
	postAddressCty: string,
	postAddressCountryId: string,
	postAddressPNbr: string,
	postAdStr: string,
	visitAddressCty: string,
	visitAddressCountryId: string,
	visitAddressPNbr: string,
	visitAdStr: string,
	usingCompanyPostAddress: boolean,
	usingCompanyVisitAddress: boolean,
	tags: string[],
	website: string,
	title: string,
	skype: string,
}

class New extends React.Component<INewPersonProps> {

	public render() {
		const id = this.props.match.params.contactCompanyId;
		return (
			<Query<getCompaniesCountriesFieldValuesCustomFields, getCompaniesCountriesFieldValuesCustomFieldsVariables> 
				query={DATA_FOR_NEW_PERSON} 
				variables={{ customFieldEntityId: 'VPBase_Crm_CustomFieldDefinition_ContactPerson' }} 
			>
				{({ loading, error, data }) => {
					const queryPreData = queryPreDataHandler({loading, error, data})
                    
                    if (queryPreData) {
                        return queryPreData;
					}
					
					if (!data || !data.fieldValues) {
						return null;
					}
					const stateid = !this.props.location ? '' : this.props.location.state
					const idCompany: string = id ? id : stateid;

					const tags: IOptionsProps[] = [];
                    const countryOptions: IOptionsProps[] = [];
                    let companyOptions: IOptionsProps[] = [];
                    const countries = data.countries;

					data.fieldValues.forEach((items: IFieldValues) => {
                        if (items.type === 'TAG') { tags.push({ value: items.text, label: items.text }) }
					});
					
                    if (countries) {
                        countries.forEach((country: ICountries) => {
                            return countryOptions.push({ value: country.countryId, label: country.name })
                        })
                    }
					
					if (data.contactCompanies) {
                        companyOptions = data.contactCompanies.map(company => ({
                            value: company.contactCompanyId,
                            label: company.name,
                        }));
                    }

					const customFieldValues = customFieldManager.getAsCustomFieldValues(data.customFields);
                    const customFieldInitialValues = customFieldManager.getInitialValues(customFieldValues);

					return (
						<Mutation<addContactPerson, addContactPersonVariables>
							mutation={ADD_CONTACT_PERSON}
						>
							{addContactPerson => (
								<div className="row m-0">
									<IBox className="mb-0 col-lg-12">
										<Formik
											initialValues={{
												isUserFavorite: false,
												contactCompanyId: idCompany ? idCompany : null,
												birthday: null,
												email: '',
												otherEmail: '',
												firstName: '',
												lastName: '',
												description: '',
												mainPhone: '',
												workPhone: '',
												postAddressCty: '',
												postAddressCountryId: null,
												postAddressPNbr: '',
												postAdStr: '',
												visitAddressCty: '',
												visitAddressCountryId: null,
												visitAddressPNbr: '',
												visitAdStr: '',
												usingCompanyPostAddress: false,
												usingCompanyVisitAddress: false,
												tags: [],
												website: '',
												title: '',
												skype: '',
												...customFieldInitialValues,
											}}
											onSubmit={(values: INewPersonValues, formikActions: FormikActions<any>) => {
												const contactPersonId =  generateId(entityType.ContactPerson);
												const addresses: (IAddressAddInput | null)[] = []

												if (values.postAdStr && !values.usingCompanyPostAddress) {
													addresses.push({
														street: values.postAdStr,
														postCode: values.postAddressPNbr,
														city: values.postAddressCty,
														countryId: values.postAddressCountryId,
														addressType: AddressEnum.PostAddress,
														addressId: generateId(entityType.Address)
													})
												}

												if (values.visitAdStr && !values.usingCompanyVisitAddress) {
													addresses.push({
														street: values.visitAdStr,
														postCode: values.visitAddressPNbr,
														city: values.visitAddressCty,
														countryId: values.visitAddressCountryId,
														addressType: AddressEnum.VisitAddress,
														addressId: generateId(entityType.Address)
													})
												}

												addContactPerson({
													variables: {
														contactPersonId: contactPersonId,
														firstName: values.firstName,
														isUserFavorite: values.isUserFavorite,
														lastName: values.lastName,
														mainPhone: values.mainPhone,
														workPhone: values.workPhone,
														email: values.email,
														otherEmail: values.otherEmail,
														website: values.website,
														description: values.description,
														tags: values.tags.map((tag: any) => tag.label),
														skype: values.skype,
														title: values.title,
														contactCompanyId: values.contactCompanyId,
														birthday: values.birthday ? moment(values.birthday).format(serverDateFormat) : null,
														usingCompanyPostAddress: values.usingCompanyPostAddress,
														usingCompanyVisitAddress: values.usingCompanyVisitAddress,
														addresses,
														customFieldValues: customFieldManager.getCustomFieldValuesFromForm(values, customFieldValues),
													}
												})
												.then(({data, errors}: any) => {
													formikHandleGraphQlErrors(errors, formikActions, () => {
														toast.success(() => <><FontAwesomeIcon icon="check-circle" size="1x" className="ml-2 mr-3" />{values.firstName} {values.lastName} {i18next.t('messages.successCreated')}!</>);
														this.props.history.push(`/contactpersons/view/${contactPersonId}`);
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
                                                tabBuilder.addRawTab(i18next.t("tabs.personDetails"), [{ content: <DetailsTab companyOptions={companyOptions}  formikBag={formikBag} /> }]);
                                                tabBuilder.addRawTab(i18next.t("tabs.address"), [{ content: <AddressTab countryOptions={countryOptions} formikBag={formikBag} /> }]);
                                                tabBuilder.addRawTab(i18next.t("tabs.contactInformation"),  [{ content: <ContactTab /> }]);
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
