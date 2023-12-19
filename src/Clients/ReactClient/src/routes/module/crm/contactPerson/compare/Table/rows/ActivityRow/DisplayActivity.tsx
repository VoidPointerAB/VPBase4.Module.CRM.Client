import React from 'react';
interface IDisplayActivityProps {
    activityCount: number,
    className: string
}

const DisplayActivity = ({activityCount, className}: IDisplayActivityProps) => (
    <span className={className}>
        {activityCount}
    </span>
)

export default DisplayActivity;