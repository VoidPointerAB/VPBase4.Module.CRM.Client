import React from 'react';
import i18next from 'i18next';

import {
    ActivityRow, 
    TagsRow, 
    GenericRow,
    BirthdayRow,
    ContactCompanyRow,
    CountrySelectRow,
    TopInfoToDisplay,
} from './rows';

import { IPerson } from '../compare';
import { IOptionsProps } from 'components/module/crm/interfaceOption';
import { TextArea, TextInput } from 'components/module/Form';
import { getAddressesForPerson, personHasAddressType } from "../addressHelper";
import { CompareCustomRowBuilder } from '../compareCustomRowBuilder';
import UsingCompanyAddressRow from './rows/UsingCompanyAddressRow';
interface ICompareTableProps {
    leftPerson: IPerson,
    rightPerson: IPerson,
    countryOptions: IOptionsProps,
    formikBag: any,
    location: any,
}

class CompareTable extends React.Component<ICompareTableProps> {

    public render() {
        const { leftPerson, rightPerson, countryOptions } = this.props;

        let postAddressGroup: any = null;
        let visitAddressGroup: any = null;
        let lastName: any = null;
        let tagsRow: any = null;
        let activityRow: any = null; 
        let descriptionRow: any = null;
        let phoneRow: any = null;
        let workPhoneRow: any = null;
        let websiteRow: any = null;
        let emailRow: any = null;
        let otherEmailRow: any = null;
        let skypeRow: any = null;
        let birthdayRow: any = null;
        let titleRow: any = null;
        let usingContactCompanyPostAddressRow: any = null;
        let usingContactCompanyVisitAddressRow: any = null;

        const customFieldRowBuilder = new CompareCustomRowBuilder(leftPerson.customFieldsWithValue, rightPerson.customFieldsWithValue, this.props.formikBag);
        const customFieldContent = customFieldRowBuilder.buildRows();

        const leftPersonAddresses = getAddressesForPerson(leftPerson);
        const rightPersonAddresses = getAddressesForPerson(rightPerson);

        if (!leftPersonAddresses.post.country || !rightPersonAddresses.post.country || !leftPersonAddresses.visit.country || !rightPersonAddresses.visit.country) {
            return null;
        }
        
        if (leftPerson.addresses.length > 0 || rightPerson.addresses.length > 0) {
            if ((personHasAddressType(leftPerson, 'PostAddress') || personHasAddressType(rightPerson, 'PostAddress')) && (!leftPerson.usingCompanyPostAddress && !rightPerson.usingCompanyPostAddress)) {

                postAddressGroup = (
                    <>
                        <GenericRow fieldName="postAddressStreet" rowName={i18next.t("compare.postalAddressStreet")} leftValue={leftPersonAddresses.post.street} rightValue={rightPersonAddresses.post.street} formikBag={this.props.formikBag} />
                        <GenericRow fieldName="postAddressPNbr" rowName={i18next.t("compare.postalAddressPostCode")}leftValue={leftPersonAddresses.post.postCode} rightValue={rightPersonAddresses.post.postCode} formikBag={this.props.formikBag} />
                        <GenericRow fieldName="postAddressCty" rowName={i18next.t("compare.postalAddressCity")} leftValue={leftPersonAddresses.post.city} rightValue={rightPersonAddresses.post.city} formikBag={this.props.formikBag} />
                        <CountrySelectRow
                            fieldName="postAddressCountryId"
                            rowName={i18next.t("compare.postalAddressCountry")}
                            leftValue={{
                            id: leftPersonAddresses.post.country.countryId,
                            name: leftPersonAddresses.post.country.name
                            }}
                            rightValue={{
                            id: rightPersonAddresses.post.country.countryId,
                            name: rightPersonAddresses.post.country.name
                            }}
                            options={countryOptions}
                            formikBag={this.props.formikBag}
                        /> 
                    </>
                )
            }

            if ((personHasAddressType(leftPerson, 'VisitAddress') || personHasAddressType(rightPerson, 'VisitAddress')) && (!leftPerson.usingCompanyVisitAddress && !rightPerson.usingCompanyVisitAddress)) {

                visitAddressGroup = (
                    <> 
                        <GenericRow fieldName="visitAddressStreet" rowName={i18next.t("compare.visitAddressStreet")} leftValue={leftPersonAddresses.visit.street} rightValue={rightPersonAddresses.visit.street} formikBag={this.props.formikBag} />
                        <GenericRow fieldName="visitAddressPNbr" rowName={i18next.t("compare.visitAddressPNbr")}  leftValue={leftPersonAddresses.visit.postCode} rightValue={rightPersonAddresses.visit.postCode} formikBag={this.props.formikBag} />
                        <GenericRow fieldName="visitAddressCty" rowName={i18next.t("compare.visitAddressCty")} leftValue={leftPersonAddresses.visit.city} rightValue={rightPersonAddresses.visit.city} formikBag={this.props.formikBag} />
                        <CountrySelectRow
                            fieldName="visitAddressCountryId"
                            rowName={i18next.t("compare.visitAddressCountry")}
                            leftValue={{
                            id: leftPersonAddresses.visit.country.countryId,
                            name: leftPersonAddresses.visit.country.name
                            }}
                            rightValue={{
                            id: rightPersonAddresses.visit.country.countryId,
                            name: rightPersonAddresses.visit.country.name
                            }}
                            options={countryOptions}
                            formikBag={this.props.formikBag}
                        />
                    </>
                )
            }
        };

        if (leftPerson.usingCompanyPostAddress || rightPerson.usingCompanyPostAddress) {
            usingContactCompanyPostAddressRow = <UsingCompanyAddressRow  fieldName="usingCompanyPostAddress" rowName="Using company postal address" leftValue={leftPerson.usingCompanyPostAddress} rightValue={rightPerson.usingCompanyPostAddress} formikBag={this.props.formikBag}/>
        }
        if (leftPerson.usingCompanyVisitAddress || rightPerson.usingCompanyVisitAddress) {
            usingContactCompanyVisitAddressRow = <UsingCompanyAddressRow  fieldName="usingCompanyVisitAddress" rowName="Using company visiting address" leftValue={leftPerson.usingCompanyVisitAddress} rightValue={rightPerson.usingCompanyVisitAddress} formikBag={this.props.formikBag}/>
        }

        if (leftPerson.lastName || rightPerson.lastName) {
            lastName =  <GenericRow fieldName="lastName" rowName={i18next.t("compare.lastName")}leftValue={leftPerson.lastName} rightValue={rightPerson.lastName} formikBag={this.props.formikBag} />
        }

        if (leftPerson.tags.length > 0 || rightPerson.tags.length > 0) {
            tagsRow = <TagsRow leftValue={leftPerson.tags} rightValue={rightPerson.tags} formikBag={this.props.formikBag} />
        }
        
        if (leftPerson.activityCount !== 0 && leftPerson.activityCount !== 0) {
            activityRow = <ActivityRow initialLeftCount={leftPerson.activityCount} initialRightCount={rightPerson.activityCount} formikBag={this.props.formikBag} />
        }

        if ( leftPerson.birthday !== null || rightPerson.birthday !== null) {
            birthdayRow = <BirthdayRow fieldName="birthday" rowName={i18next.t("compare.birthday")} leftValue={leftPerson.birthday} rightValue={rightPerson.birthday} formikBag={this.props.formikBag} /> 
        }

        if ( leftPerson.title || rightPerson.title) {
            titleRow = <GenericRow fieldName="title" rowName={i18next.t("compare.title")} leftValue={leftPerson.title} rightValue={rightPerson.title} formikBag={this.props.formikBag} /> 
        }

        if (leftPerson.description || rightPerson.description) {
            descriptionRow = <GenericRow fieldName="description" rowName={i18next.t("compare.description")} fieldProps={{type: "text", component: TextArea}} leftValue={leftPerson.description} rightValue={rightPerson.description} formikBag={this.props.formikBag} /> 
        }

        if (leftPerson.mainPhone || rightPerson.mainPhone) {
            phoneRow = <GenericRow fieldName="mainPhone" rowName={i18next.t("compare.phone")} leftValue={leftPerson.mainPhone} rightValue={rightPerson.mainPhone} formikBag={this.props.formikBag} />
        }

        if (leftPerson.workPhone || rightPerson.workPhone) {
            workPhoneRow = <GenericRow fieldName="workPhone" rowName={i18next.t("compare.workPhone" )} leftValue={leftPerson.workPhone} rightValue={rightPerson.workPhone} formikBag={this.props.formikBag} />
        }

        if (leftPerson.website || rightPerson.website) {
            websiteRow = <GenericRow fieldName="website" rowName={i18next.t("compare.website")} leftValue={leftPerson.website} rightValue={rightPerson.website} formikBag={this.props.formikBag}/>
        }

        if (leftPerson.email || rightPerson.email) {
            emailRow = <GenericRow fieldName="email" rowName={i18next.t('compare.email')} leftValue={leftPerson.email} fieldProps={{type: "email", component: TextInput}} rightValue={rightPerson.email} formikBag={this.props.formikBag} />
        }

        if (leftPerson.otherEmail || rightPerson.otherEmail) {
            otherEmailRow = <GenericRow fieldName="otherEmail" rowName={i18next.t("compare.otherEmail")} leftValue={leftPerson.otherEmail} fieldProps={{type: "email", component: TextInput}} rightValue={rightPerson.otherEmail} formikBag={this.props.formikBag} />
        }

        if (leftPerson.skype || rightPerson.skype) {
            skypeRow = <GenericRow fieldName="skype" rowName="Skype" leftValue={leftPerson.skype} rightValue={rightPerson.skype} formikBag={this.props.formikBag} />
        }

        return (
            <div className="row compare">
                <div className="col-12 text-center">
                    <table className={leftPerson.contactPersonId=== null || rightPerson.contactPersonId === null ? 'd-none' : "table compare-table"}>
                        <thead className="thead-default">
                                <TopInfoToDisplay rightValue={rightPerson} leftValue={leftPerson}/> 
                        </thead>
                        <tbody>
                            <GenericRow fieldName="firstName" rowName={i18next.t("compare.firstName")} leftValue={leftPerson.firstName} rightValue={rightPerson.firstName} formikBag={this.props.formikBag} />
                            {lastName}
                            {titleRow}
                            <ContactCompanyRow
                                rowName={i18next.t("compare.companyName")}
                                fieldName="contactCompanyId"
                                leftValue={leftPerson.contactCompany} 
                                rightValue={rightPerson.contactCompany} 
                                formikBag={this.props.formikBag} 
                            />
                            {birthdayRow}
                            {descriptionRow}
                            {phoneRow}
                            {workPhoneRow}
                            {websiteRow}
                            {emailRow}
                            {otherEmailRow}
                            {skypeRow}
                            {usingContactCompanyPostAddressRow}
                            {postAddressGroup}
                            {usingContactCompanyVisitAddressRow}
                            {visitAddressGroup}
                            {tagsRow}
                            {activityRow}
                            {customFieldContent}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default CompareTable;