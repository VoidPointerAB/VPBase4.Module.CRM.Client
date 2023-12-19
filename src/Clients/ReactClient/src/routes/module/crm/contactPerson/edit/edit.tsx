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

import * as customFieldManager from 'helpers/module/customFields/customFieldManager';
import { CrmTabbedFormBuilder } from 'helpers/module/crm/crmTabbedFormBuilder';
import { serverDateFormat } from 'helpers/module/dateTimeHelper';
import { onCancel } from 'helpers/module/crm/genericFormFunctionality/genericFormCancelation';
import { ActionDialog } from 'helpers/module/dialogs';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import { generateId, entityType } from 'helpers/module/idGenerator'

import { formValidation } from '../sharedItems/form/contactPersonValidationSchema';
import ContactTab from '../sharedItems/form/tabs/ContactTab';
import DetailsTab from '../sharedItems/form/tabs/DetailsTab';
import OtherTab from '../sharedItems/form/tabs/OtherTab';
import AddressTab from '../sharedItems/form/tabs/AddressTab';
import { ICountries, IFieldValues } from '../sharedItems/form/types';

import { IOptionsProps } from 'components/module/crm/interfaceOption';
import { FormWrapper } from 'components/module/Form/VPForm';
import IBox from 'components/module/inspinia/IBox/templates/IBox-template-basic';
import Button from 'components/module/Buttons/BoostrapButton';

import { UPDATE_CONTACT_PERSON } from 'graphQL/module/crm/mutations/contactPerson/update';
import { GET_DATA_FOR_PERSON_EDIT }from 'graphQL/module/crm/queries/contactPerson/getDataForEditPerson';
import { DELETED_PERSON_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/contactPerson/subscribeToDeletedPerson';
import { contactPerson, contactPersonVariables } from 'graphQL/module/crm/generatedTypes/contactPerson';
import { deletePersonSubscription, deletePersonSubscriptionVariables } from 'graphQL/module/crm/generatedTypes/deletePersonSubscription';
import { updateContactPerson, updateContactPersonVariables } from 'graphQL/module/crm/generatedTypes/updateContactPerson';
import { IAddressAddInput } from '../../contactCompany/new/new';
import { AddressEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';

interface IEditPersonProps {
    contactCompanyId?: string,
    contactPersonId?: string,
	history: any,
	match: any,
	location: any
}
export interface IValues {
    id: string,
    firstName: string,
    lastName: string,
    birthday: string | null,
    description: string,
    isUserFavorite: boolean,
    workPhone: string,
    mainPhone: string,
    email: string,
    otherEmail: string,
    skype: string,
    tags: string[],
    title: string,
    website: string,
    postAddressId: string,
    contactCompanyId: string,
    usingCompanyPostAddress: boolean,
    usingCompanyVisitAddress: boolean,
    postAddressCty: string,
    postAddressCountryId: string,
    postAddressPNbr: string,
    postAdStr: string,
    visitAddressCty: string,
    visitAddressCountryId: string,
    visitAddressPNbr: string,
    visitAdStr: string,
    visitAddressId: string
}

let unsubscribe: any = null; 
class Edit extends React.Component<IEditPersonProps> {

    public render() {
        const id = this.props.match.params.contactPersonId;
        return (
            <Query<contactPerson, contactPersonVariables> 
                query={GET_DATA_FOR_PERSON_EDIT} 
                variables={{id}}
            >
                {({ loading, error, data,  subscribeToMore }) => {
                    const queryPreData = queryPreDataHandler({loading, error, data, mainEntityKey: 'contactPerson'})
                    
                    if (queryPreData) {
                        return queryPreData;
                    }

                    if (!data || !data.fieldValues || !data.contactPerson) {
                        return null;
                    }

                    if (!unsubscribe) {
                        unsubscribe = subscribeToMore<deletePersonSubscription, deletePersonSubscriptionVariables>({
                            document: DELETED_PERSON_SUBSCRIPTION,
                            variables: {contactPersonId: id},
                            updateQuery: (prev, { subscriptionData }) => {
                                if (!subscriptionData.data) return prev;
                                let deletedPerson = subscriptionData.data.contactPersonDeletedEvent
                                let updatedResult = Object.assign({}, prev, {
                                    contactPerson: [deletedPerson, prev.contactPerson]
                                }) 

                                if (updatedResult) {
                                    ActionDialog(i18next.t("messages.deleted"), i18next.t("messages.notExistingPerson"), () => this.props.history.push('/contactpersons/list'))
                                }
                                return {
                                    ...prev
                                };;
                            },
                            onError: (error) => console.warn(error)
                        });
                    }

                    const person = data.contactPerson;
                    const personCompany = person.contactCompany;

                    const postAddress = personCompany || !person.usingCompanyPostAddress ? person.addresses && person.addresses.filter(address => address.addressType === 'PostAddress')[0] : undefined;
                    const visitAddress = personCompany || !person.usingCompanyVisitAddress ? person.addresses && person.addresses.filter(address => address.addressType === 'VisitAddress')[0] : undefined;
                    
                    const tags: IOptionsProps[] = [];
                    const countryOptions: IOptionsProps[] = [];
                    let companyOptions: IOptionsProps[] = [];
                    const countries = data.countries;

                    data.fieldValues.forEach((items: IFieldValues) => {
                        if (items.type === 'TAG') { tags.push({ value: items.text, label: items.text }) }
                    });

                    if (countries) {
                        countries.forEach((country: ICountries) => {
                            countryOptions.push({ value: country.countryId, label: country.name })
                        })
                    }

                    if (data.contactCompanies) {
                        companyOptions = data.contactCompanies.map(company => ({
                            value: company.contactCompanyId,
                            label: company.name,
                        }));
                    }

                    const customFieldValues = customFieldManager.getAsCustomFieldValues(data.contactPerson.customFieldsWithValue)
                    const customFieldInitialValues = customFieldManager.getInitialValues(customFieldValues);
                    
                    return (
                        <Mutation<updateContactPerson, updateContactPersonVariables>
                                mutation={UPDATE_CONTACT_PERSON}
                        >
                            {updateContactPerson => (
                                <div className="row m-0">
                                    <IBox title={`${person.firstName} ${person.lastName}`} className="mb-0 col-lg-12">
                                        <Formik
                                            initialValues={{
                                                id: person.contactPersonId,
                                                contactCompanyId: personCompany ? personCompany.contactCompanyId : null,
                                                firstName: person.firstName,
                                                lastName: person.lastName ? person.lastName : '',
                                                mainPhone: person.mainPhone ? person.mainPhone : '',
                                                workPhone: person.workPhone ? person.workPhone : '',
                                                email: person.email ? person.email : '',
                                                otherEmail: person.otherEmail ? person.otherEmail : '',
                                                website: person.website ? person.website : '',
                                                skype: person.skype ? person.skype : '',
                                                birthday: person.birthday ? moment(person.birthday, 'YYYY-MM-DD') : null,
                                                description: person.description ? person.description : '',
                                                tags: person.tags ? person.tags.map((tag: string) => { return { label: tag, value: tag}}) : [],
                                                title: person.title ? person.title : '',
                                                usingCompanyPostAddress: personCompany ? person.usingCompanyPostAddress : false,
                                                usingCompanyVisitAddress: personCompany ? person.usingCompanyVisitAddress : false,
                                                postAddressId: postAddress ? postAddress.addressId : '',
                                                postAdStr: postAddress ? postAddress.street : '',
                                                postAddressPNbr: postAddress ? postAddress.postCode : '',
                                                postAddressCty: postAddress ? postAddress.city : '',
                                                postAddressCountryId: postAddress ? postAddress.countryId : null,
                                                visitAddressId: visitAddress ? visitAddress.addressId : '',
                                                visitAdStr: visitAddress ? visitAddress.street : '',
                                                visitAddressPNbr: visitAddress ? visitAddress.postCode : '',
                                                visitAddressCty: visitAddress ? visitAddress.city : '',
                                                visitAddressCountryId: visitAddress ? visitAddress.countryId : null,
                                                isUserFavorite: person.isUserFavorite ? true : false,
                                                ...customFieldInitialValues,
                                            }}
                                            onSubmit={(values: IValues, formikActions: FormikActions<any>) => {
                                                const addresses: (IAddressAddInput | null)[] = []
                                                if (values.postAdStr && !values.usingCompanyPostAddress) {
                                                    addresses.push({
                                                        street: values.postAdStr,
                                                        postCode: values.postAddressPNbr,
                                                        city: values.postAddressCty,
                                                        countryId: values.postAddressCountryId,
                                                        addressType: AddressEnum.PostAddress,
                                                        addressId: values.postAddressId ? values.postAddressId : generateId(entityType.Address)
                                                    })
                                                }

                                                if (values.visitAdStr && !values.usingCompanyVisitAddress) {
                                                    addresses.push({
                                                        street: values.visitAdStr,
                                                        postCode: values.visitAddressPNbr,
                                                        city: values.visitAddressCty,
                                                        countryId: values.visitAddressCountryId,
                                                        addressType: AddressEnum.VisitAddress,
                                                        addressId: values.visitAddressId ? values.visitAddressId : generateId(entityType.Address)
                                                    })
                                                }

                                                updateContactPerson({
                                                    variables: {
                                                        id: values.id,
                                                        contactCompanyId: values.contactCompanyId,
                                                        firstName: values.firstName,
                                                        lastName: values.lastName,
                                                        mainPhone: values.mainPhone,
                                                        workPhone: values.workPhone,
                                                        email: values.email,
                                                        otherEmail: values.otherEmail,
                                                        website: values.website,
                                                        skype: values.skype,
                                                        birthday: values.birthday ? moment(values.birthday).format(serverDateFormat) : null,
                                                        description: values.description,
                                                        tags: values.tags.map((tag: any) => tag.label),
                                                        title: values.title,
                                                        usingCompanyPostAddress: values.usingCompanyPostAddress,
                                                        usingCompanyVisitAddress: values.usingCompanyVisitAddress,
                                                        addresses,
                                                        isUserFavorite: values.isUserFavorite,
                                                        customFieldValues: customFieldManager.getCustomFieldValuesFromForm(values, customFieldValues),
                                                    }
                                                })
                                                .then(({data, errors}: any) => {
                                                    formikHandleGraphQlErrors(errors, formikActions, () => {
                                                    toast.info(() => <><FontAwesomeIcon icon="check-circle" size="1x" className="ml-2 mr-3" /> {values.firstName} {values.lastName}, {i18next.t('messages.successUpdate')}!</>)
                                                    this.props.history.push(`/contactpersons/view/${values.id}`);
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
                    )
                }}
            </Query>
        );
    }
}
export default withRouter<any>(Edit);