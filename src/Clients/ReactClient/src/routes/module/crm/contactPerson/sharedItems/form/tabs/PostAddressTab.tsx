import React, { useState } from 'react';
import { Field } from 'formik';
import { Translation } from 'react-i18next';

import { TextInput, Checkbox, Select } from 'components/module/Form/';
import { IOptionsProps } from 'components/module/crm/interfaceOption';

interface IAddressTabProps {
    countryOptions: IOptionsProps[];
    formikBag: any;
    onClear(): void;
    useCompanyPostAddressChanged(isChecked: boolean): void;
}

const PostAddressTab = (props: IAddressTabProps) => {
    const [useCompanyAddress, setUseCompanyAddress] = useState(
        props.formikBag.values.usingCompanyPostAddress
    );

    const handleUseCompanyAddressChange = (e: any) => {
        setUseCompanyAddress(e.target.checked);
        props.useCompanyPostAddressChanged(e.target.checked);
    };

    return (
        <Translation>
            {t => (
                <section className="col-xl-6 mb-4 pr-4">
                    <h2 className="pb-2 mb-3 border-bottom">{t('addresses.postAddress')}</h2>
                    <Field
                        onChange={handleUseCompanyAddressChange}
                        name="usingCompanyPostAddress"
                        title={t('formLabels.useCompanyPostAddress')}
                        component={Checkbox}
                        disabled={props.formikBag.values.contactCompanyId === null ? true : false}
                    />
                    <Field
                        name="postAdStr"
                        title={t('formLabels.street')}
                        component={TextInput}
                        disabled={useCompanyAddress}
                    />
                    <div className="row">
                        <div className="col-sm-6">
                            <Field
                                name="postAddressPNbr"
                                title={t('formLabels.postCode')}
                                component={TextInput}
                                disabled={useCompanyAddress}
                            />
                        </div>

                        <div className="col-sm-6">
                            <Field
                                name="postAddressCty"
                                title={t('formLabels.city')}
                                component={TextInput}
                                disabled={useCompanyAddress}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 country-select">
                            <Field
                                name="postAddressCountryId"
                                title={t('formLabels.country')}
                                canClear={true}
                                placeholder={t('placeholders.chooseCountry')}
                                options={props.countryOptions}
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

export default PostAddressTab;
