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
        const {personOptions} = this.props; 

        return(
            <Translation>
                {(t) =>
                    <section className="d-flex justify-content-between p-2 mb-3">
                        <h3>{t('compare.selectHeadingPerson')}</h3>
                        <Select 
                            className="selection-person-compare m-auto"
                            styles={reactSelectDefaultStyles}
                            placeholder={t("placeholders.choosePerson")}
                            options={personOptions}
                            value={this.getSelectedContactPersonLeft()}
                            onChange={(option: any) => this.filterChanged(option, 'left')}
                        />
                        <Select 
                            className="selection-person-compare m-auto"
                            styles={reactSelectDefaultStyles}
                            placeholder={t("placeholders.choosePerson")}
                            options={personOptions}
                            value={this.getSelectedContactPersonRight()}
                            onChange={(option: any) => this.filterChanged(option, 'right')}
                        />
                    </section>
                }
            </Translation>
        )
    }

    private getSelectedContactPersonLeft() {
        const person = this.props.personOptions.filter((option: IOptionsProps) => option.value === this.props.selectedPersonIdLeft);
        return person ? person : null;
    }
    private getSelectedContactPersonRight() {
        const person = this.props.personOptions.filter((option: IOptionsProps) => option.value === this.props.selectedPersonIdRight);
        return person ? person : null;
    }
}

export default SelectToCompare; 