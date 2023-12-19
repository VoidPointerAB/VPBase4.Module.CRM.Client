import React from 'react';
import { Translation } from 'react-i18next';

import { TextBoxWithLinks } from 'components/module/crm/TextBoxWithLinks/TextBoxWithLinks'

interface IContactCompanyProps {
    contactCompanyId: string,
    name: string,
    phone: string | null,
    email: string | null,
    website: string | null,
    organizationNumber: string | null,
    tags: string[] | null,
    note: string | null,
}
const ContactCompanyInfo = (company: IContactCompanyProps) => {
    const initialsCompany = company.name.charAt(0).toUpperCase()
    const tagList = company.tags ? company.tags.map((tag: string) => {
        return <span key={tag} className="tag tag-nolink">{tag}</span>
    }) : []
    const check = company.phone || company.email || company.website || company.organizationNumber || company.note
    return (
        <Translation>
            {(t) =>
                <article className="col-xl-6 col-sm-12">
                    <div className="row no-gutters">
                        <div className={`col-lg-12 text-center  pb-3 mb-2 ${check ? 'border-bottom' : ''}`}>
                            <div className="initials mb-2 mt-0 mx-auto">{initialsCompany}</div>
                            { tagList.length > 0 && <div className="tags mt-2">{tagList}</div> }
                        </div>
                        <article className="col-lg-12 my-2">
                            <div className="row">
                                { company.phone && <p className="col-lg-6 col-sm-12"><strong>{t('labels.Phone')}</strong> {company.phone}</p> }
                                { company.email && <p className="col-lg-6 col-sm-12"><strong>{t('labels.Email')}</strong> <a href={`mailto:${company.email}`}>{company.email}</a></p> }
                                { company.website && <p className="col-lg-6 col-sm-12"><strong>{t('labels.Website')}</strong> <a href={company.website}>{company.website}</a></p> }
                                { company.organizationNumber && <p className="col-lg-6 col-sm-12"><strong>{t('labels.organizationNumber')}</strong> {company.organizationNumber}</p> }
                            </div>
                        </article>
                        <article className={company.note ? 'col-lg-12 p-3 mb-3 mx-auto note' : 'd-none'}>
                            <TextBoxWithLinks className="mb-0 text-justify">{company.note}</TextBoxWithLinks>
                        </article>
                    </div>
                </article>
            }
        </Translation>
    )
}

export default ContactCompanyInfo
