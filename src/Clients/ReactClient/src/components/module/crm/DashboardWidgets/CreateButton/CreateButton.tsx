import React from 'react';
import { Translation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonLink from './ButtonLink';

import '../widgets.css';

interface IAddButtonState {
    isToggle: boolean
}

class AddButton extends React.Component<any, IAddButtonState> {
    public state = {
        isToggle: false
    }
    public onClick = () => this.setState((prevState: IAddButtonState) => ({ isToggle: !prevState.isToggle }))
    
    public render() {
        return (
            <Translation>
                {(t) => 
                    <div>
                        <button className="btn-info align-items-end btn-New active" onClick={this.onClick}>
                            {this.state.isToggle ? <FontAwesomeIcon icon="times" /> : <FontAwesomeIcon icon="plus" />}
                        </button>
                        <div className={this.state.isToggle ? 'fixed-new' : 'd-none'}>
                            <ul className="menu-option">
                                <ButtonLink createText={t('addButton.company')} fontIcon={'building'} url={'/contactcompanies/new'} />
                                <ButtonLink createText={t('addButton.person')} fontIcon={'user'} url={'/contactpersons/new'} />
                                <ButtonLink createText={t('addButton.activity')} fontIcon={'calendar-alt'} url={'/activities/new'} />
                                <span className="arrow-left" />
                            </ul>
                        </div>
                    </div>
                } 
            
            </Translation>
        )
    }
}

export default AddButton;

