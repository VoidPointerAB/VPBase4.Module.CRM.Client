import React from 'react'; 

import TransferIcon from '../../TransferIcon';

interface IContactCompanyRowProps {
    rightValue: {name: string, contactCompanyId: string},
    leftValue: {name: string, contactCompanyId: string},
    rowName: string,
    fieldName: string,
    formikBag: any,
}

class ContactCompanyRow extends React.Component<IContactCompanyRowProps> {
    state = {
        transferred: false
    }

    public handleTransfer = () => {
        this.props.formikBag.setFieldValue(this.props.fieldName, this.props.rightValue.contactCompanyId)
        this.props.formikBag.setFieldTouched(this.props.fieldName)
        this.setState({transferred: true})
    }

    public render() {   
        const {
            rightValue,
            leftValue,
            rowName,
        } = this.props;
        
        if (!(leftValue || rightValue) ||
            (leftValue && rightValue && leftValue.contactCompanyId === rightValue.contactCompanyId)) {
            return null;
        }
        
        const leftCell = (
            <td className="text-left cell">
                {leftValue || this.state.transferred 
                ? <span className="left-name">{this.state.transferred ? rightValue.name : leftValue.name}</span>
                : null
            }
            </td>
            )

        const rightCell = (
            <td  className="text-center cell">
                <div className="d-flex align-items-center">
                {  rightValue 
                    ? 
                        <>
                            {!this.state.transferred && <TransferIcon  handleTransfer={this.handleTransfer} />}
                            <span className="mr-auto">{rightValue.name}</span>
                        </>
                    : 
                        null
                }
                </div>
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

export default ContactCompanyRow;
