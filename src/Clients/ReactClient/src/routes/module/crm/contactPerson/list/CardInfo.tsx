import React from 'react';
import { Translation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ICardInfo {
    firstName: string,
    lastName: string | null,
    contactPersonId: string,
    mainPhone: string | null,
    email: string | null,
    skype: string | null,
    title: string | null,
    website: string | null,
    contactCompanyName: string | null
}

const CardInfo = (props: ICardInfo) => {
    const initialsPerson = props.lastName ? `${props.firstName.charAt(0).toUpperCase()} ${props.lastName.charAt(0).toUpperCase()}`: `${props.firstName.charAt(0).toUpperCase()}`

    return (
        <Translation>
            {(t) =>
                <>
                    <div className="card-avatar-location">
                        <div className="initials my-0 mx-auto" style={{ backgroundColor: `rgba(1, 65, 99, 0.5)`, letterSpacing: '-3px' }} >{initialsPerson}</div>
                        <div className="pb-2 text-center">
                            <p className={props.title ? 'mt-2 mb-0' : 'd-none'}><strong>{props.title}</strong></p>
                        </div>
                    </div>
                    <div className="cards-info">
                        <div className="mb-2">
                            {props.contactCompanyName && (
                                <p className='mb-0 main'><strong>{props.contactCompanyName}</strong></p>
                            )}
                        </div>
                        <p className={props.mainPhone ? 'font-weight-bold mb-0' : 'd-none'}>{t('labels.Phone')}: <span className="font-weight-normal">{props.mainPhone}</span></p>
                        <p className={props.email ? 'font-weight-bold mb-0' : 'd-none'}>{t('labels.Email')}:  <span className="font-weight-normal">{props.email}</span></p>
                        <p className={props.website ? 'font-weight-bold mb-0' : 'd-none'}>{t('labels.Website')}: <span className="font-weight-normal">{props.website}</span></p>
                        <p className={props.skype ? 'font-weight-bold mb-0' : 'd-none'}>Skype: <span className="font-weight-normal">{props.skype}</span></p>
                    </div>
                </>        
            }
        </Translation>
    )
}

export default CardInfo
