/* global $ */

import React from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translation } from 'react-i18next';
import i18next from 'i18next';

import apolloClient from 'apolloClient';

import { ConfirmDialog } from 'helpers/module/dialogs';
import { handleGraphQlErrors, handleGraphQlException } from 'helpers/module/crm/errorManagement';

import IBox from 'components/module/inspinia/IBox/templates/IBox-template-basic';
import DataTable, { truncate } from 'components/module/crm/DataTable/DataTable';

import { DELETE_ACTIVITY } from 'graphQL/module/crm/mutations/activities/delete';
import {
    deleteActivity,
    deleteActivityVariables,
} from 'graphQL/module/crm/generatedTypes/deleteActivity';

export interface IActivityItem {
    activityId: string;
    contactCompanies: {
        id: string;
        name: string;
    }[];
    contactPersons: {
        id: string;
        name: string;
    }[];
    description: string | null;
    type: {
        display: any;
        sort: any;
    };
    createdUtc: string;
    date: string | null;
    time: string | null;
}
export interface ICompany {
    name: string;
    contactCompanyId: string;
}
export interface IPerson {
    firstName: string | null;
    lastName: string | null;
    contactPersonId: string;
}
interface IActivityItemList {
    activities: IActivityItem[];
    location: any;
    history: any;
    applyDataTableFilter(): void;
}

class List extends React.Component<IActivityItemList, any> {
    public componentDidMount() {
        this.props.applyDataTableFilter();

        $('#activity-table-container').on('click', '.remove-activity', (e: any) => {
            e.preventDefault();
            this.deleteActivity($(e.target).data('id'));
        });
        $('#activity-table-container').on('click', '.edit-activity', (e: any) => {
            e.preventDefault();
            this.props.history.push(`/activities/edit/${$(e.target).data('id')}`);
        });
        $('#activity-table-container').on('click', 'label.badge-for-person', () => {
            $('span.badge-names').toggle();
        });
        $('#activity-table-container').on('click', 'label.badge-for-company', () => {
            $('span.companies').toggle();
        });
    }

    public deleteActivity = (id: string) => {
        ConfirmDialog(i18next.t('messages.deleteActivity')).then((result: any) => {
            if (result.value !== true) {
                return;
            }
            apolloClient
                .mutate<deleteActivity, deleteActivityVariables>({
                    mutation: DELETE_ACTIVITY,
                    variables: { id },
                })
                .then(({ errors }: any) => {
                    handleGraphQlErrors(errors, () => {
                        toast.info(() => (
                            <>
                                <FontAwesomeIcon
                                    icon="check-circle"
                                    size="1x"
                                    className="ml-2 mr-3"
                                />{' '}
                                {i18next.t('messages.deletedActivity')}
                            </>
                        ));
                    });
                })
                .catch(errors => handleGraphQlException(errors));
        });
    };

    public toggleSmallScreenContent = () =>
        this.setState((prevState: any) => ({ isToggled: !prevState.isToggled }));

    public createNew = () => this.props.history.push('/activities/new');

    public render() {
        return (
            <Translation>
                {t => (
                    <IBox>
                        <div id="activity-table-container">
                            <DataTable
                                headers={[
                                    'Activity',
                                    'Date',
                                    'Time',
                                    'Persons',
                                    'Companies',
                                    'Description',
                                    '',
                                ]}
                                config={{
                                    columnDefs: COLUMN_DEFS,
                                    data: this.props.activities,
                                    fixedHeader: false,
                                    language: {
                                        paginate: {
                                            first: t('dataTable.paginateFirst'),
                                            last: t('dataTable.paginateLast'),
                                            next: t('dataTable.paginateNext'),
                                            previous: t('dataTable.paginatePrevious'),
                                        },
                                        info: t('dataTable.info'),
                                        search: '',
                                        searchPlaceholder: t('placeholders.Search'),
                                        zeroRecords: t('dataTable.zeroRecords'),
                                        lengthMenu: t('dataTable.lengthMenu'),
                                    },
                                    drawCallback: () => {
                                        ($('[data-toggle="tooltip"]') as any).tooltip({
                                            container: 'body',
                                            html: true,
                                        });
                                    },
                                    order: [[1, 'desc'], [2, 'desc']],
                                }}
                            />
                        </div>
                    </IBox>
                )}
            </Translation>
        );
    }
}

const buttonColumnWidth = '90';
const COLUMN_DEFS = [
    {
        data: 'type',
        render: {
            _: 'display',
            sort: 'sort',
        },
        responsivePriority: 1,
        targets: 0,
        width: '100px',
    },
    {
        data: 'date',
        render: (data: any, type: any, row: any) => {
            return data;
        },
        responsivePriority: 1,
        targets: 1,
        width: '100px',
    },
    {
        data: 'time',
        responsivePriority: 2,
        targets: 2,
        width: '100px',
    },
    {
        render: (data: any, type: any, row: any) => {
            const displayNames = row.contactPersons.map((person: { id: string; name: string }) =>
                person ? ` ${person.name}` : ''
            );

            const displayNumberOfContactPersons =
                row.contactPersons.length > 1 ? row.contactPersons.length : null;

            const badgeForPerson =
                displayNumberOfContactPersons !== null
                    ? ` <div class="truncate" data-toggle="tooltip" data-placement="top" title="${displayNames}">
                            <span class="font-bold">${
                                row.contactPersons.length > 1
                                    ? i18next.t('dataTable.contactPersons')
                                    : null
                            }
                                <label class="badge badge-person badge-for-person mr-2 mb-0" >${displayNumberOfContactPersons}</label>
                            </span>
                            <span class="badge-names d-lg-none" style="display: block">${displayNames}</span>
                        </div>
                    `
                    : '';

            return row.contactPersons.length === 1
                ? `<a class="view-person" href="/contactpersons/view/${row.contactPersons[0].id}" data-id="${row.contactPersons[0].id}">${row.contactPersons[0].name}</a><i class="fas fa-info-circle show-tooltip" data-toggle="tooltip" data-placement="top" title="${i18next.t('dataTable.openTab')}"></i>`
                : badgeForPerson;
        },
        responsivePriority: 2,
        targets: 3,
        width: '200px',
    },
    {
        render: (data: any, type: any, row: any) => {
            const displayNumberOfContactCompanies =
                row.contactCompanies.length > 1 ? row.contactCompanies.length : null;
            const displayNames = row.contactCompanies.map((company: { id: string; name: string }) =>
                company ? ` ${company.name}` : ''
            );
            const badgeForCompanies =
                displayNumberOfContactCompanies !== null
                    ? ` <div class="truncate" data-toggle="tooltip" data-placement="top" title="${displayNames}">
                            <span class="font-bold">${
                                row.contactCompanies.length > 1
                                    ? i18next.t('dataTable.contactCompanies')
                                    : null
                            }
                                <label class="badge badge-company badge-for-company mr-2 mb-0" >${displayNumberOfContactCompanies}</label>
                            </span>
                            <span class="companies d-lg-none" style="display: block">${displayNames}</span>
                        </div>
                        `
                    : '';
            return row.contactCompanies.length === 1
                ? `<a class="view-company" href="/contactcompanies/view/${row.contactCompanies[0].id}" data-id="${row.contactCompanies[0].id}">${row.contactCompanies[0].name}</a><i class="fas fa-info-circle show-tooltip" data-toggle="tooltip" data-placement="top" title="${i18next.t('dataTable.openTab')}"></i>`
                : badgeForCompanies;
        },
        responsivePriority: 2,
        targets: 4,
        width: '200px',
    },
    {
        data: 'description',
        render: (data: any) => {
            return data ? truncate(data) : '';
        },
        responsivePriority: 1,
        targets: 5,
        width: '180px',
    },
    {
        render: (data: any, type: any, row: any, meta: any) => {
            return `
            <div class="button-section">
                <i data-id="${row.activityId}" class="fa fa-pen ml-auto mr-0 edit-activity"></i>
                <i data-id="${row.activityId}" class="fa fa-trash ml-1 mr-0 remove-activity"></i>
            </div>`;
        },
        sortable: false,
        targets: 6,
        width: buttonColumnWidth,
    },
];

export default List;
