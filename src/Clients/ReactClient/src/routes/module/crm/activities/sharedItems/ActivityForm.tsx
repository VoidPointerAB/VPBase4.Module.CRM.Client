import React from 'react';
import _ from 'lodash';
import { Translation } from 'react-i18next';
import i18next from 'i18next'; 

import { Field } from "formik";
import { DateInput, TextArea, MemoizedValueMultiSelect, Time } from 'components/module/Form';
import { RadioButton, RadioButtonGroup } from 'components/module/crm/Form/RadioButton';
import { IOptionsProps } from 'components/module/crm/interfaceOption';

import styles from './ActivityForm.module.css'

interface IActivityFormProps {
    formikBag: any,
    contactCompanies: ICompany[] | null,
    contactPersons: IPerson[] | null,
}
export interface IPersonOnCompany {
    contactPersonId: string | null
}

export interface ICompany {
    contactCompanyId: string | null,
    contactPersons: IPersonOnCompany[] | null,
    name: string,
}
export interface IPerson {
    contactPersonId: string,
    firstName: string
    lastName: string | null,
}

const ActivityForm = (props: IActivityFormProps) => {
    let companyOptions: IOptionsProps[] | any = [];
    let personOptions: any[] = [];
    const companies = props.contactCompanies;
    const persons = props.contactPersons;
    const selectedCompanies: string[] = props.formikBag.values.contactCompanyId;
    let personsAtSelectedCompanies: any[] = [];

    if (companies) {
        for (const company of companies) {
            if (company.contactPersons && _.includes(selectedCompanies, company.contactCompanyId)) {
                personsAtSelectedCompanies = [
                    ...personsAtSelectedCompanies, 
                    ...company.contactPersons.map(person => person.contactPersonId)
                ]
            }

            companyOptions.push({value: company.contactCompanyId, label: company.name})
        }
    }

    if (persons) {
        const personsOnCompanies = [];
        const otherPersons = [];
        
        for (const person of persons) {
            const personOption = {label: `${person.firstName} ${person.lastName}`, value: person.contactPersonId};
            if (_.includes(personsAtSelectedCompanies, person.contactPersonId)) {
                personsOnCompanies.push(personOption)
            }
            else {
                otherPersons.push(personOption)
            }
        }       

        if (personsOnCompanies.length > 0) {
            // Workaround as Opt-groups don't work with the current 
            // implementation of MultiSelect we use for Formik
            const language = navigator.language === 'sv-SE' || navigator.language === 'sv';
            const singularPluralSv = selectedCompanies.length === 1 ? {selected: 'valt', singularPlural: 'företag'} : {selected: 'valda', singularPlural: 'företag'};
            const singularPluralEn = selectedCompanies.length === 1 ? {selected: 'selected', singularPlural: 'company'} : {selected: 'selected', singularPlural: 'companies'};
            const inserts = language ? singularPluralSv: singularPluralEn
            personOptions = [
                {label: `${i18next.t('selects.fromSelectedCompany', inserts )}`, value: "-1", isDisabled: true}, 
                ...personsOnCompanies, 
                {label: `${i18next.t("selects.other")}`, value: "-2", isDisabled: true}, 
                ...otherPersons]
        }
        else {
            personOptions = otherPersons;
        }
    }

    return (
        <Translation>
            {(t) =>
                <div className={styles.responsiveFlexContainer}>
                    <div className={styles.activityCol}>
                        <RadioButtonGroup id="radioGroup" label={`${t("formLabels.activityType")} *`}>
                            <Field component={RadioButton} name="type" id="MEETING" title="MEETING" label={t("formLabels.meeting")} className="type-meeting" />
                            <Field component={RadioButton} name="type" id="PHONE" title="PHONE" label={t("formLabels.phoneType")} className="type-phone" />
                            <Field component={RadioButton} name="type" id="EMAIL" title="EMAIL" label={t("formLabels.email")} className="type-email" />
                            <Field component={RadioButton} name="type" id="NOTE" title="NOTE" label={t("formLabels.note")} className="type-note" />
                            <Field component={RadioButton} name="type" id="OTHER" title="OTHER" label={t("formLabels.other" )}className="type-other" />
                        </RadioButtonGroup>
                    </div>
                    <div className={styles.flexColumn}>
                        <div className={styles.responsiveFlexContainer}>
                            <div>
                                    <Field name="contactCompanyId" title={t("formLabels.contactCompany")} canClear={true} isClearable={true} placeholder={t('placeholders.chooseCompany')} options={companyOptions} component={MemoizedValueMultiSelect} />
                                    <Field name="contactPersonId" title={t("formLabels.contactPerson")} canClear={true} isClearable={true} placeholder={t('placeholders.choosePerson')} options={personOptions} component={MemoizedValueMultiSelect} />
                                    <p className="options-activity">{t('choosePersonOrCompany')}</p>
                            </div>
                            <div className={styles.dateTimeColumn}>
                                <Field name="date" type="text" title={`${t("formLabels.date")} *`} component={DateInput} />
                                <Field name="time" type="text" title={t("formLabels.time")} component={Time} />

                            </div>
                        </div>
                        <div className="">
                            <Field name="description" title={`${t("formLabels.description")} *`} component={TextArea} row={5} />
                        </div>
                    </div>
                </div>
            }
        </Translation>
    )
}
export default ActivityForm