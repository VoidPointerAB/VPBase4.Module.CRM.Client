import React from 'react';

export interface IAddress {
    addressId: string,
    street: string,
    postCode: string,
    city: string,
    addressType: 'PostAddress' | 'VisitAddress',
    country: { countryId: string, name: string } | null,
}


const Address = (address: IAddress) => {
    return (
        <div key={address.addressId}>
            <p>{address.street}</p>
            <p>{address.postCode} <span>{address.city}</span></p>
            <p>{address.country ? address.country.name : ''}</p>
        </div>
    )
}

export default Address