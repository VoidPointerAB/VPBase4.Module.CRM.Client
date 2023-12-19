import * as Yup from 'yup';
import i18next from 'i18next';

export function formValidation(){
    return Yup.object().shape({
        title: Yup.string().matches(/(^[^\s][a-zA-ZéëäöåÈÉÄÖÅ .]*$)/, i18next.t('validationsMessages.title')),
        email: Yup.string().email(i18next.t('validationsMessages.invalidEmail')),
        otherEmail: Yup.string().email(i18next.t('validationsMessages.invalidEmail')),
        firstName: Yup.string().matches(/(^[^\s][a-zA-ZéëäöåÈÉÄÖÅ -]*$)/, i18next.t('validationsMessages.isLettersNoMatch')).required(i18next.t('validationsMessages.firstName')),
        lastName: Yup.string().matches(/(^[^\s][a-zA-ZéëäöåÈÉÄÖÅ -]*$)/, {message: i18next.t('validationsMessages.isLettersNoMatch')}),
        postAdStr: Yup.string().when(['postAddressPNbr', 'postAddressCty', 'postAddressCountryId'], (city: any, zipcode: any, country: any, schema: any) => {
            return city !== undefined || zipcode !== undefined  ||  country !== null  ? schema.required(i18next.t('validationsMessages.street')) : schema;
        }),
        postAddressPNbr: Yup.string().when(['postAdStr','postAddressCty', 'postAddressCountryId'], ( street: any, city: any, country: any, schema: any) => {
            return street !== undefined || city !== undefined || country !== null ? schema.required(i18next.t('validationsMessages.postCode')) : schema;
        }),
        postAddressCty: Yup.string().when(['postAdtreet', 'postAddressPNbr', 'postAddressCountryId'], (street: any, zipcode: any, country: any, schema: any) => {
            return street !== undefined || zipcode !== undefined || country !== null  ? schema.required(i18next.t('validationsMessages.city')) : schema;
        }),
        postAddressCountryId: Yup.string().nullable(true).when(['postAdStr'], (street: any, schema: any) => {
            return street !== undefined ? schema.required(i18next.t('validationsMessages.country')) : schema ;
        }),
        visitAdStr: Yup.string().when(['visitAddressPNbr', 'visitAddressCty', 'visitAddressCountryId'], (city: any, zipcode: any, country: any, schema: any) => {
            return city !== undefined || zipcode !== undefined  ||  country !== null  ? schema.required(i18next.t('validationsMessages.street')) : schema;
        }),
        visitAddressPNbr: Yup.string().when(['visitAdStr','visitAddressCty', 'visitAddressCountryId'], ( street: any, city: any, country: any, schema: any) => {
            return street !== undefined || city !== undefined || country !== null ? schema.required(i18next.t('validationsMessages.postCode')) : schema;
        }),
        visitAddressCty: Yup.string().when(['visitAdStr', 'visitAddressPNbr', 'visitAddressCountryId'], (street: any, zipcode: any, country: any, schema: any) => {
            return street !== undefined || zipcode !== undefined || country !== null  ? schema.required(i18next.t('validationsMessages.city')) : schema;
        }),
        visitAddressCountryId: Yup.string().nullable(true).when(['visitAdStr'], (street: any, schema: any) => {
            return street !== undefined ? schema.required(i18next.t('validationsMessages.country')) : schema ;
        }),
    }, [['postAdStr', 'postAddressPNbr'],['postAdStr','postAddressCty'],['postAdStr', 'postAddressCountryId'],['postAddressPNbr','postAddressCty'],['postAddressCty', 'postAddressCountryId'],
    ['visitAdStr', 'visitAddressPNbr'],['visitAdStr','visitAddressCty'],['visitAdStr', 'visitAddressCountryId'],['visitAddressPNbr','visitAddressCty'],['visitAddressCty', 'visitAddressCountryId']],
    )
}