import React from 'react'; 
import Select from 'react-select';
import { Option } from 'react-select/lib/filters';
import { Translation } from 'react-i18next';

import { IOptionsProps } from 'components/module/crm/interfaceOption';
import { reactSelectDefaultStyles } from 'components/module/Form/Select/Select';

class SelectToCompare extends React.Component<any,any> {

    public filterChanged = (option: Option, side: 'left' | 'right') => {
        this.props.filterUpdater(option.value, side);
    }

    public render () {
        const {companyOptions} = this.props; 

        return(
            <Translation>
             {(t) =>
                <section className="d-flex justify-content-between p-2 mb-3">
                    <h3>{t('compare.selectHeading')}</h3>
                    <Select 
                        className="selection-company-compare m-auto"
                        styles={reactSelectDefaultStyles}
                        placeholder={t('placeholders.chooseCompany')}
                        options={companyOptions}
                        value={this.getSelectedContactCompanyLeft()}
                        onChange={(option: any) => this.filterChanged(option, 'left')}
                    />
                    <Select 
                        className="selection-company-compare m-auto"
                        styles={reactSelectDefaultStyles}
                        placeholder={t("placeholders.chooseCompany")}
                        options={companyOptions}
                        value={this.getSelectedContactCompanyRight()}
                        onChange={(option: any) => this.filterChanged(option, 'right')}
                    />
                </section>
            }
            </Translation>
        )
    }

    private getSelectedContactCompanyLeft() {
        const company = this.props.companyOptions.filter((option: IOptionsProps) => option.value === this.props.selectedCompanyIdLeft);
        return company ? company : null;
    }
    private getSelectedContactCompanyRight() {
        const company = this.props.companyOptions.filter((option: IOptionsProps) => option.value === this.props.selectedCompanyIdRight);
        return company ? company : null;
    }
}

export default SelectToCompare; 