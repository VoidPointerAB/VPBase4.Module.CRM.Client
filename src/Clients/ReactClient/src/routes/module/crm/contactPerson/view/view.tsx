import React from 'react';
import { Query } from 'react-apollo';
import i18next from 'i18next';

import { IAddress } from 'components/module/crm/Address';
import Activities from 'components/module/crm/Activitites';
import AddressGroup from 'components/module/crm/AddressGroup';
import EditIcon from 'components/module/crm/icons/EditIcon';
import { CustomFieldDetailsBox } from 'components/module/crm/CustomFieldDetailsBox/CustomFieldDetailsBox';
import { IBox, IBoxContent } from 'components/module/inspinia/IBox/IBox';
import FavoriteIcon from 'components/module/crm/icons/FavoriteIcon';
import PersonInfo from 'routes/module/crm/contactPerson/view/PersonInfo';
import Title from 'routes/module/crm/contactPerson/view/Title';
import { ActionDialog } from 'helpers/module/dialogs';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';

import { GET_PERSON_FOR_DETAIL } from 'graphQL/module/crm/queries/contactPerson/getPersonForDetail';
import { DELETED_PERSON_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/contactPerson/subscribeToDeletedPerson';
import { contactPersonDetail, contactPersonDetailVariables } from 'graphQL/module/crm/generatedTypes/contactPersonDetail';
import { deletePersonSubscription, deletePersonSubscriptionVariables } from 'graphQL/module/crm/generatedTypes/deletePersonSubscription';
import { UserFavoriteEntityTypeEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';

import '../sharedItems/persons.css';

interface IProps {
    match: any,
    history: any,
}

let unsubscribe: any = null; 
class View extends React.Component<IProps> {
    public render() {
        const id = this.props.match.params.contactPersonId;

        return (
            <Query<contactPersonDetail, contactPersonDetailVariables> 
                query={GET_PERSON_FOR_DETAIL} 
                variables={{id}}
            >
                {({ loading, error, data, subscribeToMore }) => {
                
                    const queryPreData = queryPreDataHandler({loading, error, data, mainEntityKey: 'contactPerson'})
                    
                    if (queryPreData) {
                        return queryPreData;
                    }
                    
                    if (!data || !data.contactPerson) {
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
                                };
                            }
                        });
                    }

                    const contactPerson = data.contactPerson;

                    const activities = data.contactPerson.activities;

                    const postAddressData = contactPerson.addresses && contactPerson.addresses.filter(type => type.addressType === 'PostAddress')[0];
                    let postAddress: IAddress | null = postAddressData ? {
                        ...postAddressData,
                        country: { countryId: postAddressData.countryId, name: postAddressData.countryName}
                    } : null;
                    const visitAddressData = contactPerson.addresses && contactPerson.addresses.filter(type => type.addressType === 'VisitAddress')[0]
                    let visitAddress: IAddress | null = visitAddressData ? {
                        ...visitAddressData,
                        country: { countryId: visitAddressData.countryId, name: visitAddressData.countryName}
                    } : null;

                    if (contactPerson.usingCompanyPostAddress && !contactPerson.contactCompany) {
                        postAddress = null;
                    }
                    if (contactPerson.usingCompanyVisitAddress && !contactPerson.contactCompany) {
                        visitAddress = null;
                    }

                    const companyId = contactPerson.contactCompany ? contactPerson.contactCompany.contactCompanyId : '';

                    return (
                        <>
                            <IBox>
                                <IBoxContent className="d-flex flex-row justify-content-between align-items-center p-2 pl-3 border-top-0">
                                    <FavoriteIcon 
                                        isFavorite={contactPerson.isUserFavorite} 
                                        name={contactPerson.firstName} 
                                        id={contactPerson.contactPersonId} 
                                        type={UserFavoriteEntityTypeEnum.PERSON} 
                                    />
                                    <Title {...contactPerson} history={this.props.history} />
                                    <EditIcon 
                                        id={id} 
                                        history={this.props.history} 
                                        type={'CONTACTPERSON'} 
                                    />
                                </IBoxContent>
                                <IBoxContent className="row no-gutters">
                                    <PersonInfo {...contactPerson} history={this.props.history} />
                                    <AddressGroup 
                                        postAddress={postAddress} 
                                        visitAddress={visitAddress}
                                        usingPostAddress={contactPerson.contactCompany && contactPerson.usingCompanyPostAddress} 
                                        usingVisitAddress={contactPerson.contactCompany && contactPerson.usingCompanyVisitAddress} 
                                    />
                                </IBoxContent>
                            </IBox>
                            
                            <div className="row">
                                <div className="col-md-12 col-lg-6">
                                    <CustomFieldDetailsBox customFields={data.contactPerson.customFieldsWithValue} />
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <Activities 
                                        activities={activities} 
                                        history={this.props.history} 
                                        personId={contactPerson.contactPersonId} 
                                        companyId={contactPerson.contactCompany ? companyId : null} 
                                    />
                                </div>
                            </div>
                        </>
                    )
                }}
            </Query>
        )
    }
}

export default View