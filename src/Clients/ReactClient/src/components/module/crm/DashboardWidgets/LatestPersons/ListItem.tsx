import React from 'react';
import { Translation } from 'react-i18next';
import { Button, ButtonProps } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { PopOver } from 'components/module/crm/PopOver/PopOver';
import AddIcon from 'components/module/crm/icons/AddIcon';
import EditIcon from 'components/module/crm/icons/EditIcon';
import FavoriteIcon from 'components/module/crm/icons/FavoriteIcon';

import { UserFavoriteEntityTypeEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';

export interface IPersonItem {
    contactPersonId: string,
    contactPersonName: string,
    contactCompanyId: string,
    contactCompanyName: string,
    isUserFavorite: boolean,
}

interface IPersonProps {
    history: any
}

interface IState {
    popOverId: string,
    popoverOpen: boolean,
}

class ListItem extends React.Component<IPersonItem & IPersonProps & ButtonProps, IState> {
    public state = {
        popOverId: '',
        popoverOpen: false,
    };

    public toggle = () => this.setState((prevState: IState) => {
        return ({ popOverId: this.props.contactPersonId, popoverOpen: !prevState.popoverOpen })
    })

    public render() {
        return (
            <Translation>
                {(t) => 
                    <article className="list-item">
                        <span className="py-3 pl-3">
                            <FavoriteIcon isFavorite={this.props.isUserFavorite} id={this.props.contactPersonId} name={this.props.contactPersonName} type={UserFavoriteEntityTypeEnum.PERSON} />
                        </span>
                        <Link className="inspinia py-3" to={`/contactpersons/view/${this.props.contactPersonId}`}>
                            <div className="person-name">
                                <span className="ml-2">{this.props.contactPersonName}</span>
                                <span className={this.props.contactCompanyId ? "company-name-person" : "d-none" }>{this.props.contactCompanyId ? this.props.contactCompanyName : null}</span>
                            </div>
                        </Link>
                        <Button className="popover-hide-active" id={this.props.contactPersonId} onClick={this.toggle} style={{backgroundColor: "transparent", border: "none"}} color="transparent" outline={false} active={false} >
                            <div className="widget-popover ml-auto px-2" >
                                <FontAwesomeIcon icon="ellipsis-v" size="1x" />
                            </div>
                        </Button>
                        <PopOver placement='left' isOpen={this.state.popoverOpen} target={this.props.contactPersonId} toggle={this.toggle}>
                            <AddIcon
                                companyId={this.props.contactCompanyId ? this.props.contactCompanyId : null}
                                personId={this.props.contactPersonId}
                                history={this.props.history}
                                type={'ACTIVITY'}
                                text={t('addButton.addActivity')}
                                icon={'calendar-plus'} />
                            <EditIcon id={this.props.contactPersonId} type={'CONTACTPERSON'} history={this.props.history} text={t('buttonLabels.editPerson')} />
                        </PopOver>
                    </article>
                }
            </Translation>
        )
    }
}

export default ListItem;
