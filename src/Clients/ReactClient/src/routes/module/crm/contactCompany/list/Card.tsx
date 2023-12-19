import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Translation } from 'react-i18next';

import CardInfo from 'routes/module/crm/contactCompany/list/CardInfo';
import { IBox, IBoxContent, IBoxFooter } from 'components/module/inspinia/IBox/IBox';
import { PopOver } from 'components/module/crm/PopOver/PopOver';
import AddIcon from 'components/module/crm/icons/AddIcon';
import EditIcon from 'components/module/crm/icons/EditIcon';
import BadgeIcon from 'components/module/crm/icons/BadgeIcon';

export interface ICardCompanyProps {
    contactCompanyId: string;
    name: string;
    isUserFavorite: boolean;
    phone: string | null;
    email: string | null;
    tags: string[] | null;
    activityCount: number;
    contactPersons: any;
    setFavorite(id: string, isFavorite: boolean, onError?: () => void): void;
    deleteCompany(id: string, onSuccess?: () => void): void;
}
interface ICardProps {
    history: any;
}
interface ICardState {
    popOverId: string;
    popoverOpen: boolean;
    isUserFavorite: boolean;
    isDeleted: boolean;
}
class Card extends React.Component<ICardProps & ICardCompanyProps, ICardState> {
    public state = {
        popOverId: '',
        popoverOpen: false,
        isUserFavorite: this.props.isUserFavorite,
        isDeleted: false,
    };
    public toggle = () =>
        this.setState((prevState: ICardState) => {
            return { popOverId: this.props.contactCompanyId, popoverOpen: !prevState.popoverOpen };
        });

    public goToSortedList = (type: string) => {
        const state = {
            contactCompanyId: this.props.contactCompanyId,
            contactCompanyName: this.props.name,
        };

        if (type === 'person') {
            this.props.history.push('/contactpersons/list', { ...state });
        }
        if (type === 'activity') {
            this.props.history.push('/activities/list', { ...state });
        }
    };

    public favorize = () => {
        const originalIsUserFavorite = this.state.isUserFavorite;

        this.setState({ isUserFavorite: !originalIsUserFavorite }, () => {
            this.props.setFavorite(this.props.contactCompanyId, this.state.isUserFavorite, () => {
                this.setState({ isUserFavorite: originalIsUserFavorite });
            });
        });
    };

    public deleteCompany = () => {
        this.props.deleteCompany(this.props.contactCompanyId, () => {
            this.setState({ isDeleted: true });
        });
    };

    public render() {
        const { tags } = this.props;
        const tagList = tags
            ? tags.map(tag => {
                  return (
                      <div key={tag} className="tag">
                          {tag}
                      </div>
                  );
              })
            : null;

        return (
            <Translation>
                {t => (
                    <article className="col-xl-4 col-md-6 col-12">
                        <IBox className="contact-box mb-4">
                            <IBoxContent className="card-title row no-gutters">
                                <section className="col-sm-9 col-9 title-text-icon">
                                    <span
                                        className="ibox-star icon-p mr-2"
                                        style={{
                                            color: this.state.isUserFavorite
                                                ? '#f8ac59'
                                                : 'lightgray',
                                        }}
                                        onClick={this.favorize}
                                    >
                                        <FontAwesomeIcon icon="star" />
                                    </span>
                                    <Link
                                        to={`/contactcompanies/view/${this.props.contactCompanyId}`}
                                    >
                                        <h2>{this.props.name}</h2>
                                    </Link>

                                    {this.props.contactPersons.length > 0 && (
                                        <BadgeIcon
                                            icon="user"
                                            className="ml-2"
                                            onClick={() => this.goToSortedList('person')}
                                        >
                                            {this.props.contactPersons.length}
                                        </BadgeIcon>
                                    )}
                                    {this.props.activityCount > 0 && (
                                        <BadgeIcon
                                            icon="calendar-alt"
                                            className="ml-2"
                                            onClick={() => this.goToSortedList('activity')}
                                        >
                                            {this.props.activityCount}
                                        </BadgeIcon>
                                    )}
                                </section>
                                <section className="col-sm-3 col-3 d-flex align-items-baseline">
                                    <Button
                                        className="popover-hide-active ml-auto px-2"
                                        id={this.props.contactCompanyId}
                                        onClick={this.toggle}
                                        style={{ backgroundColor: 'transparent', border: 'none' }}
                                        color="transparent"
                                        outline={false}
                                        active={false}
                                    >
                                        <div className="widget-popover ">
                                            <FontAwesomeIcon icon="ellipsis-v" size="1x" />
                                        </div>
                                    </Button>
                                </section>
                            </IBoxContent>
                            <IBoxFooter className="card-footer">
                                {tags && tags.length > 0 ? tagList : ''}
                            </IBoxFooter>
                        </IBox>
                        <PopOver
                            placement="left"
                            isOpen={this.state.popoverOpen}
                            target={this.props.contactCompanyId}
                            toggle={this.toggle}
                        >
                            <AddIcon
                                companyId={this.props.contactCompanyId}
                                history={this.props.history}
                                type={'ACTIVITY'}
                                text={t('addButton.addActivity')}
                                icon={'calendar-plus'}
                            />
                            <AddIcon
                                companyId={this.props.contactCompanyId}
                                history={this.props.history}
                                type={'PERSON'}
                                text={t('addButton.addPerson')}
                                icon={'user-plus'}
                            />
                            <EditIcon
                                id={this.props.contactCompanyId}
                                history={this.props.history}
                                type={'CONTACTCOMPANY'}
                                text={t('button.edit')}
                            />
                            <span className="ibox-trash" onClick={this.deleteCompany}>
                                <FontAwesomeIcon icon="trash" className="mr-1" />{' '}
                                {t('button.delete')}
                            </span>{' '}
                        </PopOver>
                    </article>
                )}
            </Translation>
        );
    }
}

export default Card;
