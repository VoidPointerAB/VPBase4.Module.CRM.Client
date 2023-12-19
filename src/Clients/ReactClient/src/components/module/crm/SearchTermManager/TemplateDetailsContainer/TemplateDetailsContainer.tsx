import React from 'react';

import _ from 'lodash';

import {
    AvailableConditions,
    IAvailableConditionItem,
} from '../AvailableConditions/AvailableConditions';
import { ICondition, ISearchTerm } from '../TemplateManager/TemplateManager';
import { ConditionEditor } from '../ConditionEditor/ConditionEditor';
import { TemplateNameEditor } from '../TemplateNameEditor/TemplateNameEditor';

interface ITemplateDetailsContainerProps {
    currentTemplateId: string | null;
    currentTemplateName: string;
    currentSearchTerms: ISearchTerm[];
    availableConditions: ICondition[];
    updateTemplateName(e: any): void;
    addSearchTerm(searchTerm: ISearchTerm): void;
    removeSearchTerm(searchTerm: ISearchTerm): void;
}

interface ITemplateDetailsContainerState {
    latestSelectedCondition: ICondition | undefined;
}

export class TemplateDetailsContainer extends React.Component<
    ITemplateDetailsContainerProps,
    ITemplateDetailsContainerState
> {
    state = {
        latestSelectedCondition: undefined,
    };

    public componentDidUpdate(prevProps: ITemplateDetailsContainerProps) {
        if (this.props.currentTemplateId !== prevProps.currentTemplateId) {
            this.setState({
                latestSelectedCondition: undefined,
            });
        }
    }

    public selectNewCondition = (condition: ICondition) => {
        this.setState({ latestSelectedCondition: condition });
    };

    public addSearchTerm = (searchTerm: ISearchTerm) => {
        this.setState({ latestSelectedCondition: undefined });
        this.props.addSearchTerm(searchTerm);
    };

    public render() {
        const currentSearchTerms = this.props.currentSearchTerms.map(searchTerm => {
            return {
                searchTerm: searchTerm,
                onClick: () => this.props.removeSearchTerm(searchTerm),
            };
        });

        let availableConditionItems: IAvailableConditionItem[] = this.props.availableConditions.map(
            condition => ({
                label: condition.label,
                description: condition.description,
                onClick: () => this.selectNewCondition(condition),
            })
        );
        availableConditionItems = _.sortBy(availableConditionItems, ['label']);

        return (
            <div className="row">
                <div className="col-3 border-right pt-3 pr-0">
                    <AvailableConditions items={availableConditionItems} />
                </div>
                <div className="col-9 pt-3 pb-3">
                    {this.props.currentTemplateId && (
                        <TemplateNameEditor
                            name={this.props.currentTemplateName}
                            updateName={this.props.updateTemplateName}
                        />
                    )}
                    <ConditionEditor
                        givenCondition={this.state.latestSelectedCondition}
                        availableConditions={this.props.availableConditions}
                        addedSearchTerms={currentSearchTerms}
                        addSearchTerm={this.addSearchTerm}
                    />
                </div>
            </div>
        );
    }
}
