import React from 'react';
import { Field } from "formik";
import { Translation } from 'react-i18next';

import { TextInput } from 'components/module/Form/';

const ContactTab = () => {
    const pattern = "[+()0-9 -]{0,16}"
    return (
        <Translation>
            {(t) =>
                <div className="row">
                    <div className="col-xl-4 col-lg-6 col-md-12">
                        <Field name="email" title={t("formLabels.email")} component={TextInput} />
                        <Field name="otherEmail" title={t("formLabels.otherEmail")} component={TextInput} />
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-12">
                        <Field name="mainPhone" type="tel" title={t("formLabels.phone")} pattern={pattern} component={TextInput} />
                        <Field name="workPhone" type="tel" title={t("formLabels.workPhone" )}pattern={pattern} component={TextInput} />
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-12">
                        <Field name="website" title={t("formLabels.website")} component={TextInput} />
                        <Field name="skype" title="Skype" component={TextInput} />
                    </div>
                </div>
            }
        </Translation>
    )
}

export default ContactTab