import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translation } from 'react-i18next';

import {ICompany} from '../../compare';

interface ITopInfoProps {
    rightValue: ICompany,
    leftValue: ICompany
}

class TopInfoToDisplay extends React.Component<ITopInfoProps> {

    public render() {
        const {rightValue, leftValue} = this.props;

        const initialsLeft: string = leftValue.name ? leftValue.name.charAt(0).toUpperCase() : ''
        const initialsRight: string = rightValue.name ? rightValue.name.charAt(0).toUpperCase() : ''

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
                                    <p className="text-center mb-1 company-name-color">{rightValue.name}</p>
                                    <p className="text-center mb-1 friendly-id-color">{rightValue.contactCompanyId}</p>
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
                                    <p className="text-center mb-1 company-name-color">{leftValue.name}</p>
                                    <p className="text-center mb-1 friendly-id-color">{leftValue.contactCompanyId}</p>
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