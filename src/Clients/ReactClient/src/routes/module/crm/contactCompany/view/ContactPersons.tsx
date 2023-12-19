import React from 'react';
import { Link } from 'react-router-dom';
import { Translation } from 'react-i18next';

import AddIcon from 'components/module/crm/icons/AddIcon';
import NoData from 'components/module/crm/NoData';
import { IBox, IBoxContent } from 'components/module/inspinia/IBox/IBox';
import { personSort } from 'helpers/module/crm/sorters'

export interface IContactPerson {
    firstName: string;
    lastName: string | null;
    contactPersonId: string;
}
export interface ICompany {
    contactCompanyId: string;
}
interface IContactPersonsProps {
    contactPersons: IContactPerson[] | null;
    company: ICompany;
    history: any;
}

const ContactPersons = (props: IContactPersonsProps) => {
    const companyContactPersons = props.contactPersons === null ? [] : props.contactPersons;
    companyContactPersons.sort(personSort)

    const companyContactPersonsItems =  companyContactPersons && companyContactPersons.map((person: IContactPerson) => {
        const initials: string = person.lastName 
            ? `${person.firstName.charAt(0).toUpperCase()} ${person.lastName.charAt(0).toUpperCase()}` 
            : `${person.firstName.charAt(0).toUpperCase()}`
        return (
            <article key={person.contactPersonId} className="contact-company-person">
                <div className="initials-person mb-2">{initials}</div>
                <Link
                    to={`/contactpersons/view/${person.contactPersonId}`}
                    className="pb-2 link-contact-person"
                >
                    {person.firstName} {person.lastName}
                </Link>
            </article>
        );
    });
    
    return (
        <Translation>
            {(t) =>
                <IBox className="d-flex flex-column">
                    <IBoxContent className={`contact-company-persons-list `}>
                        <h3 className="m-0">{t('contactPersons')}</h3>
                        <AddIcon
                            companyId={props.company.contactCompanyId}
                            history={props.history}
                            type={'PERSON'}
                            icon={'user-plus'}
                        />
                    </IBoxContent>
                    <IBoxContent className={`contact-persons-container text-center`}>
                        {companyContactPersonsItems && companyContactPersonsItems.length ? companyContactPersonsItems : <NoData />}
                    </IBoxContent>
                </IBox>
            }
        </Translation>
        
    );
};

export default ContactPersons;
