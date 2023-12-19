import React from 'react';
import { Field } from "formik";

import { Checkbox } from 'components/module/Form';
import TransferIcon from '../../TransferIcon';

interface IUsingCompanyAddressRow {
    rightValue: boolean,
    leftValue: boolean,
    fieldName: string,
    rowName: string,
    formikBag: any,
}

class UsingCompanyAddressRow extends React.Component<IUsingCompanyAddressRow, any> { 
    state={
        checked: this.props.leftValue
    }
    public handleTransfer = () => {
        this.setState({checked: this.props.rightValue})
        this.props.formikBag.setFieldValue(this.props.fieldName, this.props.rightValue)
        this.props.formikBag.setFieldTouched(this.props.fieldName)
    }

    public render () {
        const {
            rightValue,
            leftValue,
            rowName,
            fieldName,
        } = this.props;
        

        const rightValueString = rightValue === true ? 'Yes' : 'No';

        const rightCell = (
            <td  className="text-center cell">
                <div className="d-flex align-items-center">
                { leftValue === rightValue  
                    ? <span className="ml-4 pt-2">{rightValueString}</span> 
                    : 
                    <>
                        <TransferIcon  handleTransfer={this.handleTransfer} />
                        <span>{rightValueString}</span>
                    </>
                }
                </div>
            </td>
        )
        
        const leftCell = (
        <td className="text-center cell">
            <Field name={fieldName} component={Checkbox} />
        </td>
        )
        
        return (
            <tr className="company_left">
                <th scope="row">{rowName}</th>  
                    {leftCell}                 
                    {rightCell}
            </tr>
        )
    }
}

export default UsingCompanyAddressRow;