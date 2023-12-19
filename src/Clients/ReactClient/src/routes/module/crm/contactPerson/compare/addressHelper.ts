import {IAddress} from 'components/module/crm/Address';

export function getAddressesForPersonByType(person: any, type: IAddress['addressType']): IAddress {
    const defaultAddressData: IAddress = {
        addressId: '',
        street: '',
        postCode: '',
        city: '',
        addressType: type,
        country: { name: '', countryId: '' },
    };

    if (!(person && person.addresses)) {
        return defaultAddressData;
    }

    const filteredAddress = person.addresses.filter((address: any) => address.addressType === type)[0];
    const foundAddress = filteredAddress !== undefined;

    return foundAddress ? { ...defaultAddressData, ...filteredAddress} : defaultAddressData;
}

export function getAddressesForPerson(person: any): { post: IAddress, visit: IAddress } {
    return {
        post: getAddressesForPersonByType(person, 'PostAddress'),
        visit: getAddressesForPersonByType(person, 'VisitAddress'),
    }
}

export function personHasAddressType(person: any, type: IAddress['addressType']): boolean {
    if (person.addresses.length === 0) {
        return false;
    }

    const filteredAddress = person.addresses.filter((address: any) => address.addressType === type)[0]

    for (const key in filteredAddress) {
        if (key !== 'addressType' && filteredAddress[key]) {
            return true;
        }
    }

    return false;
}