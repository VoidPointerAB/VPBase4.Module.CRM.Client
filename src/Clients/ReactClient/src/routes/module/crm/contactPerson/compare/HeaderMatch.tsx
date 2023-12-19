import React from 'react'; 
import { Translation } from 'react-i18next';

interface IHeaderMatchProps {
    rightPersonName: string,
    leftPersonName: string,
    handleDismiss(): void;
}

class HeaderMatch extends React.Component<IHeaderMatchProps> {
    public render() {
        const {rightPersonName, leftPersonName} = this.props;
        return(
            <Translation>
                {(t) =>
                    <div className="d-flex justify-content-between w-100">
                        <h2 className="mr-auto">{leftPersonName} - {rightPersonName}</h2>
                        <button className="btn btn-danger ml-auto" onClick={() => this.props.handleDismiss()}>
                            {t('buttonLabels.dismissThisMatch')}
                        </button>
                    </div>
                }
            </Translation>
        )
    }
}

export default HeaderMatch;