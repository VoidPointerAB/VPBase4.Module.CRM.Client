import React from 'react';
import i18next from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik, FormikActions, FormikProps } from "formik";
import moment from 'moment';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';

import {
    formikToastErrorMessages,
    formikHandleGraphQlErrors,
    formikHandleGraphQlException,
} from 'helpers/module/crm/errorManagement';

import { serverDateFormat } from 'helpers/module/dateTimeHelper';
import { onCancel } from 'helpers/module/crm/genericFormFunctionality/genericFormCancelation';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import { generateId, entityType} from 'helpers/module/idGenerator';

import { FormWrapper } from 'components/module/Form/VPForm';
import IBox from 'components/module/inspinia/IBox/templates/IBox-template-basic';
import Button from 'components/module/Buttons/BoostrapButton';

import ActivityForm from 'routes/module/crm/activities/sharedItems/ActivityForm';
import { formValidation } from '../sharedItems/activityFuntionality';

import { ADD_ACTIVITY } from 'graphQL/module/crm/mutations/activities/add';
import { GET_COMPANIES_PERSONS_LIST } from 'graphQL/module/crm/queries/activities/getCompaniesAndPersons';
import { getContactCompaniesAndPersons } from 'graphQL/module/crm/generatedTypes/getContactCompaniesAndPersons';
import { addActivity, addActivityVariables } from 'graphQL/module/crm/generatedTypes/addActivity';

interface INewActivityProps {
	history: any,
	match: any,
	location: any
}
export interface IValues {
	createdByUserId: string,
	contactPerson: { contactPersonId: string, firstName: string, lastName: string },
	contactCompany: { contactCompanyId: string, name: string },
	description: string,
	date: string | null,
	time: any,
	type: 'MEETING' | 'PHONE' | 'OTHER' | 'NOTE' | 'EMAIL',
}

class New extends React.Component<INewActivityProps> {

	public render() {
		return (
			<Query<getContactCompaniesAndPersons> query={GET_COMPANIES_PERSONS_LIST} >
				{({ loading, error, data }) => {
					const queryPreData = queryPreDataHandler({loading, error, data})
                
					if (queryPreData) {
						return queryPreData;
					}

					if (!data || !data.contactCompaniesLite || !data.contactPersonsLite ) {
                        return null;
					}
					
					const stateid = this.props.location ? this.props.location.state : null
					const idCompany: string = stateid ? stateid.companyId : null;
					const personId: string = stateid ? stateid.personId : null;

					return (
						<Mutation<addActivity, addActivityVariables> mutation={ADD_ACTIVITY} >
							{(addActivity) => (
								<div className="row m-0" style={{maxWidth: '1000px'}}>
									<IBox className="mb-0 col-lg-12">
										<Formik
											initialValues={{
												contactPersonId: personId ? [personId] : [],
												contactCompanyId: idCompany ? [idCompany] : [],
												date: null,
												description: '',
												time: '',
												type: '',
											}}
											onSubmit={(values: any, formikActions: FormikActions<any>) => {
												addActivity({
													variables: {
														activityId: generateId(entityType.Activity),
														description: values.description,
														type: values.type,
														date: values.date ? moment(values.date).format(serverDateFormat) : null,
														contactCompanyIds: values.contactCompanyId ? values.contactCompanyId : [],
														contactPersonIds: values.contactPersonId ? values.contactPersonId : [],
														time: values.time ? values.time : null,
													}
												})
													.then(({errors}: any) =>  {
														formikHandleGraphQlErrors(errors, formikActions, () => {
															toast.success(() => <><FontAwesomeIcon icon="check-circle" size="1x" className="ml-2 mr-3" />{i18next.t('messages.successCreatedActivity')}</>)
															this.props.history.goBack();                            
														})
													})
													.catch((res: any) => {
                                                        formikHandleGraphQlException(res, formikActions);
													});
											}}
											validationSchema={formValidation}
											render={(formikBag: FormikProps<any>) => {
												formikToastErrorMessages(formikBag);

												return (
													<FormWrapper className="col-sm-12" alignment="vertical">
														<Form>
															<ActivityForm 
																formikBag={formikBag} 
																contactCompanies={data.contactCompaniesLite}
																contactPersons={data.contactPersonsLite}
															/>
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
