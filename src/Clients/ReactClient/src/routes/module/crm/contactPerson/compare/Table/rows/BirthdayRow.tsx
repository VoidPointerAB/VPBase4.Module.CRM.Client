import React from 'react'; 

import { Field } from "formik";

import { DateInput } from 'components/module/Form';
import TransferIcon from '../../TransferIcon';
import moment from 'moment';
import { serverDateFormat } from 'helpers/module/dateTimeHelper';

interface IBirthdayProps {
    rightValue: string | null,
    leftValue: string | null,
    rowName: string,
    fieldName: string,
    formikBag: any,
}

class BirthdayRow extends React.Component<IBirthdayProps> {

    public handleTransfer = () => {
        const formatedDate = this.props.rightValue === null ? '' : moment(this.props.rightValue, serverDateFormat)
        this.props.formikBag.setFieldValue(this.props.fieldName, formatedDate)
        this.props.formikBag.setFieldTouched(this.props.fieldName)
    }

    public render() {   
        const {
            rightValue,
            leftValue,
            rowName,
            fieldName,
        } = this.props;
        
        const rightCell = (
            <td  className="text-center cell">
                <div className="d-flex">
                { leftValue === rightValue || rightValue === '' || rightValue === null
                    ? <span className="ml-4 pt-2">{rightValue}</span> 
                    : 
                    <>
                        <TransferIcon  handleTransfer={this.handleTransfer} />
                        <span>{rightValue}</span>
                    </>
                }
                </div>
            </td>
        )
        
        const leftCell = (
        <td className="text-center cell">
                <Field name={fieldName} component={DateInput} />
        </td>
        )
        
        return (
            <tr className="company_name">
                <th scope="row">{rowName}</th>  
                    {leftCell}                 
                    {rightCell}
            </tr>
        )
    }
}

export default BirthdayRow;
