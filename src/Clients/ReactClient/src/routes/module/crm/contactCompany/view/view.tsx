import React from 'react';
import { Query } from 'react-apollo';
import { Translation } from 'react-i18next';
import i18next from 'i18next';

import CompanyInfo from 'routes/module/crm/contactCompany/view/CompanyInfo';
import ContactPersons from 'routes/module/crm/contactCompany/view/ContactPersons';

import Activities from 'components/module/crm/Activitites';
import { IAddress } from 'components/module/crm/Address';
import ContactCompanyAddresTab from 'components/module/crm/AddressGroup';
import EditIcon from 'components/module/crm/icons/EditIcon';
import FavoriteIcon from 'components/module/crm/icons/FavoriteIcon';
import { CustomFieldDetailsBox } from 'components/module/crm/CustomFieldDetailsBox/CustomFieldDetailsBox';
import { IBox, IBoxContent, IBoxFooter } from 'components/module/inspinia/IBox/IBox';

import { ActionDialog } from 'helpers/module/dialogs';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';

import { GET_COMPANY_FOR_DETAIL } from 'graphQL/module/crm/queries/contactCompany/getCompanyForDetail';
import  { DELETED_COMPANY_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/contactCompany/subscribeToDeletedCompany';
import { getContactCompanyDetails, getContactCompanyDetailsVariables } from 'graphQL/module/crm/generatedTypes/getContactCompanyDetails';
import { deleteCompanySubscription, deleteCompanySubscriptionVariables } from 'graphQL/module/crm/generatedTypes/deleteCompanySubscription';

import '../sharedItems/companies.css';
import { UserFavoriteEntityTypeEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';

interface IProps {
    match: any,
    history: any,
}

class View extends React.Component<IProps> {

    public render() {
        let unsubscribe: any = null; 
        const id = this.props.match.params.contactCompanyId;
        return (
            <Query<getContactCompanyDetails, getContactCompanyDetailsVariables> 
                query={GET_COMPANY_FOR_DETAIL} 
                variables={{ id }}
            >
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
                    const company = data.contactCompany;
                    const customFieldsOnContactCompany = data.contactCompany.customFieldsWithValue
                    const activities = data.contactCompany.activities
                    const contactPersons = data.contactCompany.contactPersons;
                    const postAddressData = company.addresses && company.addresses.filter(type => type.addressType === 'PostAddress')[0];
                    let postAddress: IAddress | null = postAddressData ? {
                        ...postAddressData,
                        country: { countryId: postAddressData.countryId, name: postAddressData.countryName}
                    } : null;
                    const visitAddressData = company.addresses && company.addresses.filter(type => type.addressType === 'VisitAddress')[0]
                    let visitAddress: IAddress | null = visitAddressData ? {
                        ...visitAddressData,
                        country: { countryId: visitAddressData.countryId, name: visitAddressData.countryName}
                    } : null;

                    const segmentList: any = company && company.segment ? company.segment.map((segment: string) => {
                        return <span key={segment} className="segment">{segment}</span>
                    }) : []

                    return (
                        <Translation>
                            {(t) =>
                                <>
                                    <IBox>
                                        <IBoxContent className="d-flex flex-row justify-content-between align-items-center p-2 pl-3 border-top-0">
                                            <FavoriteIcon 
                                                isFavorite={company.isUserFavorite} 
                                                name={company.name} 
                                                id={company.contactCompanyId} 
                                                type={UserFavoriteEntityTypeEnum.COMPANY} />
                                            <h2 className="mr-auto"> {`${company.name} `}</h2>
                                            <EditIcon 
                                                id={id} 
                                                history={this.props.history} 
                                                type={'CONTACTCOMPANY'} />
                                        </IBoxContent>
                                        <IBoxContent className="row no-gutters">
                                            <CompanyInfo {...company} />
                                            <ContactCompanyAddresTab postAddress={postAddress} visitAddress={visitAddress} />
                                        </IBoxContent>
                                        <IBoxFooter className={segmentList.length ? 'row no-gutters segment-footer' : 'd-none'}>
                                            <p className="m-0"><strong>{t('labels.segments')}</strong> {segmentList}</p>
                                        </IBoxFooter>
                                    </IBox>
    
                                    <div className="row">
                                        <div className="col-md-12 col-lg-6">
                                            <CustomFieldDetailsBox customFields={customFieldsOnContactCompany} />
                                            <ContactPersons 
                                                company={company} 
                                                contactPersons={contactPersons} 
                                                history={this.props.history} />
                                        </div>
                                        <div className="col-md-12 col-lg-6">
                                            <Activities 
                                                activities={activities} 
                                                companyId={company.contactCompanyId} 
                                                history={this.props.history} />
                                        </div>
                                    </div>
                                </>
                            }
                        </Translation>
                    )
                }}
            </Query>
        )
    }
}

export default View