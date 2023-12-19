import React from 'react'; 
import { Translation } from 'react-i18next';
import { Field } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MultiCreateSelect } from 'components/module/Form';

interface ISegmentRowProps {
    rightValue: string[] | null,
    leftValue: string[] | null,
    formikBag: any
}

class SegmentsRow extends React.Component<ISegmentRowProps, any> {

    public handleTransfer = () => {
        const segments: any = []

        if(!this.props.leftValue || !this.props.rightValue) {
            return null;
        }

        if(this.props.leftValue.length) {
            this.props.leftValue.forEach((item: any) => {
                segments.push({ value: item, label: item })
            })
        }

        this.props.rightValue.forEach((item: any) => {
            segments.push({ value: item, label: item })
        })
        this.props.formikBag.setFieldValue('segment', segments)
        this.props.formikBag.setFieldTouched('segment')
    }

    public render() {
        const { rightValue, leftValue} = this.props;

        if (!rightValue) {
            return null;
        }

        const segmentsDisplay = rightValue.map(segment => <span key={segment} className="ml-4 segments-table">{segment}</span> )

        const rightCell = <td  className="text-center cell">
                            <div className="d-flex">
                            { leftValue === rightValue || rightValue.length === 0
                                ? segmentsDisplay
                                : <span onClick={this.handleTransfer}>
                                    <FontAwesomeIcon icon="caret-left" size="2x" color="#1ab394" />
                                    {segmentsDisplay}
                                </span>
                            }
                            </div>
                          </td>
        
        const leftCell = <td className="text-center cell">
                            <Field 
                                name="segment" 
                                canClear={true} 
                                type="text" 
                                mask={new RegExp('[^a-zäöA-ZåÄÖÅ ]', 'gi')} 

                                component={MultiCreateSelect} 
                                />
                         </td>
        return (
            <Translation>
                {(t) =>
                    <tr className="company_name">
                        <th scope="row">{t('compare.segment')}</th>  
                        {leftCell}                 
                        {rightCell}
                    </tr>
                }
            </Translation>    
        )
    }
}

export default SegmentsRow;