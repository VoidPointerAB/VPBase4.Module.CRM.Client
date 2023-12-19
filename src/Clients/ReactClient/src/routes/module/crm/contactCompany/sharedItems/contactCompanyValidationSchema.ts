import * as Yup from 'yup';
import i18next from 'i18next';

export function formValidation() {
    return Yup.object().shape({
        email: Yup.string().email(i18next.t('validationsMessages.invalidEmail')),
        name: Yup.string().required(i18next.t('validationsMessages.companyNameRequired')).min(4, i18next.t('validationsMessages.min4')),
        segment:  Yup.array().of(
            Yup.object().shape({
                label: Yup.string().max(150, i18next.t('validationsMessages.segmentsMaxLength')).matches(/(^[a-zA-ZéëäöåÈÉÄÖÅ ]*$)/, i18next.t('validationsMessages.segmentNotMatch')).trim(),
            })
        ),
        postAddStr: Yup.string().when(['postAddressPNbr', 'postAddressCty', 'postAddressCountryId'], (city: any, zipcode: any, country: any, schema: any) => {
            return city !== undefined || zipcode !== undefined  ||  country !== null  ? schema.required(i18next.t('validationsMessages.street')) : schema;
        }),
        postAddressPNbr: Yup.string().when(['postAddStr','postAddressCty', 'postAddressCountryId'], ( street: any, city: any, country: any, schema: any) => {
            return street !== undefined || city !== undefined || country !== null ? schema.required(i18next.t('validationsMessages.postCode')) : schema;
        }),
        postAddressCty: Yup.string().when(['postAddStr', 'postAddressPNbr', 'postAddressCountryId'], (street: any, zipcode: any, country: any, schema: any) => {
            return street !== undefined || zipcode !== undefined || country !== null  ? schema.required(i18next.t('validationsMessages.city')) : schema;
        }),
        postAddressCountryId: Yup.string().nullable(true).when(['postAddStr'], (street: any, schema: any) => {
            return street !== undefined ? schema.required(i18next.t('validationsMessages.country')) : schema ;
        }),
        visitAddStr: Yup.string().when(['visitAddressPNbr', 'visitAddressCty', 'visitAddressCountryId'], (city: any, zipcode: any, country: any, schema: any) => {
            return city !== undefined || zipcode !== undefined  ||  country !== null  ? schema.required(i18next.t('validationsMessages.street')) : schema;
        }),
        visitAddressPNbr: Yup.string().when(['visitAddStr','visitAddressCty', 'visitAddressCountryId'], ( street: any, city: any, country: any, schema: any) => {
            return street !== undefined || city !== undefined || country !== null ? schema.required(i18next.t('validationsMessages.postCode')) : schema;
        }),
        visitAddressCty: Yup.string().when(['visitAddStr', 'visitAddressPNbr', 'visitAddressCountryId'], (street: any, zipcode: any, country: any, schema: any) => {
            return street !== undefined || zipcode !== undefined || country !== null  ? schema.required(i18next.t('validationsMessages.city')) : schema;
        }),
        visitAddressCountryId: Yup.string().nullable(true).when(['visitAddStr'], (street: any, schema: any) => {
            return street !== undefined ? schema.required(i18next.t('validationsMessages.country')) : schema ;
        }),
    }, [['postAddStr', 'postAddressPNbr'],['postAddStr','postAddressCty'],['postAddStr', 'postAddressCountryId'],['postAddressPNbr','postAddressCty'],['postAddressCty', 'postAddressCountryId'],
    ['visitAddStr', 'visitAddressPNbr'],['visitAddStr','visitAddressCty'],['visitAddStr', 'visitAddressCountryId'],['visitAddressPNbr','visitAddressCty'],['visitAddressCty', 'visitAddressCountryId']],
    )}
