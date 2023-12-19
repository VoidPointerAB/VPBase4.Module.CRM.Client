import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import CreateButton from 'components/module/crm/DashboardWidgets/CreateButton/CreateButton';
import { ActivityWidget } from 'components/module/crm/DashboardWidgets/ActivityWidget/ActivityWidget';
import { LatestCompanies } from 'components/module/crm/DashboardWidgets/LatestCompanies/LatestCompanies';
import { LatestPersons } from 'components/module/crm/DashboardWidgets/LatestPersons/LatestPersons';
import SearchWidget from 'components/module/crm/DashboardWidgets/SearchWidget/SearchWidget';
import { MatchingEntities } from 'components/module/crm/DashboardWidgets/MatchingEntities/composeForMatchingEntities';

import '../crm/gridCSS.css';

interface IDashboardProps extends RouteComponentProps {}

const Dashboard = (props: IDashboardProps) => (
    <div className="wrapper wrapper-content animated fadeInRight grid-container p-0 mb-3">
        <div className="search">
            <SearchWidget history={props.history} />
        </div>
        <div className="matching-e">
            <MatchingEntities />
        </div>
        <div className="latest-a">
            <ActivityWidget history={props.history} mode="upcoming" />
            <ActivityWidget history={props.history} mode="history" />
        </div>
        <div className="latest-p">
            <LatestPersons history={props.history} />
        </div>
        <div className="latest-c">
            <LatestCompanies history={props.history} />
        </div>
        <div className="add">
            <CreateButton />
        </div>
    </div>
);

export default Dashboard;
