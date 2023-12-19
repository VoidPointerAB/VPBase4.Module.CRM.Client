import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Translation } from 'react-i18next'; 

import { PopOver } from 'components/module/crm/PopOver/PopOver';
import AddIcon from 'components/module/crm/icons/AddIcon';
import EditIcon from 'components/module/crm/icons/EditIcon';
import FavoriteIcon from 'components/module/crm/icons/FavoriteIcon';

import { UserFavoriteEntityTypeEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';

export interface ICompanyItem {
    name: string,
    isUserFavorite: boolean | null,
    contactCompanyId: string,
    createdByUserId?: string
}
interface ICompanyProps {
    history: any
}

interface IState {
    popOverId: string,
    popoverOpen: boolean,
}

class ListItem extends React.Component<ICompanyItem & ICompanyProps, IState> {
    public state = {
        popOverId: '',
        popoverOpen: false,
    };

    public toggle = () => this.setState((prevState: IState) => {
        return ({ popOverId: this.props.contactCompanyId, popoverOpen: !prevState.popoverOpen })
    })

    public render() {
        return (
            <Translation>
                {(t) =>
                    <article className="list-item">
                        <span className="py-3 pl-3">
                            <FavoriteIcon isFavorite={this.props.isUserFavorite} id={this.props.contactCompanyId} name={this.props.name} type={UserFavoriteEntityTypeEnum.COMPANY} />
                        </span>
                        <Link className="inspinia py-3" to={`/contactcompanies/view/${this.props.contactCompanyId}`}>
                            <div className="company-name">
                                <span className="ml-2">{this.props.name}</span>
                            </div>
                        </Link>
                        <Button className="popover-hide-active" id={this.props.contactCompanyId} onClick={this.toggle} style={{backgroundColor: "transparent", border: "none"}} color="transparent" outline={false} active={false} >
                            <div className="widget-popover ml-auto px-2" >
                                <FontAwesomeIcon icon="ellipsis-v" size="1x" />
                            </div>
                        </Button>
                        <PopOver placement='left' isOpen={this.state.popoverOpen} target={this.props.contactCompanyId} toggle={this.toggle}>
                            <AddIcon
                                companyId={this.props.contactCompanyId}
                                history={this.props.history}
                                type={'PERSON'}
                                text={t('addButton.addPerson')}
                                icon={'user-plus'} />
                            <AddIcon
                                companyId={this.props.contactCompanyId}
                                history={this.props.history}
                                type={'ACTIVITY'}
                                text={t('addButton.addActivity')}
                                icon={'calendar-plus'} />
                            <EditIcon id={this.props.contactCompanyId} type={'CONTACTCOMPANY'} history={this.props.history} text={t('buttonLabels.editCompany')} />
                        </PopOver>
                    </article>
                }
            </Translation>
        )
    }
}

export default ListItem;