import React from 'react';

import PostAddressTab from './PostAddressTab';
import VisitAddressTab from './VisitAddressTab';
import { IOptionsProps } from 'components/module/crm/interfaceOption';

interface IAddressTabProps {
    countryOptions: IOptionsProps[];
    formikBag?: any;
}

class AddressTab extends React.Component<IAddressTabProps> {
    public constructor(props: IAddressTabProps) {
        super(props);

        if (props.formikBag.values.usingCompanyPostAddress) {
            this.useCompanyPostAddressChanged(true);
        }

        if (props.formikBag.values.usingCompanyVisitAddress) {
            this.useCompanyVisitAddressChanged(true);
        }
    }

    public useCompanyVisitAddressChanged = (usingCompanyVisitAddress: boolean) => {
        const setFieldValue = this.props.formikBag.setFieldValue;

        setFieldValue('visitAddressId', '');
        setFieldValue('visitAdStr', '');
        setFieldValue('visitAddressPNbr', '');
        setFieldValue('visitAddressCty', '');
        setFieldValue('visitAddressCountryId', null);
        setFieldValue('usingCompanyVisitAddress', usingCompanyVisitAddress);
    };

    public useCompanyPostAddressChanged = (usingCompanyPostAddress: boolean) => {
        const setFieldValue = this.props.formikBag.setFieldValue;

        setFieldValue('postAddressId', '');
        setFieldValue('postAdStr', '');
        setFieldValue('postAddressPNbr', '');
        setFieldValue('postAddressCty', '');
        setFieldValue('postAddressCountryId', null);
        setFieldValue('usingCompanyPostAddress', usingCompanyPostAddress);
    };

    public clearVisitFields = () => {
        const { setFieldValue, setFieldTouched } = this.props.formikBag;
        setFieldValue('visitAddressId', '');
        setFieldValue('visitAdStr', '');
        setFieldValue('visitAddressPNbr', '');
        setFieldValue('visitAddressCty', '');
        setFieldValue('visitAddressCountryId', null);
        setFieldTouched('visitAddressId', false, false);
        setFieldTouched('visitAdStr', false, false);
        setFieldTouched('visitAddressPNbr', false, false);
        setFieldTouched('visitAddressCty', false, false);
        setFieldTouched('visitAddressCountryId', false, false);
    };

    public clearPostFields = () => {
        const { setFieldValue, setFieldTouched } = this.props.formikBag;
        setFieldValue('postAddressId', '');
        setFieldValue('postAdStr', '');
        setFieldValue('postAddressPNbr', '');
        setFieldValue('postAddressCty', '');
        setFieldValue('postAddressCountryId', null);
        setFieldTouched('postAddressId', false, false);
        setFieldTouched('postAdStr', false, false);
        setFieldTouched('postAddressPNbr', false, false);
        setFieldTouched('postAddressCty', false, false);
        setFieldTouched('postAddressCountryId', false, false);
    };

    public render() {
        return (
            <div className="row">
                <PostAddressTab
                    formikBag={{ ...this.props.formikBag }}
                    useCompanyPostAddressChanged={this.useCompanyPostAddressChanged}
                    countryOptions={this.props.countryOptions}
                    onClear={this.clearPostFields}
                />
                <VisitAddressTab
                    formikBag={this.props.formikBag}
                    useCompanyVisitAddressChanged={this.useCompanyVisitAddressChanged}
                    countryOptions={this.props.countryOptions}
                    onClear={this.clearVisitFields}
                />
            </div>
        );
    }
}
export default AddressTab;
