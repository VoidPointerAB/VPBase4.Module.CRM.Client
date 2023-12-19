import React from 'react';
import { Translation } from 'react-i18next';

import { IBox, IBoxContent } from 'components/module/inspinia/IBox/IBox';

interface INoDataProps {
    message?: string,
    children?: any
}

const NoData = ({message, children}: INoDataProps) => {
    return (
        <Translation>
            {(t) =>
                <IBox className="d-flex flex-row no-gutters mb-0">
                    <IBoxContent className="col-sm-12 p-3 text-center border-0">
                        {message ? message : t('noData.default')}
                        {children}
                    </IBoxContent>
                </IBox>
            }
        </Translation>
    )
}

export default NoData