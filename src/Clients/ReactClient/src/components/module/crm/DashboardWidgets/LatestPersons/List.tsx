import React from 'react';
import { Query } from 'react-apollo';
import { Translation } from 'react-i18next';

import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import NoData from 'components/module/NoData/NoData';

import { GET_DASHBOARD_PERSONS } from 'graphQL/module/crm/queries/contactPerson/getPersonsWidget';
import {
    getDashboardPersons,
    getDashboardPersonsVariables,
} from 'graphQL/module/crm/generatedTypes/getDashboardPersons';

import ListItem, { IPersonItem } from './ListItem';

interface IItemList {
    history: any;
    filterOnOwn: boolean;
}

const List = (props: IItemList) => (
    <Translation>
        {t => (
            <Query<getDashboardPersons, getDashboardPersonsVariables>
                query={GET_DASHBOARD_PERSONS}
                variables={{ filterOnOwn: props.filterOnOwn }}
            >
                {({ loading, error, data }) => {
                    const queryPreData = queryPreDataHandler({ loading, error, data });
                    if (queryPreData) {
                        return queryPreData;
                    }

                    if (!data) {
                        return null;
                    }

                    const listItems = data.dashboardContactPersons
                        ? data.dashboardContactPersons.map((person: IPersonItem) => (
                              <ListItem
                                  key={person.contactPersonId}
                                  {...person}
                                  history={props.history}
                              />
                          ))
                        : [];

                    return listItems.length ? (
                        <section className="list-container">{listItems}</section>
                    ) : (
                        <NoData
                            message={
                                props.filterOnOwn
                                    ? t('noData.notCreatedAnyEntry', {
                                          type: 'contact persons',
                                      })
                                    : t('noData.notCreatedAnyEntryAtAll', {
                                          type: 'contact persons',
                                      })
                            }
                        />
                    );
                }}
            </Query>
        )}
    </Translation>
);

export default List;
