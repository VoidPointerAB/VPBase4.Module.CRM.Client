import React from 'react';
import { Translation } from 'react-i18next';

import DisplayActivity from './DisplayActivity';
import TransferIcon from '../../../TransferIcon';

interface IActivityRowProps {
    initialRightCount: number;
    initialLeftCount: number;
    formikBag: any;
}

interface IActivityRowState {
    activitiesTransferred: boolean;
}

class ActivityRow extends React.Component<IActivityRowProps, IActivityRowState> {
    public handleTransfer = () => {
        this.props.formikBag.setFieldValue('transferActivities', true, false);
        this.props.formikBag.setFieldTouched('transferActivities');
        this.forceUpdate();
    };

    public render() {
        const { initialRightCount, initialLeftCount } = this.props;
        const transferActivities = this.props.formikBag.values.transferActivities;
        const leftCount = transferActivities
            ? initialLeftCount + initialRightCount
            : initialLeftCount;

        const rightCell = (
            <td className="cell">
                <div className="d-flex">
                    {transferActivities || initialRightCount === 0 ? (
                        <DisplayActivity
                            className="activity-right"
                            activityCount={initialRightCount}
                        />
                    ) : (
                        <>
                            <TransferIcon handleTransfer={this.handleTransfer} />
                            <DisplayActivity
                                className="activity-right"
                                activityCount={initialRightCount}
                            />
                        </>
                    )}
                </div>
            </td>
        );

        const leftCell = (
            <td className="text-left cell">
                <DisplayActivity className="activity-left" activityCount={leftCount} />
            </td>
        );

        return (
            <Translation>
                {(t) =>
                    <tr className="company-activities-row">
                        <th scope="row">{t('compare.activities')}</th>
                        {leftCell}
                        {rightCell}
                    </tr>
                }
            </Translation>
        );
    }
}

export default ActivityRow;
