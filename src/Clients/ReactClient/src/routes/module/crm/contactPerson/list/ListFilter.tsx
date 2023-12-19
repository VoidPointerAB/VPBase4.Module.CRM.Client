import React from 'react';
import { Translation } from 'react-i18next';
import { IListFilter } from './list';

import { ViewTools } from 'components/module/crm/ViewTools/ViewTools';
import { ViewTool } from 'components/module/crm/ViewTools/ViewTool';
import { ExportTemplateConsumer } from 'components/module/ExportTemplateConsumer/ExportTemplateConsumer';
import { rowIdsGetter } from 'components/module/DataTable/DataTable';

interface IListFilterProps {
    history: any;
    filter: IListFilter;
    useCardView: boolean;
    filterUpdater(filter: IListFilter): void;
    toggleUseCardView(): void;
}

export const ListFilter = (props: IListFilterProps) => {
    const filterChanged = (value: any, name: string) => {
        const filter: any = { ...props.filter };
        filter[name] = value;

        props.filterUpdater(filter);
    };

    return (
        <Translation>
            {t => (
                <div className="ibox-content d-flex d-flex-row mb-3">
                    <ViewTools className="mr-3 pr-3 border-right">
                        <ViewTool
                            icon="plus"
                            tooltip="Add new contact person"
                            onClick={() => props.history.push('/contactpersons/new')}
                        />
                        {/* <ViewTool
                            icon={props.useCardView ? 'th-list' : 'th-large'}
                            tooltip={`Display as ${props.useCardView ? 'list' : 'cards'}`}
                            onClick={props.toggleUseCardView}
                        /> */}
                        <ViewTool
                            icon="filter"
                            tooltip="Advanced filter"
                            onClick={() => props.history.push('/contactpersons/advancedfilter')}
                        />
                        <ExportTemplateConsumer
                            entityType={'ContactPerson'}
                            entityIdGetter={() => rowIdsGetter('contactPersonId')}
                        >
                            <ViewTool icon="download" tooltip="Export" />
                        </ExportTemplateConsumer>
                    </ViewTools>
                    <div className="btn-group">
                        <button
                            className={`btn btn-${
                                props.filter.type === 'ALL' ? 'primary' : 'white'
                            }`}
                            type="button"
                            onClick={() => filterChanged('ALL', 'type')}
                        >
                            All
                        </button>
                        <button
                            className={`btn btn-${
                                props.filter.type === 'FAVORITES' ? 'primary' : 'white'
                            }`}
                            type="button"
                            onClick={() => filterChanged('FAVORITES', 'type')}
                        >
                            Favorites
                        </button>
                        {props.filter.type === 'CONTACT_COMPANY' && (
                            <button className="btn btn-primary" type="button">
                                Company
                            </button>
                        )}
                    </div>
                </div>
            )}
        </Translation>
    );
};
