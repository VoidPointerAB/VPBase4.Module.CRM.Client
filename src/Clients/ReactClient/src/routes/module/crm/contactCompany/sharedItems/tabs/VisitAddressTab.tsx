import React from 'react';
import { Field } from "formik";
import { Translation } from 'react-i18next';

import { TextInput, Select } from 'components/module/Form';
import { IOptionsProps } from 'components/module/crm/interfaceOption';

interface IVisitAdressProps {
    countryOptions: IOptionsProps[],
    onClear(): void
}

const VisitAddressTab = (props: IVisitAdressProps) => {
    return (
        <Translation>
            {(t) =>
            <section className="col-xl-6  mb-4">
                <h2 className="pb-2 mb-3 border-bottom">{t('addresses.visitAddress')}</h2>
                <Field name="visitAddStr" title={t("formLabels.street")} component={TextInput} />
                <div className="row">
                    <div className="col-sm-6">
                        <Field name="visitAddressPNbr" title={t("formLabels.postCode")} component={TextInput} />
                    </div>
                    <div className="col-sm-6">
                        <Field name="visitAddressCty" title={t("formLabels.city")} component={TextInput} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 country-select">
                        <Field name="visitAddressCountryId" title={t('formLabels.country')} options={props.countryOptions} placeholder={t('placeholders.chooseCountry')} canClear={true} component={Select} />
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group" style={{marginTop: '28px'}}>
                            <button className="btn btn-default form-control ml-auto" type="button" onClick={props.onClear} style={{width: '100px'}}>{t('buttonLabels.Clear')}</button>
                        </div>
                    </div>
                </div>
            </section>    
            }
        </Translation>
    )
}

export default VisitAddressTab