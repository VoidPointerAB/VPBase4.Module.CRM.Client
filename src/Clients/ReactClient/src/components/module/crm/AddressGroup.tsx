import React from 'react';
import { Translation } from 'react-i18next';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
 
import Address, { IAddress } from './Address';

interface IAddressesProps {
    postAddress: IAddress | null,
    visitAddress: IAddress | null,
    usingVisitAddress?: boolean | null,
    usingPostAddress?: boolean | null,
}

const AddressGroup = (props: IAddressesProps) => {
    return (
        <Translation>
            {(t) =>
                <article className="addresses col-xl-6 col-sm-12">
                    <Tabs className="container mx-4-lg react-tabs__menu is--open" defaultIndex={props.visitAddress ? 1 : 0}>
                        <TabList className="d-flex justify-content-between tab-ul mx-2-lg mb-3">
                            <Tab className="nav-item nav-link tab-link" disabled={!props.postAddress}>{t('addresses.postAddress')}</Tab>
                            <Tab className="nav-item nav-link tab-link " disabled={!props.visitAddress} >{t('addresses.visitAddress')}</Tab>
                        </TabList>
                        <TabPanel className="col-sm-6 p-0">
                            <p className={props.usingPostAddress ? 'font-italic' : 'd-none' }>{t('addresses.usingCompany')}</p>
                            {props.postAddress ? <Address {...props.postAddress} /> : t('addresses.noAddresses') }
                        </TabPanel>
                        <TabPanel className="col-sm-6 p-0">
                            <p className={props.usingVisitAddress ? 'font-italic' : 'd-none' }>{t('addresses.usingCompany')}</p>
                            {props.visitAddress ? <Address {...props.visitAddress} /> : ''}
                        </TabPanel>
                    </Tabs>
                </article>    
            }
        </Translation>
    )
}

export default AddressGroup