import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik, FormikActions, FormikProps } from "formik";
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import i18next from 'i18next'; 

import {
    formikToastErrorMessages,
    formikHandleGraphQlErrors,
    formikHandleGraphQlException,
} from 'helpers/module/crm/errorManagement';

import * as customFieldManager from 'helpers/module/customFields/customFieldManager';
import { CrmTabbedFormBuilder } from 'helpers/module/crm/crmTabbedFormBuilder';
import { onCancel } from 'helpers/module/crm/genericFormFunctionality/genericFormCancelation';
import { ActionDialog } from 'helpers/module/dialogs';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import { generateId, entityType } from 'helpers/module/idGenerator';

import AddressTab from '../sharedItems/tabs/AddressTab';
import ContactTab from '../sharedItems/tabs/ContactTab';
import DetailsTab from '../sharedItems/tabs/DetailsTab';
import OtherTab from '../sharedItems/tabs/OtherTab';
import { formValidation } from '../sharedItems/contactCompanyValidationSchema';
import { IAddressAddInput } from '../new/new';

import { FormWrapper } from 'components/module/Form/VPForm';
import { IOptionsProps } from 'components/module/crm/interfaceOption';
import IBox from 'components/module/inspinia/IBox/templates/IBox-template-basic';
import Button from 'components/module/Buttons/BoostrapButton';

import { UPDATE_CONTACTCOMPANY }from 'graphQL/module/crm/mutations/contactCompany/update';
import { GET_COMPANY_COUNTRIES_FIELDVALUES }from 'graphQL/module/crm/queries/contactCompany/getCompanyQuery';
import  { DELETED_COMPANY_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/contactCompany/subscribeToDeletedCompany';
import { getContactCompany, getContactCompanyVariables } from 'graphQL/module/crm/generatedTypes/getContactCompany';
import { deleteCompanySubscription, deleteCompanySubscriptionVariables } from 'graphQL/module/crm/generatedTypes/deleteCompanySubscription';
import { updateContactCompany, updateContactCompanyVariables } from 'graphQL/module/crm/generatedTypes/updateContactCompany';
import { AddressEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';

interface IEditCompanyProps {
    contactCompanyId?: string,
    history: any,
	location: any,
	match: any,
}
export interface IValues {
    id: string,
    isUserFavorite: boolean,
    createdByUserId: string,
    email: string,
    name: string,
    note: string,
    organizationNumber: string,
    phone: string,
    postAddressId: string,
    postAddressCty: string,
    postAddressCountryId: string,
    postAddressPNbr: string,
    postAddStr: string,
    visitAddressId: string,
    visitAddressCty: string,
    visitAddressCountryId: string,
    visitAddressPNbr: string,
    visitAddStr: string,
    segment: string[],
    tags: string[],
    website: string,
}
class Edit extends React.Component<IEditCompanyProps> {

    public render() {
        const id = this.props.match.params.contactCompanyId;
        let unsubscribe: any = null; 
        return (
            <Query<getContactCompany, getContactCompanyVariables > query={ GET_COMPANY_COUNTRIES_FIELDVALUES} variables={{ id }}>
                {({ loading, error, data, subscribeToMore }) => {
                    const queryPreData = queryPreDataHandler({loading, error, data, mainEntityKey: 'contactCompany'})
                    
                    if (queryPreData) {
                        return queryPreData;
                    }

                    if (!data || !data.contactCompany) {
                        return null;
                    }

                    if (!unsubscribe) {
                        unsubscribe = subscribeToMore<deleteCompanySubscription, deleteCompanySubscriptionVariables>({
                            document: DELETED_COMPANY_SUBSCRIPTION,
                            variables: {contactCompanyId: id},
                            updateQuery: (prev, { subscriptionData }) => {
                                if (!subscriptionData.data) return prev;
                                let deletedCompany = subscriptionData.data.contactCompanyDeletedEvent
                                let updatedResult = Object.assign({}, prev, {
                                    contactCompany: [deletedCompany, prev.contactCompany]
                                }) 

                                if (updatedResult) {
                                    ActionDialog(i18next.t("messages.deleted"), i18next.t("messages.notExistingCompany"), () => this.props.history.push('/contactcompanies/list'))
                                }
                                return {
                                    ...prev
                                };
                            },
                            onError: (error) => console.warn(error)
                        });
                    }

                    const tags: IOptionsProps[] = [];
                    const segments: IOptionsProps[] = [];
                    const countryOptions: IOptionsProps[] = []
                    const company = data.contactCompany;
                    const countries = data.countries;

                    if(data.fieldValues) {
                        data.fieldValues.forEach((items: any) => {
                            if (items.type === 'TAG') { tags.push({ value: items.text, label: items.text }) }
                            else if (items.type === 'SEGMENT') { segments.push({ value: items.text, label: items.text }) }
                        });
                    }

                    if (countries) { countries.forEach((country: any) => countryOptions.push({ value: country.countryId, label: country.name })) }

                    const postAddress = company.addresses && company.addresses.filter((address: any) => address.addressType === 'PostAddress')[0]
                    const visitAddress = company.addresses && company.addresses.filter((address: any) => address.addressType === 'VisitAddress')[0]

                    const customFieldValues = customFieldManager.getAsCustomFieldValues(data.contactCompany.customFieldsWithValue);
                    const customFieldInitialValues = customFieldManager.getInitialValues(customFieldValues);

                    return (
                        <Mutation<updateContactCompany, updateContactCompanyVariables>
                            mutation={UPDATE_CONTACTCOMPANY }
                        >
                            {updateContactCompany => (
                                <div className="row m-0">
                                    <IBox title={`${company.name}`} className="mb-0 col-lg-12">
                                        <Formik
                                            initialValues={{
                                                isUserFavorite: company.isUserFavorite ? true : false,
                                                email: company.email ? company.email : '',
                                                id: company.contactCompanyId,
                                                name: company.name,
                                                note: company.note ? company.note : '',
                                                phone: company.phone ? company.phone : '',
                                                postAddressId: postAddress ? postAddress.addressId : '',
                                                postAddStr: postAddress ? postAddress.street : '',
                                                postAddressPNbr: postAddress ? postAddress.postCode : '',
                                                postAddressCty: postAddress ? postAddress.city : '',
                                                postAddressCountryId: postAddress && postAddress.countryId ? postAddress.countryId : null,
                                                visitAddressId: visitAddress ? visitAddress.addressId : '',
                                                visitAddStr: visitAddress ? visitAddress.street : '',
                                                visitAddressPNbr: visitAddress ? visitAddress.postCode : '',
                                                visitAddressCty: visitAddress ? visitAddress.city : '',
                                                visitAddressCountryId: visitAddress && visitAddress.countryId ? visitAddress.countryId : null,
                                                website: company.website ? company.website : '',
                                                tags: company.tags ? company.tags.map((tag: string) => { return { label: tag, value: tag}}) : [],
                                                segment: company.segment ? company.segment.map((segment: string | null) => { return { label: segment, value: segment}}) : [],
                                                organizationNumber: company.organizationNumber ? company.organizationNumber : '',
                                                ...customFieldInitialValues,
                                            }}
                                            onSubmit={(values: IValues, formikActions: FormikActions<any>) => {
                                                const addresses: (IAddressAddInput | null)[] = []

                                                if (values.postAddStr) {
                                                    addresses.push({
                                                        street: values.postAddStr,
                                                        postCode: values.postAddressPNbr,
                                                        city: values.postAddressCty,
                                                        countryId: values.postAddressCountryId,
                                                        addressType: AddressEnum.PostAddress,
                                                        addressId: values.postAddressId ? values.postAddressId : generateId(entityType.Address)
                                                    })
                                                }

                                                if (values.visitAddStr) {
                                                    addresses.push({
                                                        street: values.visitAddStr,
                                                        postCode: values.visitAddressPNbr,
                                                        city: values.visitAddressCty,
                                                        countryId: values.visitAddressCountryId,
                                                        addressType: AddressEnum.VisitAddress,
                                                        addressId: values.visitAddressId ? values.visitAddressId : generateId(entityType.Address)
                                                    })
                                                }
                                                updateContactCompany({
                                                    variables: {
                                                        id: values.id,
                                                        name: values.name,
                                                        email: values.email,
                                                        isUserFavorite: values.isUserFavorite,
                                                        note: values.note,
                                                        phone: values.phone,
                                                        website: values.website,
                                                        tags: values.tags.map((tag: any) => tag.label),
                                                        segment: values.segment.map((segment: any) => segment.label),
                                                        organizationNumber: values.organizationNumber,
                                                        addresses,
                                                        customFieldValues: customFieldManager.getCustomFieldValuesFromForm(values, customFieldValues),
                                                    }
                                                })
                                                    .then(({data, errors}: any) => {
                                                        formikHandleGraphQlErrors(errors, formikActions, () => {
                                                            toast.info(() => <><FontAwesomeIcon icon="check-circle" size="1x" className="ml-2 mr-3" /> {values.name}, {i18next.t('messages.successUpdate')}!</>)
                                                            this.props.history.push(`/contactcompanies/view/${values.id}`);
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
export default withRouter<any>(Edit);