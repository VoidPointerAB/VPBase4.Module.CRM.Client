import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Tooltip } from 'reactstrap';

export interface ListToolProps {
    icon: string;
    tooltip?: string;
    onClick?(): void;
}

export const ViewTool: FunctionComponent<ListToolProps> = props => {
    const toolRef = useRef<any>();
    const isMounted = useRef(false);
    const [open, setOpen] = useState(false);
    const [ready, setReady] = useState(false);

    const toggle = () => {
        if (isMounted.current) {
            setOpen(!open);
        }
    };

    useEffect(() => {
        isMounted.current = true;

        if (toolRef.current) {
            setReady(true);
        }

        return () => {
            isMounted.current = false;
        };
    }, []);

    return (
        <button ref={toolRef} className="btn btn-default" onClick={props.onClick}>
            <FontAwesomeIcon icon={props.icon as IconName} />
            {props.tooltip && ready && (
                <Tooltip placement={'top'} target={toolRef.current} isOpen={open} toggle={toggle}>
                    {props.tooltip}
                </Tooltip>
            )}
        </button>
    );
};
