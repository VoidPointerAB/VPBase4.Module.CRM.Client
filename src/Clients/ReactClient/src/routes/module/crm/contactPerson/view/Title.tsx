import React from 'react';
import { Translation } from 'react-i18next';
import { Link } from 'react-router-dom'


interface IProps {
    contactCompany: { name: string, contactCompanyId: string } | null,
    firstName: string,
    lastName: string | null, 
    title: string | null, 
    history: any
}

const Title = (props: IProps) => {

    const companyId = props.contactCompany ? props.contactCompany.contactCompanyId : null
    const companyName = props.contactCompany ? props.contactCompany.name : '';
    return (
        <Translation>
            {(t) =>
                <h2 className="mr-auto">
                    {`${props.firstName} ${props.lastName}`}
                    <small className={props.title || props.contactCompany ? '' : 'd-none'}> - {props.title}
                        <span className={props.title && props.contactCompany ? '' : 'd-none'}> {t('preposition.at1')} </span>
                        <Link className="details-link" to={`/contactcompanies/view/${companyId}`}>{companyName}</Link>
                    </small>
                </h2>
            }
        </Translation>
        
    )
}
export default Title