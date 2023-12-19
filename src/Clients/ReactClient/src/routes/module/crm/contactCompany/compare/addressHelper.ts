import {IAddress} from 'components/module/crm/Address';

export function getAddressesForCompanyByType(company: any, type: IAddress['addressType']): IAddress {
    const defaultAddressData: IAddress = {
        addressId: '',
        street: '',
        postCode: '',
        city: '',
        addressType: type,
        country: { name: '', countryId: '' },
    };

    if (!(company && company.addresses)) {
        return defaultAddressData;
    }

    const filteredAddress = company.addresses.filter((address: any) => address.addressType === type)[0];
    const foundAddress = filteredAddress !== undefined;

    return foundAddress ? { ...defaultAddressData, ...filteredAddress} : defaultAddressData;
}

export function getAddressesForCompany(company: any): { post: IAddress, visit: IAddress } {
    return {
        post: getAddressesForCompanyByType(company, 'PostAddress'),
        visit: getAddressesForCompanyByType(company, 'VisitAddress'),
    }
}

export function companyHasAddressType(company: any, type: IAddress['addressType']): boolean {
    if (company.addresses.length === 0) {
        return false;
    }

    const filteredAddress = company.addresses.filter((address: any) => address.addressType === type)[0]

    for (const key in filteredAddress) {
        if (key !== 'addressType' && filteredAddress[key]) {
            return true;
        }
    }

    return false;
}