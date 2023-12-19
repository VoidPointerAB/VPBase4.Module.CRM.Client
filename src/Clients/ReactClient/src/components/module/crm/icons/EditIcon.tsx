import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
    id: string,
    secondaryId?: string | null, // for activityt that needs both company and person id
    history: any
    type: 'CONTACTPERSON' | 'CONTACTCOMPANY' | 'ACTIVITY',
    text?: string
}

const EditIcon = (props: IProps) => {
    const activityPersonState = {
        companyId: props.id, // needs to be renamed
        personId: props.secondaryId // needs to be renamed
    }
    const onClick = () => {
        switch (props.type) {
            case 'CONTACTCOMPANY':
                props.history.push(`/contactcompanies/edit/${props.id}`)
                break;
            case 'CONTACTPERSON':
                props.history.push(`/contactpersons/edit/${props.id}`)
                break;
            case 'ACTIVITY':
                props.history.push(`/activities/edit/${props.id}`, activityPersonState)
                break;
            default:
                props.history.push('/')
        }
    }
    return (
        <span className="ibox-pen" onClick={onClick}>
            <FontAwesomeIcon icon="pen" size="1x" className="mr-1" /> {props.text}
        </span>
    )
}

export default EditIcon;