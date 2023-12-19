/* global $ */

import React from 'react';
import { withRouter } from 'react-router';
import { Translation } from 'react-i18next';
import i18next from 'i18next';

import IBox from 'components/module/inspinia/IBox/templates/IBox-template-basic';
import DataTable, { truncate } from 'components/module/crm/DataTable/DataTable';

interface IItem {
    name: string;
    isFavorite: boolean;
    contactCompanyId: string;
    addresses: any;
}
interface IItemList {
    contactCompanyList: IItem[];
    setFavorite(id: string, isFavorite: boolean, onError?: () => void): void;
    delete(id: string, onSuccess?: () => void): void;
    applyDataTableFilter(): void;
    history: any;
}
class CompanyList extends React.Component<IItemList & { history: any }> {
    public componentDidMount() {
        $('#company-table-container').on('click', '.badge-person', (e: any) => {
            e.preventDefault();
            const state = {
                contactCompanyId: $(e.target).data('id'),
                contactCompanyName: $(e.target).data('name'),
            };
            setTimeout(() => {
                this.props.history.push('/contactpersons/list', { ...state });
            }, 200);
        });
        $('#company-table-container').on('click', '.badge-activity', (e: any) => {
            e.preventDefault();
            const state = {
                contactCompanyId: $(e.target).data('id'),
                contactCompanyName: $(e.target).data('name'),
            };
            setTimeout(() => {
                this.props.history.push('/activities/list', { ...state });
            }, 200);
        });
        $('#company-table-container').on('click', '.new-activity', (e: any) => {
            e.preventDefault();
            const state = { companyId: $(e.target).data('id'), personId: null };
            this.props.history.push('/activities/new', { ...state });
        });
        $('#company-table-container').on('click', '.new-person', (e: any) => {
            e.preventDefault();
            this.props.history.push('/contactpersons/new', $(e.target).data('id'));
        });
        $('#company-table-container').on('click', '.edit-company', (e: any) => {
            e.preventDefault();
            this.props.history.push(`/contactcompanies/edit/${$(e.target).data('id')}`);
        });
        $('#company-table-container').on('click', '.remove-company', (e: any) => {
            this.deleteCompany($(e.target).data('id'), $(e.target).closest('tr'));
        });
        $('#company-table-container').on('click', '.ibox-star', (e: any) => {
            this.favorize($(e.target).data('id'), $(e.target).closest('tr'), true);
        });
        $('#company-table-container').on('click', '.ibox-star-active', (e: any) => {
            this.favorize($(e.target).data('id'), $(e.target).closest('tr'), false);
        });
    }

    public deleteCompany = (id: string, node: any) => {
        this.props.delete(id, () => {
            const table = $('#company-table-container table').DataTable();
            table.row(node).remove();
            table.draw(false);
        });
    };

    public favorize = (id: string, node: any, isFavorite: boolean) => {
        const table = $('#company-table-container table').DataTable();
        const row = table.row(node);
        (row.data() as any).isUserFavorite = isFavorite;
        row.invalidate().draw(false);

        this.props.setFavorite(id, isFavorite, () => {
            (row.data() as any).isUserFavorite = !isFavorite;
            row.invalidate().draw(false);
        });
    };

    public render() {
        return (
            <Translation>
                {t => (
                    <>
                        <IBox>
                            <div id="company-table-container">
                                <DataTable
                                    headers={t('dataTable.headersCompany').split(',')}
                                    config={{
                                        columnDefs: COLUMN_DEFS,
                                        data: this.props.contactCompanyList,
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
                                        order: [[1, 'asc']],
                                    }}
                                />
                            </div>
                        </IBox>
                    </>
                )}
            </Translation>
        );
    }
}

const buttonColumnWidth = '150';

const COLUMN_DEFS = [
    {
        data: 'isUserFavorite',
        render: (data: any, type: any, row: any, meta: any) => {
            if ( type === 'sort') {
                return data === true ? 1 : 2;
            }
            
            if (data === false) {
                return `<i data-id="${row.contactCompanyId}" 
                            data-name="${row.name}" 
                            class="fa fa-star ibox-star my-0 mx-auto"><span class="d-none">${data}</span></i>`;
            } else {
                return `<i data-id="${row.contactCompanyId}" 
                        data-name="${row.name}" 
                        class="fa fa-star ibox-star-active my-0 mx-auto"><span class="d-none">${data}</span></i>`;
            }
        },
        responsivePriority: 1,
        targets: 0,
        width: '20px',
    },
    {
        data: 'name',
        render: (data: any, type: any, row: any) => {
            return `<a class="view-company" href="/contactcompanies/view/${row.contactCompanyId}" data-id="${row.contactCompanyId}">${data}</a><i class="fas fa-info-circle show-tooltip" data-toggle="tooltip" data-placement="top" title="${i18next.t('dataTable.openTab')}"></i>`;
        },
        responsivePriority: 1,
        targets: 1,
        width: '250px',
    },
    {
        render: (data: any, type: any, row: any) => {
            return row.contactPersons && row.contactPersons.length > 0
                ? `<label class="badge badge-person ml-2 mb-0" data-name="${data}" data-id="${row.contactCompanyId}">${row.contactPersons.length}</label>`
                : '';
        },
        responsivePriority: 1,
        targets: 2,
        width: '80px',
    },
    {
        data: 'tags',
        render: (data: any) => {
            let tags;
            tags = data.map((tag: string) => {
                return `<span>#${tag}</span>`;
            });
            tags = tags.join(' ');
            return tags ? truncate(tags) : '';
        },
        responsivePriority: 1,
        targets: 3,
        width: '180px',
    },
    {
        data: 'activityCount',
        render: (data: any, type: any, row: any, meta: any) => {
            return row.activityCount > 0
                ? `<label class="badge badge-activity ml-2 mb-0 ml-2" data-name="${row.name}" data-id="${row.contactCompanyId}">${row.activityCount}</label>`
                : '';
        },
        responsivePriority: 1,
        targets: 4,
        width: '90px',
    },
    {
        render: (data: any, type: any, row: any, meta: any) => {
            return `
            <div class="button-section">
                <i data-id="${row.contactCompanyId}" class="fas fa-calendar-plus new-activity ml-auto mr-0"></i>
                <i data-id="${row.contactCompanyId}" class="fas fa-user-plus new-person ml-1 mr-0"></i>
                <i data-id="${row.contactCompanyId}" class="fa fa-pen edit-company ml-1 mr-0"></i>
                <i data-id="${row.contactCompanyId}" data-name="${row.name}" class="fa fa-trash remove-company ml-1 mr-0"></i>
            </div>`;
        },
        sortable: false,
        targets: 5,
        width: buttonColumnWidth,
    },
];

export default withRouter<any>(CompanyList);
