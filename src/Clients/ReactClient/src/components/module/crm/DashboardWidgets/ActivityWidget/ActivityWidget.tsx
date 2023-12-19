import React, { useState } from 'react';
import { Translation } from 'react-i18next';

import { IBoxContent } from 'components/module/inspinia/IBox/IBox';

import List from './List';
import FilterButtons from '../FilterButtons';

import '../widgets.css';

interface IActivityItems {
    history: any;
    mode: ActivityWidgetMode;
}

export type ActivityWidgetMode = 'history' | 'upcoming';

export const ActivityWidget = (props: IActivityItems) => {
    const [filterOnOwn, setFilterOnOwn] = useState(false);

    return (
        <Translation>
            {t => (
                <>
                    <IBoxContent className="p-3 d-flex justify-content-around">
                        <h3 className="m-0">
                            {props.mode === 'history'
                                ? t('widgetTitles.activityLog')
                                : t('widgetTitles.upcomingActivities')}
                        </h3>
                        <FilterButtons
                            isAll={!filterOnOwn}
                            isMine={filterOnOwn}
                            filterOnAll={() => setFilterOnOwn(false)}
                            filterOnMine={() => setFilterOnOwn(true)}
                        />
                    </IBoxContent>
                    <IBoxContent className="widget-container-activities mb-3">
                        <List history={props.history} filterOnOwn={filterOnOwn} mode={props.mode} />
                    </IBoxContent>
                </>
            )}
        </Translation>
    );
};
