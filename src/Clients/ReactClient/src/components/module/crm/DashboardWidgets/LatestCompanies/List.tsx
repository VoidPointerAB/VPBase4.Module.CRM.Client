import React from 'react';
import { Query } from 'react-apollo';
import { Translation } from 'react-i18next';

import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import NoData from 'components/module/NoData/NoData';

import { GET_DASHBOARD_COMPANIES } from 'graphQL/module/crm/queries/contactCompany/getCompaniesWidget';
import {
  getDashboardCompanies,
  getDashboardCompaniesVariables,
} from 'graphQL/module/crm/generatedTypes/getDashboardCompanies';

import ListItem, { ICompanyItem } from './ListItem';

interface IItemList {
    history: any;
    filterOnOwn: boolean;
}

const List = (props: IItemList) => (
    <Translation>
        {t => (
            <Query<getDashboardCompanies, getDashboardCompaniesVariables>
                query={GET_DASHBOARD_COMPANIES}
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

                    const listItems = data.dashboardContactCompanies
                        ? data.dashboardContactCompanies.map((company: ICompanyItem) => (
                              <ListItem
                                  key={company.contactCompanyId}
                                  {...company}
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
                                    ? t('noData.notCreatedAnyEntry', { type: 'contact companies' })
                                    : t('noData.notCreatedAnyEntryAtAll', {
                                          type: 'contact companies',
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
