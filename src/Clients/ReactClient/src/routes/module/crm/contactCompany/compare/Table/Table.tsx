import React from 'react';
import i18next from 'i18next';

import {
    SegmentsRow, 
    ActivityRow, 
    ContactPersonsRow, 
    TagsRow, 
    GenericRow,
    CountrySelectRow,
    TopInfoToDisplay,
} from './rows';

import {ICompany} from '../compare';
import { IOptionsProps } from 'components/module/crm/interfaceOption';
import { TextArea, TextInput} from 'components/module/Form';
import { getAddressesForCompany, companyHasAddressType } from "../addressHelper";
import { CompareCustomRowBuilder } from '../compareCustomRowBuilder';

interface ICompareTableProps {
    leftCompany: ICompany,
    rightCompany: ICompany,
    countryOptions: IOptionsProps[] | null | undefined,
    formikBag: any,
    location: any,
}

class CompareTable extends React.Component<ICompareTableProps> {

    public render() {
        const { leftCompany, rightCompany, countryOptions } = this.props;

        if ( !leftCompany || !rightCompany || !leftCompany.segment || !rightCompany.segment || !leftCompany.tags || !rightCompany.tags) {
            return null;
        }

        let postAddressGroup: any = null;
        let visitAddressGroup: any = null;

        let segmentRow: any = null;
        let tagsRow: any = null;
        let activityRow: any = null; 
        let contactPersonRow: any = null;
        let organizationNumberRow: any = null;
        let noteRow: any = null;
        let phoneRow: any = null;
        let websiteRow: any = null;
        let emailRow: any = null;

        const customFieldRowBuilder = new CompareCustomRowBuilder(leftCompany.customFieldsWithValue, rightCompany.customFieldsWithValue, this.props.formikBag);
        const customFieldContent = customFieldRowBuilder.buildRows();

        if ( leftCompany.segment.length > 0 || rightCompany.segment.length > 0) {
            segmentRow = <SegmentsRow leftValue={leftCompany.segment} rightValue={rightCompany.segment} formikBag={this.props.formikBag} />
        }

        const leftCompanyAddresses = getAddressesForCompany(leftCompany);
        const rightCompanyAddresses = getAddressesForCompany(rightCompany);

        if (!leftCompanyAddresses.post.country || !rightCompanyAddresses.post.country || !leftCompanyAddresses.visit.country || !rightCompanyAddresses.visit.country) {
            return null;
        }
        
        if (leftCompany.addresses.length > 0 || rightCompany.addresses.length > 0) {
            if (companyHasAddressType(leftCompany, 'PostAddress') || companyHasAddressType(rightCompany, 'PostAddress')) {

                postAddressGroup = (
                    <>
                        <GenericRow fieldName="postAddressStreet" rowName={i18next.t("compare.postalAddressStreet")} leftValue={leftCompanyAddresses.post.street} rightValue={rightCompanyAddresses.post.street} formikBag={this.props.formikBag} />
                        <GenericRow fieldName="postAddressPNbr" rowName={i18next.t("compare.postalAddressPostCode")} leftValue={leftCompanyAddresses.post.postCode} rightValue={rightCompanyAddresses.post.postCode} formikBag={this.props.formikBag} />
                        <GenericRow fieldName="postAddressCty" rowName={i18next.t("compare.postalAddressCity")} leftValue={leftCompanyAddresses.post.city} rightValue={rightCompanyAddresses.post.city} formikBag={this.props.formikBag} />
                        <CountrySelectRow
                            fieldName="postAddressCountryId"
                            rowName={i18next.t("compare.postalAddressCountry")}
                            leftValue={{
                            id: leftCompanyAddresses.post.country.countryId,
                            name: leftCompanyAddresses.post.country.name
                            }}
                            rightValue={{
                            id: rightCompanyAddresses.post.country.countryId,
                            name: rightCompanyAddresses.post.country.name
                            }}
                            options={countryOptions}
                            formikBag={this.props.formikBag}
                        /> 
                    </>
                )
            }

            if (companyHasAddressType(leftCompany, 'VisitAddress') || companyHasAddressType(rightCompany, 'VisitAddress')) {

                visitAddressGroup = (
                    <> 
                        <GenericRow fieldName="visitAddressStreet" rowName={i18next.t("compare.visitAddressStreet")} leftValue={leftCompanyAddresses.visit.street} rightValue={rightCompanyAddresses.visit.street} formikBag={this.props.formikBag} />
                        <GenericRow fieldName="visitAddressPNbr" rowName={i18next.t("compare.visitAddressPNbr")}  leftValue={leftCompanyAddresses.visit.postCode} rightValue={rightCompanyAddresses.visit.postCode} formikBag={this.props.formikBag} />
                        <GenericRow fieldName="visitAddressCty" rowName={i18next.t("compare.visitAddressCty")} leftValue={leftCompanyAddresses.visit.city} rightValue={rightCompanyAddresses.visit.city} formikBag={this.props.formikBag} />
                        <CountrySelectRow
                            fieldName="visitAddressCountryId"
                            rowName={i18next.t("compare.visitAddressCountry")}
                            leftValue={{
                            id: leftCompanyAddresses.visit.country.countryId,
                            name: leftCompanyAddresses.visit.country.name
                            }}
                            rightValue={{
                            id: rightCompanyAddresses.visit.country.countryId,
                            name: rightCompanyAddresses.visit.country.name
                            }}
                            options={countryOptions}
                            formikBag={this.props.formikBag}
                        />
                    </>
                )
            }
        };

        if (leftCompany.tags.length > 0 || rightCompany.tags.length > 0) {
            tagsRow = <TagsRow leftValue={leftCompany.tags} rightValue={rightCompany.tags} formikBag={this.props.formikBag} />
        }
        
        if (leftCompany.activityCount > 0 || rightCompany.activityCount > 0) {
            activityRow = <ActivityRow initialLeftCount={leftCompany.activityCount} initialRightCount={rightCompany.activityCount} formikBag={this.props.formikBag} />
        }

        if (leftCompany.contactPersons && rightCompany.contactPersons && (leftCompany.contactPersons.length > 0 || rightCompany.contactPersons.length > 0)) {
            contactPersonRow = ( 
            <ContactPersonsRow 
                initialLeftValue={leftCompany.contactPersons} 
                initialRightValue={rightCompany.contactPersons} 
                formikBag={this.props.formikBag} 
            />)
        }

        if (leftCompany.organizationNumber && rightCompany.organizationNumber) {
            organizationNumberRow = <GenericRow fieldName="organizationNumber" rowName={i18next.t("compare.organizationNumber")} leftValue={leftCompany.organizationNumber} rightValue={rightCompany.organizationNumber} formikBag={this.props.formikBag}/> 
        }

        if (leftCompany.note || rightCompany.note) {
            noteRow = <GenericRow fieldName="note" rowName={i18next.t("compare.note")} fieldProps={{type: "text", component: TextArea}} leftValue={leftCompany.note} rightValue={rightCompany.note} formikBag={this.props.formikBag} /> 
        }

        if (leftCompany.phone || rightCompany.phone) {
            phoneRow = <GenericRow fieldName="phone" rowName={i18next.t("compare.phone")} leftValue={leftCompany.phone} rightValue={rightCompany.phone} formikBag={this.props.formikBag} />
        }

        if (leftCompany.website || rightCompany.website) {
            websiteRow = <GenericRow fieldName="website" rowName={i18next.t("compare.website" )}leftValue={leftCompany.website} rightValue={rightCompany.website} formikBag={this.props.formikBag}/>
        }

        if (leftCompany.email || rightCompany.email) {
            emailRow = <GenericRow fieldName="email" rowName={i18next.t("compare.email")} leftValue={leftCompany.email} fieldProps={{type: "email", component: TextInput}} rightValue={rightCompany.email} formikBag={this.props.formikBag} />
        }

        return (
            <div className="row compare">
                <div className="col-12 text-center">
                    <table className={leftCompany.contactCompanyId=== null || rightCompany.contactCompanyId === null ? 'd-none' : "table compare-table"}>
                        <thead className="thead-default">
                                <TopInfoToDisplay rightValue={rightCompany} leftValue={leftCompany}/> 
                        </thead>
                        <tbody>
                            <GenericRow fieldName="name" rowName={i18next.t("compare.companyName")} leftValue={leftCompany.name} rightValue={rightCompany.name} formikBag={this.props.formikBag} />
                            {organizationNumberRow}
                            {noteRow}
                            {phoneRow}
                            {websiteRow}
                            {emailRow}
                            {segmentRow}
                            {postAddressGroup}
                            {visitAddressGroup}
                            {tagsRow}
                            {activityRow}
                            {contactPersonRow}
                            {customFieldContent}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default CompareTable;