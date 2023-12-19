import React from 'react';
import { Translation } from 'react-i18next';

interface IHeaderMatchProps {
    leftName: string;
    rightName: string;
    handleDismiss(): void;
}

class HeaderMatch extends React.Component<IHeaderMatchProps> {
    public render() {
        const { rightName: rightCompanyName, leftName: leftCompanyName } = this.props;
        return (
            <Translation>
                {(t) =>
                    <div className="d-flex justify-content-between w-100">
                        <h2 className="mr-auto">
                            {leftCompanyName} - {rightCompanyName}
                        </h2>
                        <button className="btn btn-danger ml-auto" onClick={()=> this.props.handleDismiss()}>
                            {t('buttonLabels.dismissThisMatch')}
                        </button>
                    </div>
                }
            </Translation>
        );
    }
}

export default HeaderMatch;
