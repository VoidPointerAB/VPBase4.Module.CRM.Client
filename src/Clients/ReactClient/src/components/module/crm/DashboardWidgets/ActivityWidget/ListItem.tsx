import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment'
import { Link } from 'react-router-dom';
import  i18Next from 'i18next';

import EditIcon from 'components/module/crm/icons/EditIcon';
import TooltipComp from 'components/module/crm/TooltipComp';
import { TextBoxWithLinks } from 'components/module/crm/TextBoxWithLinks/TextBoxWithLinks'
import { getDateFormat } from 'helpers/module/dateTimeHelper';
import { IContactCompanies, IContactPersons } from 'routes/module/crm/contactCompany/sharedItems/types';

export interface IActivityItem {
    description: string | null,
    type: 'NOTE' | 'MEETING' | 'PHONE' | 'EMAIL' | 'OTHER',
    date: string | Date,
    time: any,
    activityId: string,
    contactCompanies: IContactCompanies[] | null,
    contactPersons: IContactPersons[] | null,
}

interface IActivityProps {
    history: any
}

const ListItem = (props: IActivityItem & IActivityProps) => {
    
    const handleIcon = () => {
        switch (props.type) {
            case 'PHONE':
                return <FontAwesomeIcon icon="phone" className="icon-phone" />
            case 'EMAIL':
                return <FontAwesomeIcon icon="at" className="icon-at" />
            case 'MEETING':
                return <FontAwesomeIcon icon="users" className="icon-users" />
            case 'NOTE':
                return <FontAwesomeIcon icon="sticky-note" className="icon-note" />
            default:
                return <FontAwesomeIcon icon="calendar-alt" className="icon-calendar" />
        }
    }

    const allPersonNames =  props.contactPersons && props.contactPersons.map((person: {id: string, name: string}) => ` ${person.name}`);
    const allCompanyNames =  props.contactCompanies && props.contactCompanies.map((company: {id: string, name: string}) => ` ${company.name}`);
    
    const displayNumberOfContactPersons = props.contactPersons &&  props.contactPersons.length > 1 ? props.contactPersons.length : null;
    const badgeForPerson = <span className="font-bold" id={`${props.activityId}-badge-person`}>{props.contactPersons && props.contactPersons.length > 1 ? `${i18Next.t('contactPersons')}: ` : null}
                                <label className="badge badge-person mr-2 mb-0" >{displayNumberOfContactPersons}</label>
                                <TooltipComp 
                                    placement="top" 
                                    target={`${props.activityId}-badge-person`} 
                                    text={`${allPersonNames}`}
                                /> 
                            </span>

    const displayNumberOfContactCompanies = props.contactCompanies && props.contactCompanies.length > 1 ? props.contactCompanies.length : null
    const badgeForCompanies = displayNumberOfContactCompanies !== null
                                ? <span className="font-bold" id={`${props.activityId}-badge-company`}>{props.contactCompanies && props.contactCompanies.length > 1 ? `${i18Next.t('contactCompanies')}: `: null}
                                    <label className="badge badge-company mr-2 mb-0" >{displayNumberOfContactCompanies}</label>
                                    <TooltipComp 
                                        placement="top" 
                                        target={`${props.activityId}-badge-company`} 
                                        text={`${allCompanyNames}`}
                                    /> 
                                  </span>
                                : null

    return (
        <article className="list-item">
            <div className="mr-3 px-2 activity-date">
                <span className="mt-auto">{moment(props.date).format(getDateFormat('sv'))}</span>
                <span className="mb-auto">
                    {props.time === null || props.time === '' ? '' : moment(props.time, 'HH:mm').format('HH:mm')}
                </span>
            </div>
            <div className="mx-3 log-icon py-2">
                {handleIcon()}
            </div>
            <div className="activity-desc py-2">
                <div className="d-flex">
                        {props.contactCompanies && props.contactCompanies.length === 1 
                        ? <Link to={`/contactcompanies/view/${props.contactCompanies[0].id}`}>{props.contactCompanies[0].name}</Link> 
                        : badgeForCompanies
                    }
                    { props.contactPersons && props.contactPersons.length > 0 && props.contactCompanies && props.contactCompanies.length > 0
                        ? ' | '
                        : ''
                    }
                    {props.contactPersons && props.contactPersons.length === 1
                        ? <Link to={`/contactpersons/view/${props.contactPersons[0].id}`}>{props.contactPersons[0].name}</Link>
                        : badgeForPerson
                    }
                </div>
                <div className="pr-2 activity-date-alt">
                    <span className="mt-auto">
                        {moment(props.date).format('DD-MM-YYYY')},
                        {props.time === null || props.time === '' ? '' : moment(props.time, 'HH:mm').format('HH:mm')}
                    </span>
                </div>
                <TextBoxWithLinks className="description-text">{props.description}</TextBoxWithLinks>
            </div>
            <EditIcon id={props.activityId} type={'ACTIVITY'} history={props.history} />
        </article>
    )
}

export default ListItem;
