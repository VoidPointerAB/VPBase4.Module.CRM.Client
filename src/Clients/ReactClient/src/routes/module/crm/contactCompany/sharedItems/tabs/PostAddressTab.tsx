import React from 'react';
import { Translation } from 'react-i18next';
import { Field } from "formik";

import { TextInput, Select } from 'components/module/Form';
import { IOptionsProps } from 'components/module/crm/interfaceOption';

interface IPostAdressProps {
    countryOptions: IOptionsProps[],
    onClear(event: any): void
}

const PostAddressTab = (props: IPostAdressProps) => {
    return (
        <Translation>
            {(t) =>
                <section className="col-xl-6 mb-4 pr-4">
                    <h2 className="pb-2 mb-3 border-bottom">{t('addresses.postAddress')}</h2>
                    <Field name="postAddStr" title={t("formLabels.street" )} component={TextInput}/>
                    <div className="row">
                        <div className="col-sm-6">
                            <Field name="postAddressPNbr" title={t("formLabels.postCode")} component={TextInput} />
                        </div>
                        <div className="col-sm-6">
                            <Field name="postAddressCty" title={t("formLabels.city")} component={TextInput} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 country-select">
                            <Field name="postAddressCountryId" title={t("formLabels.country")} canClear={true} placeholder={t('placeholders.chooseCountry')} options={props.countryOptions} component={Select} />
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group" style={{marginTop: '28px'}}>
                                <button className="btn btn-default form-control ml-auto" name="clearFieldsPost" type="button" onClick={props.onClear} style={{width: '100px'}}>{t('buttonLabels.Clear')}</button>
                            </div>
                        </div>
                    </div>
                </section>    
            }
        </Translation>
    )
}

export default PostAddressTab