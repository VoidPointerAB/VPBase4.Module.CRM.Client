import React from 'react';
import { Field } from "formik";
import moment from 'moment';
import { Translation } from 'react-i18next';

import { TextInput, MemoizedValueSelect } from 'components/module/Form';
import { StarCheckbox } from 'components/module/crm/StarCheckBox/StarCheckbox';
import { IOptionsProps } from 'components/module/crm/interfaceOption';
import  { DateInput} from 'components/module/Form';

interface IDetailsTabProps {
    companyOptions: IOptionsProps[],
    formikBag: any,
}

class DetailsTab extends React.Component<IDetailsTabProps> {
    
    public onChangeCallback = () => {
        const formikBag = this.props.formikBag
        const formikValues = this.props.formikBag.values
        if(formikValues.contactCompanyId === null) {
            formikBag.setFieldValue('usingCompanyPostAddress', false)
            formikBag.setFieldValue('usingCompanyVisitAddress', false)
        }
    }

    public render() {
        const mask = [/\d/, /\d/, /\d/, /\d/,"/",/\d/, /\d/, "/", /\d/, /\d/]
        const filterDate = (date: moment.Moment) => {
            return moment() > date;
        }
        return (
            <Translation>
                {(t) => 
                    <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-12">
                            <Field name="firstName" title={`${t("formLabels.firstName")} *`} component={TextInput} />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-12">
                            <Field name="lastName" title={t("formLabels.lastName")}component={TextInput} />
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-12">
                            <Field name="birthday" type="text" title={t("formLabels.birthday")} mask={mask} filterDate={filterDate} component={DateInput} />
                        </div>
                        <div className="col-xl-1 col-lg-1 col-sm-12">
                            <Field name="isUserFavorite" title={t("formLabels.favorite")} component={StarCheckbox}/>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-12">
                            <Field name="title" type="text" title={t("formLabels.title")} component={TextInput} />
                        </div>
                        <div className="col-xl-5 col-sm-12">
                            <Field name="contactCompanyId" title={t("formLabels.company")} canClear={true} placeholder={t('placeholders.chooseCompany')} options={this.props.companyOptions} isClearable={true} onChangeCallback={this.onChangeCallback} component={MemoizedValueSelect} />
                        </div>
                    </div>
                }
            </Translation>
        )
    }
}      

export default DetailsTab 
