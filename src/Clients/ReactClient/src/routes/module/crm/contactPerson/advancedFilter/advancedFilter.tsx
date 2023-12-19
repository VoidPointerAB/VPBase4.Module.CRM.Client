import React from 'react';

import { SearchTermManager } from 'components/module/crm/SearchTermManager/SearchTermManager';
import { ISearchTerm } from 'components/module/crm/SearchTermManager/TemplateManager/TemplateManager';
import { List } from './List/List';
import { AdvancedFilterEntityEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';

interface IAdvancedFilterProps {}

interface IAdvancedFilterState {
    activeSearchTerms: ISearchTerm[];
}

class AdvancedFilter extends React.Component<IAdvancedFilterProps, IAdvancedFilterState> {
    state = {
        activeSearchTerms: [],
    };

    public loadDataFromFilter = (searchTerms: ISearchTerm[]) => {
        this.setState({ activeSearchTerms: searchTerms });
    };

    public render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <SearchTermManager
                            entityType={AdvancedFilterEntityEnum.ContactPerson}
                            activeSearchTerms={this.state.activeSearchTerms}
                            setActiveSearchTerms={this.loadDataFromFilter}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <List searchTerms={this.state.activeSearchTerms} />
                    </div>
                </div>
            </div>
        );
    }
}

export default AdvancedFilter;
