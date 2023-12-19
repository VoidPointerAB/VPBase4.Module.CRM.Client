import React from 'react';
import i18next from 'i18next';
import { Form, Formik, FormikProps } from "formik";
import { compose } from 'react-apollo';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import client from 'apolloClient';
import CompareTable from './Table/Table';
import SelectToCompare from './SelectToCompare';
import HeaderMatch from './HeaderMatch'
import { getAddressesForPerson } from "./addressHelper";
import { IOptionsProps } from 'components/module/crm/interfaceOption';
import { FormWrapper } from 'components/module/Form/VPForm';
import { IBox, IBoxContent } from 'components/module/inspinia/IBox/IBox';

import {
    formikToastErrorMessages,
    handleGraphQlErrors,
    handleGraphQlException,
} from 'helpers/module/crm/errorManagement';

import { ConfirmDialog } from 'helpers/module/dialogs';
import { onCancel } from 'helpers/module/crm/genericFormFunctionality/genericFormCancelation';
import * as customFieldManager from 'helpers/module/customFields/customFieldManager'
import * as CustomFieldTypes from 'helpers/module/customFields/customFieldTypes';
import { serverDateFormat } from 'helpers/module/dateTimeHelper';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import { generateId, entityType } from 'helpers/module/idGenerator';


import { COMPARE_CONTACT_PERSON } from 'graphQL/module/crm/mutations/contactPerson/compare/compareContactPerson';
import { DELETE_CONTACT_PERSON }from 'graphQL/module/crm/mutations/contactPerson/delete';
import { DISMISS_MATCH_CONTACT_PERSON } from 'graphQL/module/crm/mutations/matchingEntities/dismissMatchContactPerson';
import { personComparisonQuery, personsQuery } from './composeQueryPersonsComparison';
import { compareContactPerson, compareContactPersonVariables } from 'graphQL/module/crm/generatedTypes/compareContactPerson';
import { AddressEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';
import { IAddressAddInput } from '../../contactCompany/new/new';
import { deleteContactPerson, deleteContactPersonVariables } from 'graphQL/module/crm/generatedTypes/deleteContactPerson';
import { contactPersonDismissComparison, contactPersonDismissComparisonVariables } from 'graphQL/module/crm/generatedTypes/contactPersonDismissComparison';

import './compare.css';

interface ICompareState {
	personLeftId: string,
	personRightId: string,
	isWaitingForServerResponse: boolean,
}

export interface IPerson {
	firstName: string, 
	lastName: string,
	activityCount: number,
	birthday: string | null,
	contactPersonId: string,
	isUserFavorite: boolean,
	contactCompany: IContactCompany,
	tags: string[],
	skype: string,
	usingCompanyPostAddress: boolean,
	usingCompanyVisitAddress: boolean,
	mainPhone: string,
	workPhone: string,
	website: string,
	description: string,
	title: string,
	email: string,
	otherEmail: string,
	addresses: any,
	customFieldsWithValue: CustomFieldTypes.ICustomFieldWithValueType[],
	imgLogo: string, 
	logo?: any,
}
export interface IContactCompany {
	contactCompanyId: string,
	name: string,
}

export interface ICountry {
	countryId: string,
	name: string,
}

let unsubscribe: any = null;
class Compare extends React.Component<any, ICompareState> {

	public constructor(props: any) {
		super(props);

		let personLeftId = '';
		let personRightId = '';
		if (this.props.match.params.persons) {
			const persons = this.props.match.params.persons.split('+');
			personLeftId = persons[0];
			personRightId = persons[1];
		}

		this.state = {
			personLeftId,
			personRightId,
			isWaitingForServerResponse: false,
		}
	}

	public updatePersonFilter = (id: string, side: 'left' | 'right') => {
		if (side === 'left') {
			this.setState({personLeftId: id}, () => this.props.history.push(`/contactpersons/compare/${id}+${this.state.personRightId}`));
		}
		else {
			this.setState({personRightId: id}, () => this.props.history.push(`/contactpersons/compare/${this.state.personLeftId}+${id}`));
		}
	}

	public handleSave = (formikBag: any, customFieldValues: any, merge: boolean, successMessage: string = 'Person saved!') => {
		const addressesToSave = extractAddresses(formikBag);

		this.setState({isWaitingForServerResponse: true}, () => 
			client.mutate<compareContactPerson, compareContactPersonVariables>({
				mutation: COMPARE_CONTACT_PERSON,
				variables: {
					updatePerson: {
					contactPersonId: this.state.personLeftId,
					isUserFavorite: formikBag.values.isUserFavorite,
					firstName: formikBag.values.firstName,
					lastName: formikBag.values.lastName,
					mainPhone: formikBag.values.mainPhone,
					workPhone: formikBag.values.workPhone,
					email: formikBag.values.email,
					otherEmail: formikBag.values.otherEmail,
					skype: formikBag.values.skype,
					contactCompanyId: formikBag.values.contactCompanyId,
					usingCompanyPostAddress: formikBag.values.usingCompanyPostAddress,
					usingCompanyVisitAddress: formikBag.values.usingCompanyVisitAddress,
					website: formikBag.values.website,
					description: formikBag.values.description,
					birthday: formikBag.values.birthday,
					title: formikBag.values.title,
					tags: formikBag.values.tags.map((tag: any) => tag.label),
					addresses: addressesToSave,
					customFieldValues: customFieldManager.getCustomFieldValuesFromForm(formikBag.values, customFieldValues),
				},
				transferActivities: formikBag.values.transferActivities,
				merge: merge,
				fromContactPersonId: this.state.personRightId},
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
			.finally(() => this.setState({isWaitingForServerResponse: false}))
		)

		
	}

	public handleMerge = (formikBag: any, customFieldValues: any) => {
		ConfirmDialog(i18next.t("messages.deletePersonRight"), i18next.t("messages.areYouSure"))
		.then((result: any) => {

			if (result.value !== true) {
				return;
			}

			this.handleSave(formikBag, customFieldValues, true, i18next.t("messages.matchResolved"))
		})
	}

	public handleDeleteRightPerson = (id: string, successMessage: string = i18next.t("messages.personDeleted")) => {
		ConfirmDialog(i18next.t("messages.deleteRightPerson"), i18next.t("messages.areYouSure"))
		.then((result: any) => {

			if (result.value !== true) {
				return;
			}

			this.setState({isWaitingForServerResponse: true}, () => 
				client.mutate<deleteContactPerson, deleteContactPersonVariables>({
					mutation: DELETE_CONTACT_PERSON,
					variables: { id },
				})
				.then(({errors}: any) => {
					handleGraphQlErrors(errors, () => {
						toast.info(() => <><FontAwesomeIcon icon="check-circle" size="1x" className="ml-2 mr-3" /> {successMessage}</>);
						this.props.history.push('/matchingentities/list');
					})
				})
				.catch((error: any) => handleGraphQlException(error))
				.finally(() => this.setState({isWaitingForServerResponse: false}))
			)
		});
	}

	public handleDismiss = (successMessage: string = i18next.t("messages.matchDismissed")) => {
		ConfirmDialog(i18next.t("messages.dismissThisMatch"), i18next.t("messages.areYouSure"))
		.then((result: any) => {
			if (result.value !== true) {
				return;
			}
			client.mutate<contactPersonDismissComparison, contactPersonDismissComparisonVariables>({
				mutation: DISMISS_MATCH_CONTACT_PERSON,
				variables: {
					leftPersonId: this.state.personLeftId,
					rightPersonId: this.state.personRightId,
				},
			})
			.then(({errors}: any) => {
				handleGraphQlErrors(errors, () => {
					toast.info(() => <><FontAwesomeIcon icon="check-circle" size="1x" className="ml-2 mr-3" /> {successMessage}</>);
					this.props.history.push('/matchingentities/list');
				})
			})
			.catch((error: any) => handleGraphQlException(error));
		})
	}
	
    public render() {
	
		const PersonData = ({ loadingPerson, loadingPersons, leftPerson, rightPerson, persons, countries, subscribe, errorComparison, errorPersons }: any) => {
			const error: any = errorComparison ? errorComparison : errorPersons;
			const queryPreData = queryPreDataHandler(
				{ 
					loading: loadingPerson || loadingPersons, 
					error: error, 
					data: { leftPerson, rightPerson, persons ,countries}
				}
			);
			
			if (queryPreData) {
				return queryPreData;
			}

			let tagsOptions: IOptionsProps[] = [];
			const countryOptions: IOptionsProps = countries.map((country: ICountry) => { return { value: country.countryId, label: country.name }})
			const personOptions: IOptionsProps[] = persons.map((person: IPerson) => { return { value: person.contactPersonId, label: `${person.firstName} ${person.lastName}` }})
			const knownComparisonMatch = this.props.location.state && this.props.location.state.knownMatch;
			let customFieldInitialValues: any = {}

			if (!unsubscribe) {
				unsubscribe = subscribe;
			}

			if (leftPerson) {

				if (leftPerson.tags) {
					tagsOptions = leftPerson.tags.map((tag: any) => { return {value: tag, label: tag}})
				}
				
				customFieldInitialValues = customFieldManager.getInitialValues(leftPerson.customFieldsWithValue);
				
			}

			const leftPersonAddresses = getAddressesForPerson(leftPerson);

			return (
				<div className="row m-0">
					<IBox className="mb-0 col-lg-12">
						<Formik
							initialValues={{
								isUserFavorite: leftPerson ? leftPerson.isUserFavorite : false,
								contactCompanyId: leftPerson && leftPerson.contactCompany ? leftPerson.contactCompany.contactCompanyId : null,
								birthday: leftPerson && leftPerson.birthday ? moment(leftPerson.birthday, serverDateFormat) : null,
								email: leftPerson && leftPerson.email ? leftPerson.email : '',
								otherEmail: leftPerson && leftPerson.otherEmail? leftPerson.otherEmail: '',
								firstName: leftPerson && leftPerson.firstName ? leftPerson.firstName : '',
								lastName: leftPerson && leftPerson.lastName ? leftPerson.lastName : '',
								description: leftPerson && leftPerson.description ? leftPerson.description: '',
								mainPhone: leftPerson && leftPerson.mainPhone ? leftPerson.mainPhone: '',
								workPhone: leftPerson && leftPerson.workPhone ? leftPerson.workPhone: '',
								postAddressId: leftPersonAddresses.post.addressId,
								postAddressStreet: leftPersonAddresses.post.street,
								postAddressPNbr: leftPersonAddresses.post.postCode,
								postAddressCty: leftPersonAddresses.post.city,
								postAddressCountryId: leftPersonAddresses.post.country && leftPersonAddresses.post.country.countryId,
								visitAddressId: leftPersonAddresses.visit.addressId,
								visitAddressStreet: leftPersonAddresses.visit.street,
								visitAddressPNbr: leftPersonAddresses.visit.postCode,
								visitAddressCty: leftPersonAddresses.visit.city,
								visitAddressCountryId: leftPersonAddresses.visit.country && leftPersonAddresses.visit.country.countryId,
								usingCompanyPostAddress: leftPerson && leftPerson.usingCompanyPostAddress ? leftPerson.usingCompanyPostAddress : false,
								usingCompanyVisitAddress: leftPerson && leftPerson.usingCompanyVisitAddress ? leftPerson.usingCompanyVisitAddress : false,
								tags: tagsOptions.length ? tagsOptions : [],
								website: leftPerson && leftPerson.website ? leftPerson.website : '',
								title: leftPerson && leftPerson.title ? leftPerson.title : '',
								skype: leftPerson && leftPerson.skype ? leftPerson.skype : '',
								transferActivities: false,
								...customFieldInitialValues,
							}}
							onSubmit={() => {}}
							render={(formikBag: FormikProps<any>) => {
								formikToastErrorMessages(formikBag);

								return (
									<FormWrapper className="col-sm-12" alignment="vertical">
										<Form>
											<IBox>
												{ knownComparisonMatch && 
													<IBoxContent className="d-flex">
														<HeaderMatch  
															leftPersonName={`${leftPerson.firstName} ${leftPerson.lastName}`} rightPersonName={`${rightPerson.firstName} ${rightPerson.lastName}`} 
															handleDismiss={this.handleDismiss}
														/>
													</IBoxContent>
												}
												<IBoxContent >
													<SelectToCompare 
														filterUpdater={this.updatePersonFilter}
														selectedPersonIdRight={this.state.personRightId} 
														selectedPersonIdLeft={this.state.personLeftId}
														personOptions={personOptions} 
													/>
													{ (leftPerson && rightPerson) &&
														<CompareTable  
															leftPerson={leftPerson} 
															rightPerson={rightPerson}
															countryOptions={countryOptions}
															formikBag={formikBag}
															location={this.props.location}
														/>
													}
													<div className='d-flex justify-content-end' >
														<button className="btn btn-default mb-2 mt-4 mr-2" type="button" onClick={() => onCancel(formikBag, this.props.history)}>{i18next.t('button.cancel')}</button>
														{ (leftPerson && rightPerson) &&
															<>
																<button 
																	className="btn btn-success mb-2 mt-4 ml-2" 
																	type="button" 
																	disabled={this.state.isWaitingForServerResponse}
																	onClick={() => this.handleSave(formikBag, leftPerson.customFieldsWithValue, false)}
																>
																	{i18next.t('buttonLabels.saveChanges')}
																</button>
																<button 
																	className="btn btn-danger mb-2 mt-4 ml-2" 
																	type="button" 
																	disabled={this.state.isWaitingForServerResponse}
																	onClick={() => this.handleDeleteRightPerson(this.state.personRightId as string)}
																>
																	{i18next.t('buttonLabels.deletePersonRight')}
																</button>
																<button 
																	className="btn btn-success mb-2 mt-4 ml-2" 
																	type="button"
																	disabled={this.state.isWaitingForServerResponse}
																	onClick={() => this.handleMerge(formikBag, leftPerson.customFieldsWithValue)}
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
		};

	const PersonCompareWithData = compose(personComparisonQuery(this.state.personLeftId, this.state.personRightId, this.props.history), personsQuery)(PersonData);

        return (
			<PersonCompareWithData />
		);
    }
}

function extractAddresses(formikBag: any) {
	const addresses: (IAddressAddInput | null)[] | null = [];

	if (formikBag.values.postAddressStreet || formikBag.values.postAddressPNbr || formikBag.values.postAddressCty ||  formikBag.values.postAddressCountryId) {
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
			addressId: formikBag.values.visitAddressId ? formikBag.values.visitAddressId: generateId(entityType.Address)
		})
	}
	return addresses;
}

export default Compare;
