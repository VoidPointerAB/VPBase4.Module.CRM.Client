import React from 'react'; 

import { Field } from "formik";

import { TextInput } from 'components/module/Form';
import TransferIcon from '../../TransferIcon';

interface IGenericProps {
    rightValue: string | null,
    leftValue: string | null,
    rowName: string,
    fieldName: string,
    formikBag: any,
    fieldProps?: {type: string, component: any, [key: string]: any},
}

class GenericRow extends React.Component<IGenericProps> {

    public handleTransfer = () => {
        this.props.formikBag.setFieldValue(this.props.fieldName, this.props.rightValue)
        this.props.formikBag.setFieldTouched(this.props.fieldName)
    }

    public render() {   
        const {
            rightValue,
            leftValue,
            rowName,
            fieldName,
            fieldProps
        } = this.props;
        
        const rightCell = (
            <td  className="text-center cell">
                <div className="d-flex align-items-center">
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
            { fieldProps 
                ? <Field name={fieldName} {...fieldProps} />
                : <Field name={fieldName} type="text" component={TextInput} />
            }
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

export default GenericRow ;