import React from 'react';

import * as Types from './iboxTypes';

export const IBox = (props: Types.IBox) => {
    return (
        <div className={`ibox ${props.className ? props.className : ''}`}>
            {props.children}
        </div>
    );
};

export const IBoxTitle = (props: Types.IBoxTitle) => {
    return (
        <div className={`ibox-title ${props.className ? props.className : ''}`}>
            <h5>{props.text}</h5>
            <div className="ibox-tools">
                {props.tools}
            </div>
        </div>
    );
};

export const IBoxContent = (props: Types.IBoxContent) => {
    return (
        <div className={`ibox-content ${props.className ? props.className : ''}`}>
            {props.children}
        </div>
    );
};

export const IBoxFooter = (props: Types.IBoxFooter) => {
    return (
        <div className={`ibox-footer ${props.className ? props.className : ''}`}>
            {props.children}
        </div>
    );
};
