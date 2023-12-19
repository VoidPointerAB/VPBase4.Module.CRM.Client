import React from 'react'; 
import i18next from 'i18next'; 
import { Field } from "formik";

import { Select } from 'components/module/Form';
import TransferIcon from '../../TransferIcon';
import { IOptionsProps } from 'components/module/crm/interfaceOption';

interface ICountrySelectProps {
    rightValue: {name: string, id: string},
    leftValue: {name: string, id: string},
    rowName: string,
    fieldName: string,
    formikBag: any,
    options: IOptionsProps,
}

class CountrySelectRow extends React.Component<ICountrySelectProps> {

    public handleTransfer = () => {
        this.props.formikBag.setFieldValue(this.props.fieldName, this.props.rightValue.id)
        this.props.formikBag.setFieldTouched(this.props.fieldName)
    }

    public render() {   
        const {
            rightValue,
            leftValue,
            rowName,
            fieldName,
            options,
        } = this.props;
        
        const rightCell = (
            <td  className="text-center cell">
                <div className="d-flex">
                { leftValue.id === rightValue.id || rightValue.id === '' 
                    ? <span className="ml-4 pt-2">{rightValue.name}</span> 
                    : 
                    <>
                        <TransferIcon  handleTransfer={this.handleTransfer} />
                        <span>{rightValue.name}</span>
                    </>
                }
                </div>
            </td>
        )
        
        const leftCell = (
        <td className="text-center cell">
                <Field name={fieldName} options={options} isClearable={true} placeholder={i18next.t('placeholders.chooseCountry')} component={Select} />
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

export default CountrySelectRow;
