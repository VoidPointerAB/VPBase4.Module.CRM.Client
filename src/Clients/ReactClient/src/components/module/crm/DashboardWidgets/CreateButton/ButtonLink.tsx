import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

interface IProps {
    createText: string,
    fontIcon: any,
    url: string
}

const ButtonLink = (props: IProps) => {
    return (
        <div className="flexbus-links">
            <Link className="link-container" to={props.url}>
                <span className="create-new-link">
                    <FontAwesomeIcon className="m-auto" icon={props.fontIcon} />
                </span> 
                <div className="link-title mt-1 mb-3">{props.createText}</div>
            </Link>
        </div>
    )
}

export default ButtonLink;