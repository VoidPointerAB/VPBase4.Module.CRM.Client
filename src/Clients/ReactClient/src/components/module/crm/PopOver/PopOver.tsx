import React from 'react';

import { Popover, PopoverBody, PopoverProps, PopoverBodyProps } from 'reactstrap';

export const PopOverBody = (props: PopoverBodyProps) => {
    return (
        <PopoverBody className="popover-body">
            {props.children}
        </PopoverBody>
    );
};

export const PopOver = (props: PopoverProps) => {
    return (
        <Popover placement={props.placement} isOpen={props.isOpen} trigger="legacy" target={props.target} toggle={props.toggle}>
            <PopOverBody>
                {props.children}
            </PopOverBody>
        </Popover>
    );
};
