import React from 'react';

import Card, { ICardCompanyProps } from './Card';

import NoData from 'components/module/crm/NoData';

interface IItemList {
    contactCompanies: ICardCompanyProps[],
    history: any,
}

const CardList = (props: IItemList) => {
    const Companies = props.contactCompanies.map((Company: ICardCompanyProps) => {
        return <Card key={Company.contactCompanyId} {...Company} history={props.history} />
    })

    return (
        <section className="row cards no-gutters">
            <section className="col-sm-12">
                {Companies.length ? <section className="row">{Companies}</section> : <NoData />}
            </section>
        </section>
    )
}

export default CardList
