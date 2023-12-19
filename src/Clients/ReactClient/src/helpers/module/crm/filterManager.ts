/* global $ */

class FilterManager {
    private filterName: string;
    private locationKey: string;
    private navigatedFromBreadcrumb: boolean;
    private defaultFilter: any

    private defaultDataTableSelector = '.dataTables-container table';

    constructor(filterName: string, routerLocation: any, defaultFilter: any) {
        this.filterName = filterName;
        this.locationKey = routerLocation.key;
        this.navigatedFromBreadcrumb = routerLocation.state ? routerLocation.state.navigatedFromBreadCrumb : false;
        this.defaultFilter = defaultFilter;
    }

    public getFilter = (): any => {
        let filter = this.defaultFilter;

        const storedFilter = sessionStorage.getItem(this.filterName);
        if (storedFilter) {
            const filterSavedInHistory = sessionStorage.getItem(`${this.filterName}_${this.locationKey}`);

            if (filterSavedInHistory || this.navigatedFromBreadcrumb) {
                filter = JSON.parse(storedFilter);
            }
        }

        return filter;
    }

    public applyDataTableFilter(filter: any, dataTableSelector?: string) {
        if (!filter.dataTableData) {
            return;
        }

        if (!dataTableSelector) {
            dataTableSelector = this.defaultDataTableSelector;
        }

        const table = $(dataTableSelector).DataTable();
        table.search(filter.dataTableData.search);
        table.order(filter.dataTableData.order);
        table.page(filter.dataTableData.page);
        table.page.len(filter.dataTableData.pageLength)
        table.draw(false);
    }

    public updateSessionStorage = (filter: any, includeDataTable?: boolean, dataTableSelector?: string) => {
        if (includeDataTable) {
            this.saveFilterWithDataTableData(filter, dataTableSelector ? dataTableSelector : this.defaultDataTableSelector);
        } else {
            sessionStorage.setItem(this.filterName, JSON.stringify(filter));
        }

        sessionStorage.setItem(`${this.filterName}_${this.locationKey}`, 'set');
    }

    private saveFilterWithDataTableData(filter: any, dataTableSelector: string) {
        const table = $(dataTableSelector).DataTable();
        const dataTableData = {
            search: table.search(),
            order: table.order(),
            page: table.page(),
            pageLength: table.page.len()
        }

        sessionStorage.setItem(this.filterName, JSON.stringify({...filter, dataTableData}));
    }
}

export default FilterManager;