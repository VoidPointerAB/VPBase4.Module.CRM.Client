import React from 'react';
import { Translation } from 'react-i18next';
import { toast } from 'react-toastify';
import i18next from 'i18next';

import apolloClient from 'apolloClient';
import SearchResultItem from './SearchResultItem';
import { SpinnerBounce } from 'components/module/Spinners/Spinner';
import { GET_SEARCH_RESULTS }from 'graphQL/module/crm/queries/contactCompany/search'
import { search, searchVariables, search_search } from 'graphQL/module/crm/generatedTypes/search';

import '../widgets.css';

interface ISearchWidgetProps {
    history: any
}

interface ISearchResult {
    entityId: string,
    entityName: string,
    entityType: 'CONTACTPERSON' | 'CONTACTCOMPANY'
}

interface IState {
    isSearchMenyOpen: boolean,
    searchQuery: string,
    searchResult: (search_search | null)[] | null
}

class SearchWidget extends React.Component<ISearchWidgetProps, IState> {
    public spinner: any = '';
    public delayQuery: any;

    public state = {
        isSearchMenyOpen: false,
        searchQuery: '',
        searchResult: [],
    };

    public onSearch = (text: string) => {
        apolloClient.query<search, searchVariables>({
            query: GET_SEARCH_RESULTS,
            variables: { text, limit: 5 }
        }).then(({data} ) => {
            const searchResponse = data.search
            this.setState({ searchResult: searchResponse })
        }).catch((res: any) => {
            console.warn(res)
            return toast.error(i18next.t('messages.serverError'))
        });
    }

    public updateSearch = (event: any) => {
        this.setState({ searchQuery: event.target.value, searchResult: [] })
        this.spinner = <SpinnerBounce />
        clearTimeout(this.delayQuery)
        this.delayQuery = setTimeout(() => {
            this.spinner = null
            this.onSearch(this.state.searchQuery)
        }, 1000);
    }
    
    public restorSearchBar = () => { this.setState({ searchQuery: '', searchResult: [] }) }
    
    public componentWillUnmount() {
        clearTimeout(this.delayQuery)
    }

    public render() {
        const searchResultsItems = this.state.searchResult.map((result: ISearchResult) => 
            <SearchResultItem 
                key={result.entityId} 
                entityId={result.entityId} 
                entityName={result.entityName} 
                entityType={result.entityType} 
                history={this.props.history} 
            />
        );
        
        const spinner = this.spinner
        const check = this.state.searchResult.length <= 0 && this.spinner === null;
        const noMatch: string = check ? i18next.t('noMatch.search') : '';
        const searchResults = <ul>{searchResultsItems}</ul>

        return (
            <Translation>
                {(t) =>
                <section className="search-body mb-0">
                    <div className="search-bar p-4">
                        <input type="text" name="name" placeholder={t('placeholders.Search')} autoComplete="off" value={this.state.searchQuery} onChange={this.updateSearch} />
                        {this.state.searchQuery !== '' ? <span className="clear-search" onClick={this.restorSearchBar} /> : null}
                    </div>
                    <section className={this.state.searchQuery !== '' ? 'search-result-container px-0' : 'd-none'}>
                        <div className={`search-result font-weight-normal ${noMatch === '' ? '' : 'p-3'}`}>
                            {spinner}
                            {check ? noMatch : searchResults}
                        </div>
                    </section>
                </section>
                }
            </Translation>
        )
    }
}

export default SearchWidget;