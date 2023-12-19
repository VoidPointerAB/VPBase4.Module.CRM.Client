import React from 'react';
import { Translation } from 'react-i18next';

import { TextBoxWithLinks } from 'components/module/crm/TextBoxWithLinks/TextBoxWithLinks'

export interface IPersonInfo {
    firstName: string,
    lastName: string | null,
    contactPersonId: string,
    birthday: string
    mainPhone: string | null,
    workPhone: string | null,
    email: string | null,
    otherEmail: string | null, 
    skype: string | null,
    title: string | null, 
    website: string | null,
    description: string | null,
    tags: string[] | null,
    contactCompany: any,
    history: any
}

const PersonInfo = (props: IPersonInfo) => {

    const {tags} = props;
    const tagList = tags && tags.map(tag => <span key={tag} className="tag no-link">{tag}</span>)
    const initialsPerson = props.lastName ? `${props.firstName.charAt(0).toUpperCase()} ${props.lastName.charAt(0).toUpperCase()}` : `${props.firstName.charAt(0).toUpperCase()}`
    const check = props.mainPhone || props.email || props.otherEmail || props.workPhone || props.skype || props.website || props.description

    return (
        <Translation>
            {(t) =>
                <article className="col-xl-6 col-sm-12">
                    <div className="row no-gutters">
                        <div className={`col-lg-12 text-center  pb-3 mb-3 ${check ? 'border-bottom' : ''}`}>
                            <div className="initials mb-2 mt-0 mx-auto">{initialsPerson}</div>
                            <article className={tags && tags.length ? 'tags mt-2' : 'd-none'}>{tagList}</article>
                        </div>
                        <article className="col-lg-12 my-2">
                            <div className="row">
                                { props.mainPhone && <p className="col-lg-6 col-sm-12"><strong>{t('labels.Phone')}</strong> {props.mainPhone}</p> }
                                { props.workPhone && <p className="col-lg-6 col-sm-12"><strong>{t('labels.workPhone')}</strong> {props.workPhone}</p> }
                                { props.email && <p className="col-lg-6 col-sm-12"><strong>{t('labels.companyEmail')}</strong> <a href={`mailto:${props.email}`}>{props.email}</a></p> }
                                { props.otherEmail && <p className="col-lg-6 col-sm-12"><strong>{t('labels.Email')}</strong> <a href={`mailto:${props.otherEmail}`}>{props.otherEmail}</a></p> }
                                { props.skype && <p className="col-lg-6 col-sm-12"><strong>Skype</strong> {props.skype}</p> }
                                { props.website && <p className="col-lg-6 col-sm-12"><strong>{t('labels.Website')}</strong> <a href={props.website}>{props.website}</a></p> }
                            </div>
                        </article>
                        <article className={props.description ? 'col-lg-12 p-3 mb-3 mx-auto note' : 'd-none'}>
                            <TextBoxWithLinks className="mb-0 text-justify">{props.description}</TextBoxWithLinks>
                        </article>
                        <article className="col-lg-12 ">
                            <div className="row">
                                { props.birthday && <p className="col-lg-6 col-sm-12"><strong>{t('labels.birthday')}</strong> {props.birthday}</p> }
                            </div>
                        </article>
                    </div>
                </article>       
            }
        </Translation> 
    )
}

export default PersonInfo
