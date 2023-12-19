import React, { useState } from 'react';
import { Field } from 'formik';
import { Translation } from 'react-i18next';

import { TextInput, Checkbox, Select } from 'components/module/Form/';
import { IOptionsProps } from 'components/module/crm/interfaceOption';

interface IAddressTabProps {
    countryOptions: IOptionsProps[];
    formikBag: any;
    onClear(): void;
    useCompanyVisitAddressChanged(isChecked: boolean): void;
}

const VisitAddressTab = (props: IAddressTabProps) => {
    const [useCompanyAddress, setUseCompanyAddress] = useState(
        props.formikBag.values.usingCompanyVisitAddress
    );

    const handleUseCompanyAddressChange = (e: any) => {
        setUseCompanyAddress(e.target.checked);
        props.useCompanyVisitAddressChanged(e.target.checked);
    };

    return (
        <Translation>
            {t => (
                <section className="col-xl-6  mb-4">
                    <h2 className="pb-2 mb-3 border-bottom">{t('addresses.visitAddress')}</h2>
                    <Field
                        onChange={handleUseCompanyAddressChange}
                        name="usingCompanyVisitAddress"
                        title={t('formLabels.useCompanyVisitAddress')}
                        component={Checkbox}
                        disabled={props.formikBag.values.contactCompanyId === null ? true : false}
                    />
                    <Field
                        name="visitAdStr"
                        title={t('formLabels.street')}
                        component={TextInput}
                        disabled={useCompanyAddress}
                    />
                    <div className="row">
                        <div className="col-sm-6">
                            <Field
                                name="visitAddressPNbr"
                                title={t('formLabels.postCode')}
                                component={TextInput}
                                disabled={useCompanyAddress}
                            />
                        </div>
                        <div className="col-sm-6">
                            <Field
                                name="visitAddressCty"
                                title={t('formLabels.city')}
                                component={TextInput}
                                disabled={useCompanyAddress}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 country-select">
                            <Field
                                name="visitAddressCountryId"
                                title={t('formLabels.country')}
                                options={props.countryOptions}
                                placeholder={t('placeholders.chooseCountry')}
                                canClear={true}
                                component={Select}
                                isDisabled={useCompanyAddress}
                            />
                        </div>
                        {!useCompanyAddress && (
                            <div className="col-lg-6">
                                <div className="form-group" style={{ marginTop: '28px' }}>
                                    <button
                                        className="btn btn-default form-control ml-auto"
                                        type="button"
                                        onClick={props.onClear}
                                        style={{ width: '100px' }}
                                    >
                                        {t('buttonLabels.Clear')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </Translation>
    );
};

export default VisitAddressTab;
