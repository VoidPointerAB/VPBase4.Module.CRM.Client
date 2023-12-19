import React from 'react';
import { Query } from 'react-apollo';
import { Translation } from 'react-i18next';
import moment from 'moment';

import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import NoData from 'components/module/NoData/NoData';

import { GET_DASHBOARD_ACTIVITIES } from 'graphQL/module/crm/queries/activities/getActivityWidget';
import {
    getDashboardActivities,
    getDashboardActivitiesVariables,
} from 'graphQL/module/crm/generatedTypes/getDashboardActivities';

import ListItem, { IActivityItem } from './ListItem';
import { ActivityWidgetMode } from './ActivityWidget';

interface IActivityItems {
    history: any;
    filterOnOwn: boolean;
    mode: ActivityWidgetMode;
}

const List = (props: IActivityItems) => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm');

    return (
        <Translation>
            {t => (
                <Query<getDashboardActivities, getDashboardActivitiesVariables>
                    query={GET_DASHBOARD_ACTIVITIES}
                    variables={{
                        filterOnOwn: props.filterOnOwn,
                        referenceDateTime: currentTime,
                        showUpcoming: props.mode === 'upcoming',
                    }}
                >
                    {({ loading, error, data }) => {
                        const queryPreData = queryPreDataHandler({ loading, error, data });
                        if (queryPreData) {
                            return queryPreData;
                        }

                        if (!data) {
                            return null;
                        }

                        const listItems = data.dashboardActivities
                            ? data.dashboardActivities.map((activity: IActivityItem) => (
                                  <ListItem
                                      key={activity.activityId}
                                      {...activity}
                                      history={props.history}
                                  />
                              ))
                            : [];

                        return listItems.length ? (
                            <section className="list-container activities">{listItems}</section>
                        ) : (
                            <NoData
                                message={
                                    props.filterOnOwn
                                        ? t('noData.notCreatedAnyEntry', {
                                              type:
                                                  props.mode === 'upcoming'
                                                      ? 'upcoming activites'
                                                      : 'activities',
                                          })
                                        : t('noData.notCreatedAnyEntryAtAll', {
                                              type:
                                                  props.mode === 'upcoming'
                                                      ? 'upcoming activites'
                                                      : 'activities',
                                          })
                                }
                            />
                        );
                    }}
                </Query>
            )}
        </Translation>
    );
};

export default List;
