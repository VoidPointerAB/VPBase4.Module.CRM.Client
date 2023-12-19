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

import { serverDateFormat, getDateFormat } from 'helpers/module/dateTimeHelper';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import { onCancel } from 'helpers/module/crm/genericFormFunctionality/genericFormCancelation';
import { ActionDialog } from 'helpers/module/dialogs';

import { IBox, IBoxContent } from 'components/module/inspinia/IBox/IBox';
import { FormWrapper } from 'components/module/Form/';
import Button from 'components/module/Buttons/BoostrapButton';

import ActivityForm, { ICompany, IPerson } from '../sharedItems/ActivityForm';
import { formValidation } from '../sharedItems/activityFuntionality';

import { UPDATE_ACTIVITY } from 'graphQL/module/crm/mutations/activities/update';
import { GET_ACTIVITY_COMPANIESLIST_PERSONSLIST } from 'graphQL/module/crm/queries/activities/activity';
import { DELETED_ACTIVITY_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/activities/subscribeToDeletedActivity';
import { updateActivity, updateActivityVariables } from 'graphQL/module/crm/generatedTypes/updateActivity';
import { activity, activityVariables } from 'graphQL/module/crm/generatedTypes/activity';
import { deleteActivitySubscription, deleteActivitySubscriptionVariables } from 'graphQL/module/crm/generatedTypes/deleteActivitySubscription';

export interface IValues {
    contactPerson: { contactPersonId: string, firstName: string, lastName: string },
    contactCompany: { contactCompanyId: string, name: string },
    description: string,
    date: moment.Moment | null,
    time: string,
    type: 'MEETING' | 'PHONE' | 'OTHER' | 'NOTE' | 'EMAIL',
}
let unsubscribe: any = null;
class Edit extends React.Component<any> {

    public render() {
        const id = this.props.match.params.activityId

        const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()

        return (
            <Query<activity, activityVariables> query={GET_ACTIVITY_COMPANIESLIST_PERSONSLIST} variables={{ id }}>
                {({ loading, error, data, subscribeToMore }) => {
                    const queryPreData = queryPreDataHandler({loading, error, data, mainEntityKey: 'activity'})
                    if (queryPreData) {
                        return queryPreData;
                    }

                    if (!data || !data.activity ) {
                        return null;
                    }

                    if (!unsubscribe) {
                        unsubscribe = subscribeToMore<deleteActivitySubscription, deleteActivitySubscriptionVariables>({
                            document: DELETED_ACTIVITY_SUBSCRIPTION,
                            variables: {activityId: id},
                            updateQuery: (prev, { subscriptionData }) => {
                                if (!subscriptionData.data) return prev;
                                let deletedActivity = subscriptionData.data.activityDeletedEvent
                                let updatedResult = Object.assign({}, prev, {
                                    activity: [deletedActivity, prev.activity],
                                })
                                
                                if (updatedResult) {
                                    ActionDialog(i18next.t("messages.deleted"), i18next.t("messages.notExistingActivity"), () => this.props.history.push('/activities/list'))
                                }

                                return { 
                                    ...prev 
                                }
                            },
                            onError: (error) => console.warn(error)
                        })
                    }

                    const activity = data.activity

                    const companyIds = activity.contactCompanies && activity.contactCompanies.length > 0
                        ? activity.contactCompanies.map((company: {id: string, name: string}) => company.id )
                        : [];

                    const personIds = activity.contactPersons && activity.contactPersons.length > 0
                        ? activity.contactPersons.map((person: {id: string, name: string}) => person.id)
                        : [];

                    const contactCompanies: ICompany[] = activity.companyOptions
                        ? activity.companyOptions.map(companyOption => {
                            const personsOnCompany = companyOption.contactPersons
                                ? companyOption.contactPersons.map(({contactPersonId}) => ({contactPersonId}))
                                : []
                            return {
                                contactCompanyId: companyOption.contactCompanyId,
                                name: companyOption.name,
                                contactPersons: personsOnCompany
                            }
                        })
                        : [];

                    const contactPersons: IPerson[] = activity.personOptions
                        ? activity.personOptions.map(personOption => {
                            return {
                                contactPersonId: personOption.contactPersonId,
                                firstName: personOption.firstName,
                                lastName: personOption.lastName,
                            }
                        })
                        : [];

                    return (
                        <Mutation<updateActivity, updateActivityVariables>
                            mutation={UPDATE_ACTIVITY}
                        >
                            {(updateActivity) => (
                                <div style={{maxWidth: '1000px'}}>
                                    <IBox className="row m-0">
                                        <IBoxContent className="mb-0 col-lg-12">
                                            <p style={{ fontSize: '1.3em', margin: '0', fontWeight: 'bold', color: '#676a6c' }}>{i18next.t('formLabels.editActivity')} :
                                                    <span className="ml-2" style={{ color: 'lightgray', fontWeight: 'normal' }}>
                                                    {capitalizeFirstLetter(activity.type)}, {activity.date}
                                                </span>
                                            </p>
                                        </IBoxContent>
                                        <IBoxContent className="mb-0 col-lg-12">
                                            <Formik
                                                initialValues={{
                                                    contactPersonId: personIds,
                                                    contactCompanyId: companyIds,
                                                    date: activity.date ? moment(activity.date, getDateFormat()) : null,
                                                    description: activity.description ? activity.description : '',
                                                    time: activity.time ? moment(activity.time, 'HH:mm').format('HH:mm') : '',
                                                    type: activity.type ? activity.type : '',
                                                }}
                                                onSubmit={(values: any, formikActions: FormikActions<any>) => {

                                                    updateActivity({
                                                        variables: {
                                                            id,
                                                            description: values.description,
                                                            type: values.type,
                                                            date: values.date ? moment(values.date).format(serverDateFormat) : null,
                                                            contactCompanyIds: values.contactCompanyId ? values.contactCompanyId : [],
                                                            contactPersonIds: values.contactPersonId ? values.contactPersonId : [],
                                                            time: values.time ? values.time : null,
                                                        }
                                                    })
                                                        .then(({errors}: any) => {
                                                            formikHandleGraphQlErrors(errors, formikActions, () => {
                                                                toast.info(() => <><FontAwesomeIcon icon="check-circle" size="1x" className="ml-2 mr-3" /> {i18next.t('messages.successUpdateActivity')}</>)
                                                                this.props.history.goBack();
                                                            })
                                                        })
                                                        .catch((res: any) => {
                                                            formikHandleGraphQlException(res, formikActions);
                                                        });
                                                }}
                                                validationSchema={formValidation}

                                                render={(formikBag: FormikProps<any>) => {
                                                    formikToastErrorMessages(formikBag)

                                                    return (
                                                        <FormWrapper alignment="vertical">
                                                            <Form className="col-sm-12 activity-form">
                                                                <ActivityForm formikBag={formikBag} contactCompanies={contactCompanies} contactPersons={contactPersons} />
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
                                        </IBoxContent>
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
export default withRouter<any>(Edit);
