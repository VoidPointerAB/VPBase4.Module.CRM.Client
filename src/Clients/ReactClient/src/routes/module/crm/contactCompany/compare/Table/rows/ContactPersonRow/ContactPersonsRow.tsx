import React from 'react';
import { Translation } from 'react-i18next';

import DisplayContactPerson from './DisplayContactPerson';
import { IContactPerson } from '../../../compare';
import TransferIcon from '../../../TransferIcon';

interface IContactPersonRowProps {
    initialRightValue: IContactPerson[];
    initialLeftValue: IContactPerson[];
    formikBag: any;
}
class ContactPersonsRow extends React.Component<IContactPersonRowProps> {
    public handleTransfer = () => {
        this.props.formikBag.setFieldValue('transferContactPersons', true, false);
        this.props.formikBag.setFieldTouched('transferContactPersons')
        this.forceUpdate();
    };

    public render() {
        const { initialRightValue, initialLeftValue } = this.props;
        const transferContactPersons = this.props.formikBag.values.transferContactPersons;
        const leftValue = transferContactPersons
            ? [...initialLeftValue, ...initialRightValue]
            : initialLeftValue;

        const rightCell = (
            <td className="cell">
                <div className={transferContactPersons ? 'd-flex flex-column' : 'd-flex'}>
                    {transferContactPersons || initialRightValue.length === 0 ? (
                        <DisplayContactPerson contactPersons={initialRightValue} />
                    ) : (
                        <>
                            <TransferIcon handleTransfer={this.handleTransfer} />
                            <div className="d-flex flex-column">
                                <DisplayContactPerson contactPersons={initialRightValue} />
                            </div>
                        </>
                    )}
                </div>
            </td>
        );

        const leftCell = (
            <td className="text-center cell">
                <DisplayContactPerson contactPersons={leftValue} />
            </td>
        );

        return (
            <Translation>
                {(t) =>
                    <tr className="company-contactPersons-row">
                        <th scope="row">{t('compare.contactPersons')}</th>
                        {leftCell}
                        {rightCell}
                    </tr>
                } 
            </Translation>
        );
    }
}

export default ContactPersonsRow;
