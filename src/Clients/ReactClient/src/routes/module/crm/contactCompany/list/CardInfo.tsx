import React from 'react';
import { Translation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ICardInfo {
    info: {name: string, phone: string | null, email: string | null}
    postAddress: string | null,
}

const CardInfo = (props: ICardInfo) => {
    const initials: string = props.info.name.charAt(0).toUpperCase()
    return (
        <Translation> 
            {(t) =>
                <>
                    <div className="card-avatar-location">
                        <div className="initials" style={{ backgroundColor: `rgba(1, 65, 99, 0.5)` }} >{initials}</div>
                        <div className={props.postAddress ? 'card-address' : 'd-none'}>
                            {props.postAddress && (
                                <p>
                                    <FontAwesomeIcon icon="envelope" className="mr-1" size="1x" />
                                    {props.postAddress}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="cards-info">
                        <p className={props.info.phone ? 'font-weight-bold mb-0' : 'd-none'}>{t('labels.Phone')}: <span className="font-weight-normal">{props.info.phone}</span></p>
                        <p className={props.info.email ? 'font-weight-bold mb-0' : 'd-none'}>{t('labels.Email')}: <span className="font-weight-normal">{props.info.email}</span></p>
                    </div>
                </>
            }
        </Translation>
    )
}

export default CardInfo
