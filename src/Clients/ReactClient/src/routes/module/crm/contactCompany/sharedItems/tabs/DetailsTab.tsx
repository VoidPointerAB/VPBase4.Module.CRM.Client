import React from 'react';
import { Translation } from 'react-i18next';
import { Field } from "formik";

import { TextInput, MultiCreateSelect } from 'components/module/Form';
import { StarCheckbox } from 'components/module/crm/StarCheckBox/StarCheckbox'
import { IOption } from 'components/module/crm/interfaceOption'

const DetailsTab = (props: IOption) => {
    return (
        <Translation>
            {(t) =>
                <div className="row">
                    <div className="col-xl-4 col-lg-6 col-md-12">
                        <Field name="name" title={`${t("formLabels.companyName")} *`} component={TextInput} />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-12">
                        <Field name="organizationNumber" type="text" title={t("formLabels.organizationNumber")} component={TextInput} />
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-12">
                        <Field name="segment" title={t("formLabels.segment")} canClear={true} placeholder={t('placeholders.chooseSegment')} options={props.segments} component={MultiCreateSelect} />
                    </div>
                    <div className="col-xl-1 col-lg-6 col-sm-12">
                        <Field name="isUserFavorite" title={t("formLabels.favorite")} component={StarCheckbox}  />
                    </div>
                </div>    
            }
        </Translation>
    )
}

export default DetailsTab
