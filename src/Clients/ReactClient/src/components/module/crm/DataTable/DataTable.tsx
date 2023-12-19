/* global $ */

import React from 'react';
import { findDOMNode } from 'react-dom';

import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-fixedheader-bs4';
import 'datatables.net-fixedheader-bs4/css/fixedHeader.bootstrap4.min.css';
import 'datatables.net-responsive-bs4';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';

import './dataTables.css';

const tableDomLayout =
    "<'row'<'col-sm-12 col-md-6 multiple-items'lf><'col-sm-12 col-md-6'>>" +
    "<'row'<'col-sm-12'tr>>" +
    "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";

interface IDataTableProps {
    headers: string[],
    config?: DataTables.Settings 
}

class DataTable extends React.Component<IDataTableProps, any> {
    public tableRef: React.RefObject<HTMLTableElement> = React.createRef();
    public dataTable: any;

    public componentDidMount() {
        if (this.tableRef.current === null) {
            return;
        }

        const table = findDOMNode(this.tableRef.current) as Element;
        this.dataTable = $(table).DataTable({
            autoWidth: false,
            dom: tableDomLayout,
            fixedHeader: true,
            language: {
                processing: '<i>processing</i>'
            },
            lengthMenu: [25, 50, 100],
            processing: true,
            responsive: true,
            ...this.props.config
        });
        
        ($('[data-toggle="tooltip"]') as any).tooltip({
            container: 'body',
            html: true,
        });
    }

    public shouldComponentUpdate(nextProps: IDataTableProps, nextState: any) {
        this.dataTable.clear();

        if (nextProps.config && nextProps.config.data && nextProps.config.data.length > 0) {
            this.dataTable.rows.add(nextProps.config.data);    
        }
        
        this.dataTable.rows().draw();

        this.dataTable.responsive.recalc();

        ($('[data-toggle="tooltip"]') as any).tooltip({
            container: 'body',
            html: true,
        });

        return false;
    }

    public render() {
        const headers = this.props.headers.map((header: string) => <th key={header}>{header}</th>)

        return (
            <>
                {this.props.children}
                <div className="dataTables-container">
                    <table ref={this.tableRef} className="table table-striped table-hover">
                        <thead>
                            <tr>
                                {headers}
                            </tr>
                        </thead>
                    </table>
                </div>
            </>
        )
    }
}

export function truncate(data: string) {
    if (data) {
        let html = '<div class="truncate" data-toggle="tooltip" data-placement="top" title="' + data + '">';
        html += '<div class="truncated">' + data + '</div>';
        html += '</div>';
        return html;
    }

    return '';
}

export default DataTable