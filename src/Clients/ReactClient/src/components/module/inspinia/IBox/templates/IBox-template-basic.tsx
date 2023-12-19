import React from 'react';

import { IBox, IBoxContent, IBoxTitle } from '../IBox';

interface IBoxTemplateBasicProps {
    className?: string,
    title?: string,
}

class IBoxTemplateBasic extends React.Component<IBoxTemplateBasicProps, any> {

    public render() {
        let iboxTitle = null;
        if (this.props.title !== undefined) {
            iboxTitle = <IBoxTitle text={this.props.title} />
        }

        return (
            <IBox className={this.props.className}>
                {iboxTitle}

                <IBoxContent children={this.props.children} />
            </IBox>
        );
    }
}

export default IBoxTemplateBasic;