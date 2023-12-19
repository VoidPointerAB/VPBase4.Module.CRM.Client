import React from 'react';
import { Collapse } from 'react-collapse';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'

import { IBox, IBoxContent, IBoxTitle } from '../IBox';

interface IBoxTemplateBasicProps {
    className?: string,
    title?: string,
}

class IBoxTemplateBasic extends React.Component<IBoxTemplateBasicProps, any> {
    public state = {
        isClosed: false
    }

    public toggleContentClosed = () => {
        this.setState((prevState: any) => {
            return { isClosed: !prevState.isClosed }
        });
    }

    public render() {
        const tools = (
            <span onClick={this.toggleContentClosed}>
                <FA icon={this.state.isClosed ? 'chevron-down' : 'chevron-up'} />
            </span>
        );

        let iboxTitle = null;
        if (this.props.title !== undefined) {
            iboxTitle = <IBoxTitle text={this.props.title} tools={tools} />
        }

        return (
            <IBox className={this.props.className}>
                {iboxTitle}

                <Collapse isOpened={!this.state.isClosed}>
                    <IBoxContent children={this.props.children} />
                </Collapse>
            </IBox>
        );
    }
}

export default IBoxTemplateBasic;