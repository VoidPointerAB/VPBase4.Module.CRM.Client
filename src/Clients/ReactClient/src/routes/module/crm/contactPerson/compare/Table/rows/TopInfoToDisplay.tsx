import React from 'react';
import { Translation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {IPerson} from '../../compare';

interface ITopInfoProps {
    rightValue: IPerson,
    leftValue: IPerson
}
class TopInfoToDisplay extends React.Component<ITopInfoProps> {

    public render() {
        const {rightValue, leftValue} = this.props;

        const initialsLeft: string = leftValue.firstName ? leftValue.firstName.charAt(0).toUpperCase() + leftValue.lastName.charAt(0).toUpperCase() : ''
        const initialsRight: string = rightValue.firstName ? rightValue.firstName.charAt(0).toUpperCase() + rightValue.lastName.charAt(0).toUpperCase() : ''

        const rightCell = <th className="infoToDisplay cell">
                                <div className="infoToDisplay-container m-auto">
                                    <div className="initials logo-displayer">
                                        {rightValue.logo ? rightValue.logo : <span>{initialsRight}</span>}
                                    </div>
                                    <div className="text-center">
                                        <span className="ibox-star icon-p" style={{ color: rightValue.isUserFavorite ? '#f8ac59' : 'lightgray' }}>
                                            <FontAwesomeIcon icon="star" />
                                        </span>
                                    </div>
                                    <p className="text-center mb-1 person-name-color">{`${rightValue.firstName} ${rightValue.lastName}`}</p>
                                    <p className="text-center mb-1 friendly-id-color">{rightValue.contactPersonId}</p>
                                </div>
                        </th>

        const leftCell = <th className="infoToDisplay cell">
                                <div className="infoToDisplay-container m-auto">
                                    <div className="initials logo-displayer">
                                        {leftValue.logo ? leftValue.logo : <span>{initialsLeft}</span>}
                                    </div>
                                    <div className="text-center">
                                        <span className="ibox-star icon-p" style={{ color: leftValue.isUserFavorite ? '#f8ac59' : 'lightgray' }}>
                                            <FontAwesomeIcon icon="star" />
                                        </span>
                                    </div>
                                    <p className="text-center mb-1 person-name-color">{`${leftValue.firstName} ${leftValue.lastName}`}</p>
                                    <p className="text-center mb-1 friendly-id-color">{leftValue.contactPersonId}</p>
                                </div>
                            </th>


        return (
            <Translation>
                {(t) =>
                    <tr className="fields">
                        <th scope="row">{t('compare.fields')}</th>
                            {leftCell}
                            {rightCell}
                    </tr>
                }
            </Translation>
        )
    }
}

export default TopInfoToDisplay;