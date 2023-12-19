import React from 'react';
import i18next from 'i18next';
import { Form, Formik, FormikProps } from "formik";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import client from 'apolloClient';
import CompareTable from './Table/Table';
import SelectToCompare from './SelectToCompare';
import { companiesQuery, companyComparisonQuery } from './composeQueryCompanyComparison';
import HeaderMatch from './HeaderMatch'
import { getAddressesForCompany } from "./addressHelper";
import { IOptionsProps } from 'components/module/crm/interfaceOption';
import { FormWrapper } from 'components/module/Form/VPForm';
import { IBox, IBoxContent } from 'components/module/inspinia/IBox/IBox';

import {
    formikToastErrorMessages,
    handleGraphQlErrors,
    handleGraphQlException,
} from 'helpers/module/crm/errorManagement';

import { ConfirmDialog, ActionDialog } from 'helpers/module/dialogs';
import { onCancel } from 'helpers/module/crm/genericFormFunctionality/genericFormCancelation';
import * as customFieldManager from 'helpers/module/customFields/customFieldManager';
import * as CustomFieldTypes from 'helpers/module/customFields/customFieldTypes';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import { generateId, entityType } from 'helpers/module/idGenerator';

import { COMPARE_CONTACT_COMPANY }from 'graphQL/module/crm/mutations/contactCompany/compare/compareContactCompany';
import { DELETE_CONTACTCOMPANY } from 'graphQL/module/crm/mutations/contactCompany/delete';
import { DISMISS_MATCH_CONTACT_COMPANY } from 'graphQL/module/crm/mutations/matchingEntities/dismissMatchContactCompany';
import { DELETED_COMPANY_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/contactCompany/subscribeToDeletedCompany';
import { DELETED_COMPANIES_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/contactCompany/subscribeToDeletedCompanies';
import { compareContactCompany, compareContactCompanyVariables } from 'graphQL/module/crm/generatedTypes/compareContactCompany';
import { deleteContactCompany, deleteContactCompanyVariables } from 'graphQL/module/crm/generatedTypes/deleteContactCompany';
import { contactCompanyDismissComparison, contactCompanyDismissComparisonVariables } from 'graphQL/module/crm/generatedTypes/contactCompanyDismissComparison';
import { getCompanyData } from 'graphQL/module/crm/generatedTypes/getCompanyData'
import { AddressEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';
import { contactCompany } from 'graphQL/module/crm/generatedTypes/contactCompany';

import './compare.css';
interface ICompareState {
	companyLeftId: string,
	companyRightId: string,
	isWaitingForServerResponse: boolean,
}
export interface ICompany {
	name: string,
	activityCount: number,
	contactCompanyId: string,
    isUserFavorite: boolean | null,
    organizationNumber: string | null,
    contactPersons: IContactPerson[] | null,
    tags: string[] | null,
    segment: string[] | null,
    phone: string | null,
    website: string | null,
    note: string | null,
    email: string | null,
	addresses: any,
	logo?: any,
	createdByUserId: string,
	customFieldsWithValue: CustomFieldTypes.ICustomFieldWithValueType[] | null,
}
export interface IContactPerson {
	contactPersonId: string,
	firstName: string,
	lastName: string | null
}
interface IContactCompany {
	contactCompanyId: string,
	name: string
}
export interface ICountry {
	countryId: string,
	name: string,
}

let unsubscribe: any = null;
class Compare extends React.Component<any, ICompareState> {

	public constructor(props: any) {
		super(props);

		let companyLeftId = '';
		let companyRightId = '';
		if (this.props.match.params.companies) {
			const companies = this.props.match.params.companies.split('+');
			companyLeftId = companies[0];
			companyRightId = companies[1];
		}

		this.state = {
			companyLeftId,
			companyRightId,
			isWaitingForServerResponse: false,
		}
	}
	
	public updateCompanyFilter = (id: string, side: 'left' | 'right') => {
		if (side === 'left') {
			this.setState({companyLeftId: id}, () => this.props.history.push(`/contactcompanies/compare/${id}+${this.state.companyRightId}`));
		}
		else {
			this.setState({companyRightId: id}, () => this.props.history.push(`/contactcompanies/compare/${this.state.companyLeftId}+${id}`));
		}
	}

	public handleSave = (formikBag: any, customFieldValues: any, merge: boolean, successMessage: string = 'Company saved!') => {
		const addressesToSave = extractAddresses(formikBag);

		this.setState({isWaitingForServerResponse: true}, () =>
			client.mutate<compareContactCompany, compareContactCompanyVariables>({
				mutation: COMPARE_CONTACT_COMPANY,
				variables: {
					updateCompany: {
					contactCompanyId: this.state.companyLeftId,
					isUserFavorite: formikBag.values.isUserFavorite,
					name: formikBag.values.name,
					phone: formikBag.values.phone,
					email: formikBag.values.email,
					website: formikBag.values.website,
					note: formikBag.values.note,
					organizationNumber: formikBag.values.organizationNumber,
					tags: formikBag.values.tags.map((tag: any) => tag.label),
					segment: formikBag.values.segment.map((segment: any) => segment.label),
					addresses: addressesToSave,
					customFieldValues: customFieldManager.getCustomFieldValuesFromForm(formikBag.values, customFieldValues),
				},
				transferActivities: formikBag.values.transferActivities,
				transferPersons: formikBag.values.transferContactPersons,
				merge: merge,
				fromContactCompanyId: this.state.companyRightId},
			})
			.then(({errors}: any) => {
				handleGraphQlErrors(errors, () => {
					toast.info(() => <><FontAwesomeIcon icon="check-circle" size="1x" className="ml-2 mr-3" /> {successMessage}</>);

					if (merge) {
						this.props.history.push('/matchingentities/list');
					}				
				})
			})
			.catch((error: any) => {
				handleGraphQlException(error);
			}) 
			.finally(() => this.setState({ isWaitingForServerResponse: false }))
		)
	}

	public handleMerge = (formikBag: any, customFieldValues: any) => {
		ConfirmDialog(i18next.t("messages.deleteCompanyRight"), i18next.t("messages.areYouSure"))
		.then((result: any) => {

			if (result.value !== true) {
				return;
			}

			this.handleSave(formikBag, customFieldValues, true, i18next.t("messages.matchResolved"))
		})
	}

	public handleDeleteRightCompany = (id: string, successMessage: string = 'Company deleted') => {
		ConfirmDialog(i18next.t("messages.deleteRight"), i18next.t("messages.areYouSure"))
		.then((result: any) => {
			if (result.value !== true) {
				return;
			}

			this.setState({isWaitingForServerResponse: true}, () =>
				client.mutate<deleteContactCompany, deleteContactCompanyVariables>({
					mutation: DELETE_CONTACTCOMPANY,
					variables: { id },
				})
				.then(({errors}: any) => {
					handleGraphQlErrors(errors, () => {
						toast.info(() => <><FontAwesomeIcon icon="check-circle" size="1x" className="ml-2 mr-3" /> {successMessage}</>);
						this.props.history.push('/matchingentities/list');
					})
				})
				.catch((error: any) => handleGraphQlException(error))
				.finally(() => this.setState({ isWaitingForServerResponse: false }))
			)
		});
	}

	public handleDismiss = (successMessage: string = i18next.t("messages.matchDismissed")) => {
		ConfirmDialog(i18next.t("messages.dismissThisMatch"), i18next.t("messages.areYouSure"))
		.then((result: any) => {
			if (result.value !== true) {
				return;
			}
			client.mutate<contactCompanyDismissComparison, contactCompanyDismissComparisonVariables>({
				mutation: DISMISS_MATCH_CONTACT_COMPANY,
				variables: {
					leftCompanyId: this.state.companyLeftId,
					rightCompanyId: this.state.companyRightId,
				},
			})
			.then(({errors}: any) => {
				handleGraphQlErrors(errors, () => {
					toast.info(() => <><FontAwesomeIcon icon="check-circle" size="1x" className="ml-2 mr-3" /> {successMessage}</>);
					this.props.history.push('/matchingentities/list');
				});
			})
			.catch((error: any) => {
				handleGraphQlException(error);
			});
		})
	}
	
    public render() {
	
		const CompanyCompareWithData = companyComparisonQuery(companiesQuery(
			({
				companyCompare: {
					left: leftCompany, 
					right: rightCompany, 
					countries, 
					fieldValues, 
					error: errorComparison, 
					loading: loadingCompany,
					subscribeToMore: subscribeToCompanyCompareDeleted
				},
				companies: {
					error: errorCompanies, 
					contactCompanies, 
					loading: loadingCompanies,
					subscribeToMore: subscribeToCompaniesDeleted
				},
				...props
			}) => {
			let error: any = errorCompanies ? errorCompanies : errorComparison;
			const queryPreData = queryPreDataHandler(
				{ 
					loading: loadingCompany || loadingCompanies, 
					error: error, 
					data: { leftCompany, rightCompany, contactCompanies, countries}
				}
			);
			
			if (queryPreData) {
				return queryPreData;
			}
			
			let segmentOptions: IOptionsProps[] = [];
			let tagsOptions: IOptionsProps[] = [];
			const countryOptions: IOptionsProps[] | null | undefined = countries && countries.map((country: ICountry) => { 
				return { value: country.countryId, label: country.name }
			})
			const companyOptions: IOptionsProps[] | null | undefined = contactCompanies && contactCompanies.map((company: IContactCompany) => {
				return { value: company.contactCompanyId, label: company.name }
			})
			const knownComparisonMatch = this.props.location.state && this.props.location.state.knownMatch;
			let customFieldInitialValues: any = {};

			if (!unsubscribe) {
				unsubscribe = subscribeToCompaniesDeleted({
					document: DELETED_COMPANIES_SUBSCRIPTION,
					variables: {},
					updateQuery: (prev: getCompanyData, { subscriptionData }: any) => {
						let deletedCompany = subscriptionData.data.contactCompanyDeletedEvent;
						let remainingListOfCompanies = prev
							? prev.contactCompanies && prev.contactCompanies.filter(
								(company: IContactCompany) =>
									company.contactCompanyId !== deletedCompany.contactCompanyId
							)
							: [];
						return {
							contactCompanies: remainingListOfCompanies,
						};
					},
					onError: (error) => console.warn(error)
				})

				unsubscribe = subscribeToCompanyCompareDeleted({
					document: DELETED_COMPANY_SUBSCRIPTION,
					variables: { id: this.state.companyLeftId, id2: this.state.companyRightId },
					updateQuery: (prev: contactCompany, { subscriptionData }: any) => {
						let deletedCompany = subscriptionData.data.contactCompanyDeletedEvent;
						let oldCompanyLeft = prev ? prev.left : null;
						let oldCompanyRight = prev ? prev.right : null;
						let updatedResult: any = null;
						if (deletedCompany && oldCompanyLeft && oldCompanyRight) {
							if (
								deletedCompany.contactCompanyId !== oldCompanyLeft.contactCompanyId &&
								deletedCompany.contactCompanyId !== oldCompanyRight.contactCompanyId
							) {
								return prev;
							}
							updatedResult = Object.assign({}, prev, {
								left: deletedCompany,
								right: deletedCompany,
								countries: prev.countries,
								fieldValues: prev.fieldValues,
							});
						}

						if (updatedResult && deletedCompany && oldCompanyLeft && oldCompanyRight) {
							const deletedCompanyName =
								deletedCompany.contactCompanyId === oldCompanyLeft.contactCompanyId
									? oldCompanyLeft.name
									: oldCompanyRight.name;
							ActionDialog(
								i18next.t('messages.deleted'),
								i18next.t('messages.notExistingCompaniesCompare', {
									companyName: deletedCompanyName,
								}),
								() => this.props.history.push('/matchingentities/list')
							);
						}
						return;
					},
					onError: (error) => console.warn(error)
				})
			}

			if (leftCompany) {

				if(leftCompany.segment) {
					segmentOptions = leftCompany.segment.map(segment => { return {value: segment, label: segment}})
				} 

				if (leftCompany.tags) {
					tagsOptions = leftCompany.tags.map(tag => { return {value: tag, label: tag}})
				}

				const customFieldValues = customFieldManager.getAsCustomFieldValues(leftCompany.customFieldsWithValue);
				customFieldInitialValues = customFieldManager.getInitialValues(customFieldValues);
			}

			const leftCompanyAddresses = getAddressesForCompany(leftCompany);

			return (
					<div className="row m-0">
						<IBox className="mb-0 col-lg-12">
							<Formik
								initialValues={{
									isUserFavorite: leftCompany ? leftCompany.isUserFavorite : false,
									createdByUserId: leftCompany && leftCompany.createdByUserId ? leftCompany.createdByUserId : localStorage.getItem('userId'),
									email: leftCompany && leftCompany.email ? leftCompany.email : '',
									name: leftCompany && leftCompany.name ? leftCompany.name : '',
									note: leftCompany && leftCompany.note ? leftCompany.note: '',
									organizationNumber: leftCompany && leftCompany.organizationNumber ? leftCompany.organizationNumber : '',
									phone: leftCompany && leftCompany.phone ? leftCompany.phone : '',
									postAddressId: leftCompanyAddresses.post.addressId,
									postAddressStreet: leftCompanyAddresses.post.street,
									postAddressPNbr: leftCompanyAddresses.post.postCode,
									postAddressCty: leftCompanyAddresses.post.city,
									postAddressCountryId: leftCompanyAddresses.post.country && leftCompanyAddresses.post.country.countryId,
									visitAddressId: leftCompanyAddresses.visit.addressId,
									visitAddressStreet: leftCompanyAddresses.visit.street,
									visitAddressPNbr: leftCompanyAddresses.visit.postCode,
									visitAddressCty: leftCompanyAddresses.visit.city,
									visitAddressCountryId: leftCompanyAddresses.visit.country && leftCompanyAddresses.visit.country.countryId,
									segment: segmentOptions.length ? segmentOptions : [],
									tags: tagsOptions.length ? tagsOptions : [],
									website: leftCompany && leftCompany.website ? leftCompany.website : '',
									transferActivities: false,
									transferContactPersons: false,
									...customFieldInitialValues,
								}}
								onSubmit={() => {}}
								render={(formikBag: FormikProps<any>) => {
									formikToastErrorMessages(formikBag);

									return (
										<FormWrapper className="col-sm-12" alignment="vertical">
											<Form>
												<IBox>
													{ knownComparisonMatch && leftCompany && rightCompany &&
														<IBoxContent className="d-flex">
															<HeaderMatch leftName={leftCompany.name} rightName={rightCompany.name} handleDismiss={this.handleDismiss}/>
														</IBoxContent>
													}
													<IBoxContent >
														<SelectToCompare 
															filterUpdater={this.updateCompanyFilter}
															selectedCompanyIdRight={this.state.companyRightId} 
															selectedCompanyIdLeft={this.state.companyLeftId}
															companyOptions={companyOptions} 
														/>
														{ (leftCompany && rightCompany) &&
															<CompareTable  
																leftCompany={leftCompany} 
																rightCompany={rightCompany}
																countryOptions={countryOptions}
																formikBag={formikBag}
																location={this.props.location}
															/>
														}
														<div className='d-flex justify-content-end' >
															<button className="btn btn-default mb-2 mt-4 mr-2" type="button" onClick={() => onCancel(formikBag, this.props.history)}>{i18next.t('button.cancel')}</button>
															{ (leftCompany && rightCompany) &&
																<>
																	<button 
																		className="btn btn-success mb-2 mt-4 ml-2" 
																		type="button" 
																		disabled={this.state.isWaitingForServerResponse} 
																		onClick={() => this.handleSave(formikBag, leftCompany.customFieldsWithValue, false)}
																	>
																		{i18next.t('buttonLabels.saveChanges')}
																	</button>
																	<button 
																		className="btn btn-danger mb-2 mt-4 ml-2" 
																		type="button"
																		disabled={this.state.isWaitingForServerResponse}  
																		onClick={() => this.handleDeleteRightCompany(this.state.companyRightId as string)}
																	>
																		{i18next.t('buttonLabels.deleteCompanyRight')}
																	</button>
																	<button 
																		className="btn btn-success mb-2 mt-4 ml-2" 
																		type="button" 
																		disabled={this.state.isWaitingForServerResponse} 
																		onClick={() => this.handleMerge(formikBag, leftCompany.customFieldsWithValue)}
																	>
																		{i18next.t('buttonLabels.resolveMatch')}
																	</button>
																</>
															}
														</div>
													</IBoxContent>
												</IBox>
											</Form>
										</FormWrapper>
									)
								}}
							/>
						</IBox>
					</div>
				)
			}
		)
	)

        return (
			<CompanyCompareWithData id={this.state.companyLeftId} id2={this.state.companyRightId} history={this.props.history} />
		);
    }
}

function extractAddresses(formikBag: any) {
	const addresses = [];
	if (formikBag.values.postAddressStreet || formikBag.values.postAddressPNbr || formikBag.values.postAddressCty || formikBag.values.postAddressCountryId) {
		addresses.push({
			street: formikBag.values.postAddressStreet,
			postCode: formikBag.values.postAddressPNbr,
			city: formikBag.values.postAddressCty,
			countryId: formikBag.values.postAddressCountryId,
			addressType: AddressEnum.PostAddress,
			addressId: formikBag.values.postAddressId ? formikBag.values.postAddressId : generateId(entityType.Address)
		})
	}

	if (formikBag.values.visitAddressStreet || formikBag.values.visitAddressPNbr || formikBag.values.visitAddressCty || formikBag.values.visitAddressCountryId) {
		addresses.push({
			street: formikBag.values.visitAddressStreet,
			postCode: formikBag.values.visitAddressPNbr,
			city: formikBag.values.visitAddressCty,
			countryId: formikBag.values.visitAddressCountryId,
			addressType: AddressEnum.VisitAddress,
			addressId: formikBag.values.visitAddressId ? formikBag.values.visitAddressId : generateId(entityType.Address)
		})
	}

	return addresses;
}

export default Compare;
