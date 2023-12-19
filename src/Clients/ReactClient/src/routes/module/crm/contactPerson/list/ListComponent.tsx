/* global $ */

import React from 'react';
import  { Translation } from 'react-i18next';
import i18next from 'i18next';

import IBox from 'components/module/inspinia/IBox/templates/IBox-template-basic';
import DataTable, { truncate } from 'components/module/crm/DataTable/DataTable';

interface IItem {
    firstName: string,
    isUserFavorite: boolean | null,
    contactCompany: { contactCompanyId: string } | null,
    createdUtc: string
}

interface IItemList {
    contactPersons: IItem[],
    setFavorite(id: string, isFavorite: boolean, onError?: () => void): void
    delete(id: string, onSuccess?: () => void): void
    applyDataTableFilter(): void
    history: any
}

class List extends React.Component<IItemList, any> {

    public componentDidMount() {
        this.props.applyDataTableFilter();
        $('#person-table-container').on('click', '.badge',(e: any) => {
            e.preventDefault();
            const state = {
                contactPersonId: $(e.target).data('id'),
                contactPersonName: $(e.target).data('name')
            };
            setTimeout(() => {
                this.props.history.push('/activities/list', { ...state })
            }, 200)
        })

        $('#person-table-container').on('click', '.new-activity', (e: any) => {
            e.preventDefault();
            const state = { companyId: $(e.target).data('company'), personId: $(e.target).data('id') }
            this.props.history.push('/activities/new', { ...state })
        })
        $('#person-table-container').on('click', '.edit-person', (e: any) => {
            e.preventDefault();
            this.props.history.push(`/contactpersons/edit/${($(e.target).data('id'))}`)
        })
        $('#person-table-container').on('click', '.remove-person', (e: any) => {
            this.deletePerson($(e.target).data('id'), $(e.target).closest('tr'))
        });
        $('#person-table-container').on('click', '.ibox-star', (e: any) => {
            this.favorize($(e.target).data('id'), $(e.target).closest('tr'), true)
        });
        $('#person-table-container').on('click', '.ibox-star-active', (e: any) => {
            this.favorize($(e.target).data('id'), $(e.target).closest('tr'), false)
        });
    }

    public deletePerson = (id: string, node: any) => {
        this.props.delete(id, () => {
            const table = $('#person-table-container table').DataTable();
            table.row(node).remove();
            table.draw(false);
        });
    }

    public favorize = (id: string, node: any, isFavorite: boolean) => {
        const table = $('#person-table-container table').DataTable();
        const row = table.row(node);
        (row.data() as any).isUserFavorite = isFavorite;
        row.invalidate().draw(false);
        
        this.props.setFavorite(id, isFavorite, () => {
            (row.data() as any).isUserFavorite = !isFavorite;
            row.invalidate().draw(false);
        })
    }
    
    public render() {
        return (
            <Translation>
                {(t) => 
                    <>
                        <IBox >
                            <div id="person-table-container">
                                <DataTable
                                    headers={t('dataTable.headersPerson').split(',')}
                                    config={{
                                        columnDefs: COLUMN_DEFS,
                                        data: this.props.contactPersons,
                                        fixedHeader: false,
                                        language: {
                                            paginate: {
                                                first: t('dataTable.paginateFirst'),
                                                last: t('dataTable.paginateLast'),
                                                next: t('dataTable.paginateNext'),
                                                previous: t('dataTable.paginatePrevious')
                                            },
                                            info: t('dataTable.info'),
                                            search: "",
                                            searchPlaceholder: t('placeholders.Search'),
                                            zeroRecords: t('dataTable.zeroRecords'),
                                            lengthMenu: t('dataTable.lengthMenu')
                                        },
                                        order: [[1, 'asc']],
                                    }}
                                />
                            </div>
                        </IBox>
                    </>
                }
            </Translation>
        );
    }
}

const buttonColumnWidth = '90';
const COLUMN_DEFS = [
    {
        data: 'isUserFavorite',
        render: (data: any, type: any, row: any, meta: any) => {
            if ( type === 'sort') {
                return data === true ? 1 : 2;
            }

            if (data === false) {
                return `<i data-id="${row.contactPersonId}" data-name="${row.firstName}" class="fa fa-star ibox-star my-0 mx-auto"><span class="d-none">${data}</span></i>`
            }
            else {
                return `<i data-id="${row.contactPersonId}" data-name="${row.firstName}" class="fa fa-star ibox-star-active my-0 mx-auto"><span class="d-none">${data}</span></i>`
            }
        },
        responsivePriority: 1,
        targets: 0,
        width: '20px',
    },
    {
        data: "firstName",
        render: (data: any, type: any, row: any) => {
            return `<a class="view-person" href="/contactpersons/view/${row.contactPersonId}" data-id="${row.contactPersonId}">${row.firstName} ${row.lastName}</a><i class="fas fa-info-circle show-tooltip" data-toggle="tooltip" data-placement="top" title="${i18next.t('dataTable.openTab')}"></i>`
        },
        responsivePriority: 1,
        targets: 1,
        width: '250px',
    },
    {
        data: 'title',
        render: (data: any) => {
            return data
        },
        responsivePriority: 2,
        targets: 2,
        width: '150px',
    },
    {
        render: (data: any, type: any, row: any) => {
            return row.contactCompany ? `<a class="view-company" href="/contactcompanies/view/${row.contactCompany.contactCompanyId}" data-id="${row.contactCompany.contactCompanyId}">${row.contactCompany.name}</a> <i class="fas fa-info-circle show-tooltip" data-toggle="tooltip" data-placement="top" title="${i18next.t('dataTable.openTab')}"></i>` : ''
        },
        responsivePriority: 2,
        targets: 3,
        width: '180px',
    },
    {
        data: 'tags',
        render: (data: any) => {
            let tags;
            tags = data.map(((tag: string) => {
                return `<span>#${tag}</span>`
            })
            )
            tags = tags.join(' ')
            return tags ? truncate(tags) : ''
        },
        responsivePriority: 1,
        targets: 4,
        width: '180px',
    },
    {
        data: 'createdUtc',
        responsivePriority: 1,
        targets: 5,
        width: '180px',
    },
    {
        data: "activityCount",
        render: (data: any, type: any, row: any) => {
            return row.activityCount > 0
                ? `<label class="badge badge-activity ml-2 mb-0" data-name="${row.firstName} ${row.lastName}" data-id="${row.contactPersonId}">${row.activityCount}</label>`
                : '';
        },
        responsivePriority: 1,
        targets: 6,
        width: '90px',
    },
    {
        render: (data: any, type: any, row: any, meta: any) => {
            return `
            <div class="button-section">
                <i data-id="${row.contactPersonId}" data-company="${row.contactCompany ? row.contactCompany.contactCompanyId : null}" class="fas fa-calendar-plus new-activity ml-auto mr-0"></i>
                <i data-id="${row.contactPersonId}" class="fa fa-pen edit-person ml-1 mr-0"></i>
                <i data-id="${row.contactPersonId}" data-name="${row.firstName} ${row.lastName}" class="fa fa-trash remove-person ml-1 mr-0"></i>
            </div>`;
        },
        sortable: false,
        targets: 7,
        width: buttonColumnWidth,
    },
]

export default List;
