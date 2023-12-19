import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
    companyId?: string | null,
    personId?: string | null
    history: any
    type: 'PERSON' | 'COMPANY' | 'ACTIVITY',
    text?: string,
    icon?: any
}

const AddIcon = (props: IProps) => {
    const onClick = () => {
        const activityPersonState = {
            companyId: props.companyId,
            personId: props.personId
        }
        switch(props.type) {
            case 'PERSON': 
            props.history.push(`/contactpersons/new`, props.companyId)
            break;
            case 'ACTIVITY': 
            props.history.push('/activities/new', activityPersonState)
            break; 
            case 'COMPANY' :
            props.history.push(`/contactcompanies/new`)
            break; 
            default: 
            props.history.push('/')
        }
    }
    return (
        <span className="ibox-plus" onClick={onClick}>
            <FontAwesomeIcon icon={props.icon} size="1x" className="mr-1" /> {props.text}
        </span>
    )
}

export default AddIcon;
