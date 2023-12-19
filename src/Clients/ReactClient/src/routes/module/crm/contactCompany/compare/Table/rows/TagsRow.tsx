import React from 'react'; 
import { Translation } from 'react-i18next';
import { Field } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MultiCreateSelect } from 'components/module/Form';

interface ITagRowProps {
    rightValue: string[] | null,
    leftValue: string[] | null,
    formikBag: any
}

class TagsRow extends React.Component<ITagRowProps, any> {

    public handleTransfer = () => {
        const tags: any = []

        if(!this.props.leftValue || !this.props.rightValue) {
            return null;
        }

        if(this.props.leftValue.length) {
            this.props.leftValue.forEach((item: any) => {
                tags.push({ value: item, label: item })
            })
        }

        this.props.rightValue.forEach((item: any) => {
            tags.push({ value: item, label: item })
        })
        this.props.formikBag.setFieldValue('tags', tags)
        this.props.formikBag.setFieldTouched('tags')
    }

    public render() {
        const { rightValue, leftValue} = this.props;

        if (!rightValue) {
            return null;
        }

        const tagsDisplay = rightValue ? rightValue.map(tag => <span key={tag} className="ml-4 tags-table">{tag}</span>) : null

        const rightCell = <td  className="text-center cell">
                            <div className="d-flex">
                            { leftValue === rightValue || rightValue.length === 0
                                ? tagsDisplay 
                                : <span className="mr-4" onClick={this.handleTransfer}>
                                    <FontAwesomeIcon icon="caret-left" size="2x" color="#1ab394" />
                                    {tagsDisplay}
                                </span>
                            }
                            </div>
                          </td>
        
        const leftCell = <td className="text-center cell">
                            <Field 
                                name="tags" 
                                canClear={true} 
                                type="text" 
                                mask={new RegExp('/[^a-zäöåÄÖÅ0-9_]/', "gi")}
                                component={MultiCreateSelect} 
                                />
                         </td>
        return (
            <Translation>
                {(t) =>
                    <tr className="company-tags-row">
                        <th scope="row">{t('compare.tags')}</th>  
                        {leftCell}                 
                        {rightCell}
                    </tr>
                }
            </Translation>
        )
    }
}

export default TagsRow;