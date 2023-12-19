import React from 'react';
import { Translation } from 'react-i18next';

export interface IFilterButtonsProps {
    isAll: boolean,
    isMine: boolean,
    filterOnAll(): void,
    filterOnMine(): void
}

class FilterButtons extends React.Component<IFilterButtonsProps> {

    public render() {
        return (
            <Translation>
                {(t) => 
                    <>
                        <button 
                            className={ this.props.isAll 
                                ? "ml-auto all-filter-btn all-filter-btn-border active" 
                                : "ml-auto all-filter-btn all-filter-btn-border" }   
                            name="allFilter" 
                            onClick={this.props.filterOnAll}>
                            {t("filterButtons.All")}
                        </button>
                        <button 
                            className={ this.props.isMine 
                                ? " all-filter-btn active" 
                                : " all-filter-btn " }   
                            type="button"
                            onClick={this.props.filterOnMine} 
                            name="mineFilter">
                            {t("filterButtons.Mine")}
                        </button>
                    </>
                }
            </Translation>
        )
    }
}

export default FilterButtons;