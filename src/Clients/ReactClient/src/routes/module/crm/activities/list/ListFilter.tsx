import React from 'react';
import Select, { createFilter } from 'react-select';
import { Translation } from 'react-i18next';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import { getLocale } from 'helpers/module/localeHelper';
import { getDateFormat } from 'helpers/module/dateTimeHelper';

import { reactSelectDefaultStyles } from 'components/module/Form/Select/Select';
import Tooltip from 'components/module/crm/TooltipComp';

import { IListFilter } from './list';

import { getActivityListFilterOptions } from 'graphQL/module/crm/generatedTypes/getActivityListFilterOptions';
import i18next from 'i18next';

import styles from './ListFilter.module.css';

interface IListFilterProps {
    filter: IListFilter;
    setFilter(filter: IListFilter): void;
    createNewActivity(): void;
}

class ListFilter extends React.Component<IListFilterProps, IListFilter> {
    public state = { ...this.props.filter };

    private setContactPersonId = (id: string | null) => {
        this.setState({ contactPersonId: id });
    };

    private setContactCompanyId = (id: string | null) => {
        this.setState({ contactCompanyId: id });
    };

    private setStartDate = (startDate: moment.Moment | null) => {
        this.setState({ startDate: startDate ? moment(startDate).utcOffset(0, true) : null });
    };

    private setEndDate = (endDate: moment.Moment | null) => {
        this.setState({ endDate: endDate ? moment(endDate).utcOffset(0, true) : null });
    };

    private clearFilter = () => {
        this.setState({
            contactCompanyId: null,
            contactPersonId: null,
            startDate: null,
            endDate: null,
        });
    };

    private updateListFilter = () => {
        this.props.setFilter(this.state);
    };

    public render() {
        const locale = getLocale();
        const dateTimeFormat = getDateFormat(locale);

        return (
            <Query<getActivityListFilterOptions> query={GET_FILTER}>
                {({ loading, data, error }) => {
                    const queryPreData = queryPreDataHandler({ loading, error, data });

                    if (queryPreData) {
                        return queryPreData;
                    }

                    if (!data || !data.contactCompaniesLite || !data.contactPersonsLite) {
                        return null;
                    }

                    const companyOptions = data.contactCompaniesLite.map(company => ({
                        value: company.contactCompanyId,
                        label: company.name,
                    }));
                    const personOptions = data.contactPersonsLite.map(person => ({
                        value: person.contactPersonId,
                        label: `${person.firstName} ${person.lastName}`,
                    }));

                    return (
                        <Translation>
                            {t => (
                                <div id={styles.container} className="ibox-content">
                                    <div className="pr-3 border-right">
                                        <button
                                            className={`${styles.button} btn btn-default`}
                                            id="create-new_activity_button"
                                            onClick={this.props.createNewActivity}
                                        >
                                            <Tooltip
                                                placement="top"
                                                target="create-new_activity_button"
                                                text={i18next.t('viewToolsButton.createActivity')}
                                            />
                                            <FontAwesomeIcon icon="calendar-plus" size="1x" />
                                        </button>
                                    </div>

                                    <Select
                                        className={`${styles.select} options-select`}
                                        styles={reactSelectDefaultStyles}
                                        isClearable={true}
                                        placeholder={t('placeholders.chooseCompany')}
                                        options={companyOptions}
                                        filterOption={createFilter({ ignoreAccents: false })}
                                        value={this.getSelectedContactCompany(companyOptions)}
                                        onChange={(option: any) =>
                                            this.setContactCompanyId(option ? option.value : null)
                                        }
                                    />

                                    <Select
                                        className={`${styles.select} options-select`}
                                        styles={reactSelectDefaultStyles}
                                        isClearable={true}
                                        placeholder={t('placeholders.choosePerson')}
                                        options={personOptions}
                                        filterOption={createFilter({ ignoreAccents: false })}
                                        value={this.getSelectedContactPerson(personOptions)}
                                        onChange={(option: any) =>
                                            this.setContactPersonId(option ? option.value : null)
                                        }
                                    />

                                    <div className={styles.filterGroup}>
                                        <label className="font-bold">Start date:</label>
                                        <div>
                                            <DatePicker
                                                selected={this.state.startDate}
                                                locale={locale}
                                                utcOffset={0}
                                                dateFormat={dateTimeFormat}
                                                placeholderText={dateTimeFormat}
                                                className={`${styles.date} form-control`}
                                                onChange={this.setStartDate}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.filterGroup}>
                                        <label className="font-bold">End date:</label>
                                        <div>
                                            <DatePicker
                                                selected={this.state.endDate}
                                                locale={locale}
                                                utcOffset={0}
                                                dateFormat={dateTimeFormat}
                                                placeholderText={dateTimeFormat}
                                                className={`${styles.date} form-control`}
                                                onChange={this.setEndDate}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        className={`${styles.button} btn btn-default`}
                                        onClick={this.clearFilter}
                                    >
                                        {t('buttonLabels.Clear')}
                                    </button>

                                    <button
                                        className={`${styles.button} btn btn-primary`}
                                        onClick={this.updateListFilter}
                                    >
                                        Load
                                    </button>
                                </div>
                            )}
                        </Translation>
                    );
                }}
            </Query>
        );
    }

    private getSelectedContactCompany(companyOptions: any): any {
        const company = companyOptions.filter(
            (option: any) => option.value === this.state.contactCompanyId
        );
        return company ? company : null;
    }
    private getSelectedContactPerson(personOptions: any): any {
        const person = personOptions.filter(
            (option: any) => option.value === this.state.contactPersonId
        );
        return person ? person : null;
    }
}

export const GET_FILTER = gql`
    query getActivityListFilterOptions {
        contactCompaniesLite(sort: ALPHABETICAL_ASC, take: 100000) {
            contactCompanyId
            name
        }
        contactPersonsLite(sort: ALPHABETICAL_ASC, take: 100000) {
            contactPersonId
            lastName
            firstName
        }
    }
`;

export default ListFilter;
