import React from 'react';
import { Field } from "formik";
import { Translation } from 'react-i18next';

import { TextInput } from 'components/module/Form';

const ContactTab = () => {
    const pattern = "[+()0-9 -]{0,16}"
    return (
        <Translation>
            {(t) =>
                <div className="row">
                    <div className="col-xl-4 col-lg-6 col-md-12">
                        <Field name="email" title={t("formLabels.email")} component={TextInput} />
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-12">
                        <Field name="website" title={t("formLabels.website")} component={TextInput} />
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-12">
                        <Field name="phone" type="tel" title={t("formLabels.phone" )}component={TextInput} pattern={pattern} />
                    </div>
                </div>
            }
        </Translation>
    )
}

export default ContactTab