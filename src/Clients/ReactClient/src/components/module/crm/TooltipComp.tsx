import React from 'react';
import { Tooltip } from 'reactstrap';

interface ITooltipProps {
    text: string | string[],
    placement: 'top' | 'bottom' | 'left' | 'right',
    target: string,
}

interface ITooltipState {
    tooltipOpen: boolean,
}

class TooltipComp extends React.Component<ITooltipProps, ITooltipState> {
    constructor(props: ITooltipProps ) {
    super(props);

    this.state = {
        tooltipOpen: false,
    };
    }

    public toggle = () => this.setState((prevState: any) => ({ tooltipOpen: !prevState.tooltipOpen }))
    
    render() {
        return (
            <Tooltip placement={this.props.placement} isOpen={this.state.tooltipOpen} target={this.props.target} toggle={this.toggle}>
                {this.props.text}
            </Tooltip>
        );
    }
}

export default TooltipComp;