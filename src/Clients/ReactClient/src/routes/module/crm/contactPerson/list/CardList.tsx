import React from 'react';

import Card, { ICardPersonProps } from './Card';

import NoData from 'components/module/crm/NoData';

interface IItemList {
    contactPersons: ICardPersonProps[],
    history: any,
}

const CardList = (props: IItemList) => {
    const persons = props.contactPersons.map((person: ICardPersonProps) => {
        return <Card key={person.contactPersonId} {...person} history={props.history} />
    })

    return (
        <section className="row cards no-gutters">
            <section className="col-sm-12">
                {persons.length ? <section className="row">{persons}</section> : <NoData />}
            </section>
        </section>
    )
}

export default CardList
