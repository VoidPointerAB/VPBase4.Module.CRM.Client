import React from 'react'

import { IOptionsProps } from 'components/module/crm/interfaceOption';
import PostAddressTab from './PostAddressTab';
import VisitAddressTab from './VisitAddressTab';

interface IAddressCompanyTabsProps {
    countryOptions: IOptionsProps[],
    formikBag: any
}

class AddressTab extends React.Component<IAddressCompanyTabsProps> {

    public clearVisitFields = () => {
        this.props.formikBag.setFieldValue('visitAddressId', '')
            this.props.formikBag.setFieldValue('visitAddStr', '')
            this.props.formikBag.setFieldValue('visitAddressPNbr', '')
            this.props.formikBag.setFieldValue('visitAddressCty', '')
            this.props.formikBag.setFieldValue('visitAddressCountryId', null)
    }

    public clearPostFields = () => {
            this.props.formikBag.setFieldValue('postAddressId', '')
            this.props.formikBag.setFieldValue('postAddStr', '')
            this.props.formikBag.setFieldValue('postAddressPNbr', '')
            this.props.formikBag.setFieldValue('postAddressCty', '')
            this.props.formikBag.setFieldValue('postAddressCountryId', null)
    }

    public render() {
        return (
            <div className="row">
                <PostAddressTab countryOptions={this.props.countryOptions} onClear={this.clearPostFields} />
                <VisitAddressTab countryOptions={this.props.countryOptions} onClear={this.clearVisitFields} />
            </div>
        )
    }
}

export default AddressTab