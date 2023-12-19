import React from 'react';
import { Field } from "formik";
import { Translation } from 'react-i18next';

import { TextArea, MultiCreateSelect } from 'components/module/Form';
import { IOption } from 'components/module/crm/interfaceOption';

const OtherTab= (props: IOption) => {
    return (
        <Translation>
            {(t) =>
                <div className="row">
                    <div className="col-xl-6 col-lg-12">
                        <Field name="tags" canClear={true} title={t("formLabels.tags")} placeholder={t('placeholders.chooseTags')} options={props.tags} component={MultiCreateSelect} mask={new RegExp('/[^a-zäöåÄÖÅ0-9_]/', "gi")} />
                    </div>
                    <div className="col-xl-6 col-lg-12">
                        <Field name="note" title={t("formLabels.note")} component={TextArea} />
                    </div>
                </div>
            }
        </Translation>
    )
}

export default OtherTab