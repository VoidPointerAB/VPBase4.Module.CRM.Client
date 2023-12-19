import React from 'react';
import { Translation } from 'react-i18next';

import AddIcon from 'components/module/crm/icons/AddIcon';
import { IBox, IBoxContent } from 'components/module/inspinia/IBox/IBox';
import { activityDateTimeDescSort } from 'helpers/module/crm/sorters'

import NoData from './NoData';
import ListItem from './DashboardWidgets/ActivityWidget/ListItem';
import {IContactCompanies, IContactPersons} from 'routes/module/crm/contactCompany/sharedItems/types';

export interface IActivity {
    date: string;
    description: string | null;
    time: any;
    createdUtc: any,
    contactCompanies: IContactCompanies[] | null,
    contactPersons: IContactPersons[] | null,
    activityId: string;
    type: 'MEETING' | 'EMAIL' | 'OTHER' | 'NOTE' | 'PHONE';
}

interface IActivityPersonProps {
    activities: IActivity[] | null;
    history: any;
    personId?: string | null;
    companyId?: string | null;
}

const Activities = (props: IActivityPersonProps) => {
    const activities = props.activities === null ? [] : props.activities;
    activities.sort(activityDateTimeDescSort)

    const activityItems = activities.length > 0
    ? activities.map((activity: IActivity) => {
        return <ListItem key={activity.activityId} {...activity} history={props.history} />
        })
    : <NoData />

    return (
        <Translation>
            {(t) =>
                <IBox className="d-flex flex-column">
                    <IBoxContent className={`contact-company-activities-list `}>
                        <h3 className="m-0">{t('activities')}</h3>
                        <AddIcon
                            personId={props.personId}
                            companyId={props.companyId}
                            history={props.history}
                            type={'ACTIVITY'}
                            icon={'calendar-plus'}
                        />
                    </IBoxContent>
                    <IBoxContent className={`activities-container text-center `}>{activityItems}</IBoxContent>
                </IBox>
            }
        </Translation>
        
    );
};

export default Activities;
