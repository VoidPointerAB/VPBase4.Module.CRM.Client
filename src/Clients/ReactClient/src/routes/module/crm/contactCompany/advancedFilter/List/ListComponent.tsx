/* global $ */

import React from 'react';
import { withRouter } from 'react-router';
import { Translation } from 'react-i18next';
import i18next from 'i18next';

import apolloClient from 'apolloClient';

import { ConfirmDialog } from 'helpers/module/dialogs';
import { handleGraphQlErrors, handleGraphQlException } from 'helpers/module/errorManagement';

import IBox from 'components/module/inspinia/IBox/templates/IBox-template-basic';
import DataTable, { truncate, rowIdsGetter } from 'components/module/DataTable/DataTable';
import { ExportTemplateConsumer } from 'components/module/ExportTemplateConsumer/ExportTemplateConsumer';

import { ADD_USER_FAVORITE } from 'graphQL/module/crm/mutations/userFavorite/addUserFavorite';
import { DELETE_USER_FAVORITE } from 'graphQL/module/crm/mutations/userFavorite/deleteUserFavorite';
import { DELETE_CONTACTCOMPANY } from 'graphQL/module/crm/mutations/contactCompany/delete';
import {
    deleteContactCompany,
    deleteContactCompanyVariables,
} from 'graphQL/module/crm/generatedTypes/deleteContactCompany';
import {
    addUserFavorite,
    addUserFavoriteVariables,
} from 'graphQL/module/crm/generatedTypes/addUserFavorite';
import { contactCompanySearch_contactCompanySearch } from 'graphQL/module/crm/generatedTypes/contactCompanySearch';
import { UserFavoriteEntityTypeEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';

interface IItemList {
    list: contactCompanySearch_contactCompanySearch[];
    history: any;
}
class CompanyList extends React.Component<IItemList> {
    public componentDidMount() {
        $('#company-table-container').on('click', '.view-company', (e: any) => {
            e.preventDefault();
            this.props.history.push(`/contactcompanies/view/${$(e.target).data('id')}`);
        });
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
        ConfirmDialog(i18next.t('messages.deleteCompany')).then(result => {
            if (result.value !== true) {
                return;
            }
            apolloClient
                .mutate<deleteContactCompany, deleteContactCompanyVariables>({
                    mutation: DELETE_CONTACTCOMPANY,
                    variables: { id },
                })
                .then(({ errors }: any) => {
                    handleGraphQlErrors(errors, () => {
                        const table = $('#company-table-container table').DataTable();
                        table.row(node).remove();
                        table.draw(false);
                    });
                })
                .catch(errors => handleGraphQlException(errors));
        });
    };

    public favorize = (id: string, node: any, isFavorite: boolean) => {
        const table = $('#company-table-container table').DataTable();
        const row = table.row(node);
        (row.data() as any).isUserFavorite = isFavorite;
        row.invalidate().draw(false);

        const onError = () => {
            (row.data() as any).isUserFavorite = !isFavorite;
            row.invalidate().draw(false);
        };

        apolloClient
            .mutate<addUserFavorite, addUserFavoriteVariables>({
                mutation: isFavorite ? ADD_USER_FAVORITE : DELETE_USER_FAVORITE,
                variables: { id, entityType: UserFavoriteEntityTypeEnum.COMPANY },
            })
            .then(({ errors }: any) => {
                handleGraphQlErrors(errors);

                if (errors && errors.length > 0) {
                    onError();
                }
            })
            .catch((error: any) => {
                handleGraphQlException(error);

                onError();
            });
    };

    public render() {
        return (
            <Translation>
                {t => (
                    <>
                        <IBox>
                            <ExportTemplateConsumer
                                entityType="ContactCompany"
                                entityIdGetter={() => rowIdsGetter('contactCompanyId')}
                                wrapperClassName="mb-3"
                            />
                            <div id="company-table-container">
                                <DataTable
                                    headers={t('dataTable.headersCompany').split(',')}
                                    config={{
                                        columnDefs: COLUMN_DEFS,
                                        data: this.props.list,
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
            return `<a class="view-company" data-id="${row.contactCompanyId}">${data}</a>`;
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
        data: 'postAddress',
        render: (data: any) => {
            return truncate(data);
        },
        responsivePriority: 1,
        targets: 3,
        width: '280px',
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
        targets: 4,
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
        targets: 5,
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
        targets: 6,
        width: buttonColumnWidth,
    },
];

export default withRouter<any>(CompanyList);
