/* global $ */

import React from 'react';

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';

import apolloClient from 'apolloClient';
import DataTable from 'components/module/DataTable/DataTable';
import { ConfirmDialog } from 'helpers/module/dialogs';

import { GET_VP_TEMPLATE_BASIC_LIST } from 'graphQL/module/queries/Vp_Template_Basic/getList';
import { DELETE_VP_TEMPLATE_BASIC } from 'graphQL/module/mutations/Vp_Template_Basic/deleteItem';
import { deleteVP_Template_Basic, deleteVP_Template_BasicVariables } from 'graphQL/module/generatedTypes/deleteVP_Template_Basic';

interface IItemListProps {
    items: IItem[],
    history: any,
    location: any,
    match: any,
}

interface IItem {
    vP_Template_BasicId: string,
    title: string,
}

class Vp_Template_BasicList extends React.Component<IItemListProps> {

    public componentDidMount() {
        $('#Vp_Template_Basic-container').on('click', 'button.edit', (e: any) => {
            e.preventDefault();
            const id = $(e.target).closest('.button-section').data('id');
            this.props.history.push(`/Vp_Template_Basic/edit/${id}`);
        })
        $('#Vp_Template_Basic-container').on('click', 'button.delete', (e: any) => {
            const buttonSection = $(e.target).closest('.button-section');
            const id = buttonSection.data('id');
            const title = buttonSection.data('title');
            this.delete(id, title)
        });
    }

    public delete = (id: string, title: string) => {
        ConfirmDialog('Are you sure?').then((result) => {
            if (result.value) {
                apolloClient.mutate<deleteVP_Template_Basic, deleteVP_Template_BasicVariables>({
                    mutation: DELETE_VP_TEMPLATE_BASIC,
                    refetchQueries: [{ query: GET_VP_TEMPLATE_BASIC_LIST }],
                    variables: { id }
                }).then(response => {
                    if (response.errors) {
                        console.log(response)
                        response.errors.forEach((error: any) => {
                            toast.error(error.message)
                        });
                    }
                    else {
                        toast.info(`${title} deleted`)
                    }
                }).catch((response) => {
                    console.error(response);

                    toast.error('Server error')
                })
            }
        })
    }

    public render() {
        return (
            <div id="Vp_Template_Basic-container">
                <DataTable
                    headers={['Title', '']}
                    config={{
                        columnDefs: COLUMN_DEFS,
                        data: this.props.items,
                        fixedHeader: false,
                        language: {
                            search: '',
                            searchPlaceholder: 'Search',
                        },
                        order: [[0, 'asc']],
                    }}
                />
            </div>
        );
    }
}

const COLUMN_DEFS = [
    {
        data: 'title',
        responsivePriority: 1,
        targets: 0,
    },
    {
        render: (data: any, type: any, row: any, meta: any) => {
            return `
            <div class="button-section" style="width: 120px" data-id="${row.vP_Template_BasicId}" data-title="${row.title}">
                <button class="btn btn-xs btn-primary edit"><i class="fa fa-pen mr-1"></i>Edit</button>
                <button class="btn btn-xs btn-danger delete"><i class="fa fa-trash mr-1"></i>Delete</button>
            </div>`;
        },
        sortable: false,
        targets: 1,
        width: '1px',
    },
]

export default withRouter<IItemListProps>(Vp_Template_BasicList);
