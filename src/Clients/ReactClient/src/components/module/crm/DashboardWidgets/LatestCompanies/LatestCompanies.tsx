import React, { useState } from 'react';
import { Translation } from 'react-i18next';

import { IBoxContent } from 'components/module/inspinia/IBox/IBox';

import List from './List';
import FilterButtons from '../FilterButtons';

import '../widgets.css';

interface IItemList {
    history: any;
}

export const LatestCompanies = (props: IItemList) => {
    const [filterOnOwn, setFilterOnOwn] = useState(false);

    return (
        <Translation>
            {t => (
                <>
                    <IBoxContent className="p-3 d-flex justify-content-around">
                        <h3 className="m-0">{t('widgetTitles.recentCompanies')}</h3>
                        <FilterButtons
                            isAll={!filterOnOwn}
                            isMine={filterOnOwn}
                            filterOnAll={() => setFilterOnOwn(false)}
                            filterOnMine={() => setFilterOnOwn(true)}
                        />
                    </IBoxContent>
                    <IBoxContent className="widget-container">
                        <List history={props.history} filterOnOwn={filterOnOwn} />
                    </IBoxContent>
                </>
            )}
        </Translation>
    );
};
