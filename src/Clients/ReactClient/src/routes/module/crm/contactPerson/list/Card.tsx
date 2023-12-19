import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translation } from 'react-i18next';

import CardInfo from './CardInfo';
import { IBox, IBoxContent, IBoxFooter } from 'components/module/inspinia/IBox/IBox';
import { PopOver } from 'components/module/crm/PopOver/PopOver';
import AddIcon from 'components/module/crm/icons/AddIcon';
import BadgeIcon from 'components/module/crm/icons/BadgeIcon';
import EditIcon from 'components/module/crm/icons/EditIcon';

export interface ICardPersonProps {
    contactPersonId: string;
    firstName: string;
    lastName: string | null;
    isUserFavorite: boolean;
    tags: string[] | null;
    email: string | null;
    skype: string | null;
    title: string | null;
    website: string | null;
    contactCompany: { contactCompanyId: string; name: string } | null;
    mainPhone: string | null;
    activityCount: number;
    createdUtc: string;
    setFavorite(id: string, isFavorite: boolean, onError?: () => void): void;
    deletePerson(id: string, onSuccess?: () => void): void;
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
class Card extends React.Component<ICardProps & ICardPersonProps, ICardState> {
    public state = {
        popOverId: '',
        popoverOpen: false,
        isUserFavorite: this.props.isUserFavorite,
        isDeleted: false,
    };

    public toggle = () =>
        this.setState((prevState: ICardState) => {
            return { popOverId: this.props.contactPersonId, popoverOpen: !prevState.popoverOpen };
        });

    public goToSortedList = (type: string) => {
        const state = {
            contactPersonId: this.props.contactPersonId,
            contactPersonName: `${this.props.firstName}${this.props.lastName}`,
        };

        if (type === 'activity') {
            this.props.history.push('/activities/list', { ...state });
        }
    };

    public favorize = () => {
        const originalIsUserFavorite = this.state.isUserFavorite;

        this.setState({ isUserFavorite: !originalIsUserFavorite }, () => {
            this.props.setFavorite(this.props.contactPersonId, this.state.isUserFavorite, () => {
                this.setState({ isUserFavorite: originalIsUserFavorite });
            });
        });
    };

    public deletePerson = () => {
        this.props.deletePerson(this.props.contactPersonId, () => {
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

        return this.state.isDeleted ? null : (
            <Translation>
                {t => (
                    <article className="col-xl-4 col-md-6 col-12">
                        <IBox className="contact-box mb-4">
                            <IBoxContent className="card-title row no-gutters">
                                <section className="col-sm-9 col-xs-12 title-text-icon">
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
                                    <Link to={`/contactpersons/view/${this.props.contactPersonId}`}>
                                        <h2>{`${this.props.firstName} ${this.props.lastName}`}</h2>
                                    </Link>
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
                                <section className="col-sm-3 col-xs-12 d-flex align-items-baseline">
                                    <Button
                                        className="popover-hide-active ml-auto px-2"
                                        id={this.props.contactPersonId}
                                        onClick={this.toggle}
                                        style={{ backgroundColor: 'transparent', border: 'none' }}
                                        color="transparent"
                                        outline={false}
                                        active={false}
                                    >
                                        <div className="widget-popover">
                                            <FontAwesomeIcon icon="ellipsis-v" size="1x" />
                                        </div>
                                    </Button>
                                </section>
                            </IBoxContent>
                            <IBoxContent className="card-main-content">
                                <CardInfo
                                    {...this.props}
                                    contactCompanyName={
                                        this.props.contactCompany
                                            ? this.props.contactCompany.name
                                            : null
                                    }
                                />
                            </IBoxContent>
                            <IBoxFooter className="card-footer">
                                {' '}
                                {tags && tags.length > 0 ? tagList : ''}
                            </IBoxFooter>
                        </IBox>
                        <PopOver
                            placement="left"
                            isOpen={this.state.popoverOpen}
                            target={this.props.contactPersonId}
                            toggle={this.toggle}
                        >
                            <AddIcon
                                personId={this.props.contactPersonId}
                                companyId={
                                    this.props.contactCompany
                                        ? this.props.contactCompany.contactCompanyId
                                        : null
                                }
                                history={this.props.history}
                                type={'ACTIVITY'}
                                text={t('addButton.addActivity')}
                                icon={'calendar-plus'}
                            />
                            <EditIcon
                                id={this.props.contactPersonId}
                                history={this.props.history}
                                type={'CONTACTPERSON'}
                                text={t('button.edit')}
                            />
                            <span className="ibox-trash" onClick={this.deletePerson}>
                                <FontAwesomeIcon icon="trash" className="mr-1" />{' '}
                                {t('button.delete')}
                            </span>
                        </PopOver>
                    </article>
                )}
            </Translation>
        );
    }
}

export default Card;
