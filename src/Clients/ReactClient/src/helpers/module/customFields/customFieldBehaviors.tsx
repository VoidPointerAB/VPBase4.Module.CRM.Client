import React from 'react'
import moment from 'moment'

import * as CustomFieldTypes from './customFieldTypes';
import * as FieldTypes from 'components/module/Form';
import { serverDateFormat, serverTimeFormat, getDateFormat, getTimeFormat, serverDateTimeFormat } from 'helpers/module/dateTimeHelper';

export function getCustomFieldBehavior(
    fieldType: CustomFieldTypes.ICustomFieldWithValueType['fieldType'],
    dataType: CustomFieldTypes.ICustomFieldWithValueType['dataType']): ICustomFieldBehavior {

        for (const behavior of behaviors) {
            if (behavior.isRelevant(fieldType, dataType)) {
                return behavior;
            }
        }

        throw new Error('Could not find relevant behavior');
}

export interface ICustomFieldBehavior {
    isRelevant(fieldType: CustomFieldTypes.ICustomFieldWithValueType['fieldType'], dataType: CustomFieldTypes.ICustomFieldWithValueType['dataType']): boolean,
    getInitialValue(customField: CustomFieldTypes.ICustomFieldWithValueType): any,
    getDefaultValue(): any,
    isDefaultValue(value: any) : boolean,
    isEmpty(customField: CustomFieldTypes.ICustomFieldWithValueType): boolean,
    getComponent(): React.ReactNode,
    getType(): string | undefined,
    handlesOptions(): boolean,
    addCustomFieldValueToObject(customFieldObject: object, value: any): void,
    getValue(customField: CustomFieldTypes.ICustomFieldWithValueType): any,
    toString(customField: CustomFieldTypes.ICustomFieldWithValueType): string,
}

class StringInputBehavior implements ICustomFieldBehavior {
    getComponent(): React.ReactNode {
        return FieldTypes.TextInput;
    }
    getType(): string | undefined {
        return 'text'
    }
    handlesOptions(): boolean {
        return false;
    }
    getInitialValue(customField: CustomFieldTypes.ICustomFieldWithValueType): any {
        return customField.stringValue ? customField.stringValue : this.getDefaultValue();
    }
    getDefaultValue(): any {
        return '';
    }
    isDefaultValue(value: any) {
        return value === this.getDefaultValue();
    }
    isEmpty(customField: CustomFieldTypes.ICustomFieldWithValueType): boolean {
        return customField.stringValue === null;
    }
    isRelevant(fieldType: CustomFieldTypes.ICustomFieldWithValueType['fieldType'], dataType: CustomFieldTypes.ICustomFieldWithValueType['dataType']): boolean {
        return fieldType === 'INPUT' && dataType === 'STRING';
    }
    addCustomFieldValueToObject(customFieldObject: {[key:string]: string}, value: any) {
        customFieldObject.stringValue = value;
    }
    getValue(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : customField.stringValue;
    }
    toString(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : customField.stringValue as string;
    }
}

class IntInputBehavior implements ICustomFieldBehavior {
    getComponent(): React.ReactNode {
        return FieldTypes.TextInput;
    }
    getType(): string | undefined {
        return 'number'
    }
    handlesOptions(): boolean {
        return false;
    }
    getInitialValue(customField: CustomFieldTypes.ICustomFieldWithValueType): any {
        return customField.intValue ? customField.intValue : this.getDefaultValue();
    }
    getDefaultValue(): any {
        return '';
    }
    isDefaultValue(value: any) {
        return value === this.getDefaultValue();
    }
    isEmpty(customField: CustomFieldTypes.ICustomFieldWithValueType): boolean {
        return customField.intValue === null;
    }
    isRelevant(fieldType: CustomFieldTypes.ICustomFieldWithValueType['fieldType'], dataType: CustomFieldTypes.ICustomFieldWithValueType['dataType']): boolean {
        return dataType === 'INT';
    }
    addCustomFieldValueToObject(customFieldObject: {[key:string]: string}, value: any) {
        customFieldObject.intValue = value;
    }
    getValue(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : customField.intValue;
    }
    toString(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : (customField.intValue  as number).toString();
    }
}

class DecimalInputBehavior implements ICustomFieldBehavior {
    getComponent(): React.ReactNode {
        return FieldTypes.TextInput;
    }
    getType(): string | undefined {
        return 'number'
    }
    handlesOptions(): boolean {
        return false;
    }
    getInitialValue(customField: CustomFieldTypes.ICustomFieldWithValueType): any {
        return customField.decimalValue ? customField.decimalValue : this.getDefaultValue();
    }
    getDefaultValue(): any {
        return '';
    }
    isDefaultValue(value: any) {
        return value === this.getDefaultValue();
    }
    isEmpty(customField: CustomFieldTypes.ICustomFieldWithValueType): boolean {
        return customField.decimalValue === null;
    }
    isRelevant(fieldType: CustomFieldTypes.ICustomFieldWithValueType['fieldType'], dataType: CustomFieldTypes.ICustomFieldWithValueType['dataType']): boolean {
        return dataType === 'DECIMAL';
    }
    addCustomFieldValueToObject(customFieldObject: {[key:string]: string}, value: any) {
        customFieldObject.decimalValue = value;
    }
    getValue(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : customField.decimalValue;
    }
    toString(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : (customField.decimalValue as number).toString();
    }
}

class DateInputBehavior implements ICustomFieldBehavior {
    getComponent(): React.ReactNode {
        return FieldTypes.DateInput;
    }
    getType(): string | undefined {
        return undefined
    }
    handlesOptions(): boolean {
        return false;
    }
    getInitialValue(customField: CustomFieldTypes.ICustomFieldWithValueType): any {
        return customField.dateTimeValue ? moment(customField.dateTimeValue, serverDateFormat) : this.getDefaultValue();
    }
    getDefaultValue(): any {
        return null;
    }
    isDefaultValue(value: any) {
        return value === this.getDefaultValue();
    }
    isEmpty(customField: CustomFieldTypes.ICustomFieldWithValueType): boolean {
        return customField.dateTimeValue === null;
    }
    isRelevant(fieldType: CustomFieldTypes.ICustomFieldWithValueType['fieldType'], dataType: CustomFieldTypes.ICustomFieldWithValueType['dataType']): boolean {
        return fieldType === 'INPUT' && dataType === 'DATE';
    }
    addCustomFieldValueToObject(customFieldObject: {[key:string]: string}, value: any) {
        customFieldObject.dateTimeValue = value.format(serverDateFormat);
    }
    getValue(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : moment((customField.dateTimeValue as string), serverDateFormat);
    }
    toString(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : moment((customField.dateTimeValue as string), serverDateFormat).format(getDateFormat());
    }
}

class TimeInputBehavior implements ICustomFieldBehavior {
    getComponent(): React.ReactNode {
        return FieldTypes.Time;
    }
    getType(): string | undefined {
        return undefined
    }
    handlesOptions(): boolean {
        return false;
    }
    getInitialValue(customField: CustomFieldTypes.ICustomFieldWithValueType): any {
        return customField.timeSpanValue ? customField.timeSpanValue : this.getDefaultValue();
    }
    getDefaultValue(): any {
        return '';
    }
    isDefaultValue(value: any) {
        return value === this.getDefaultValue();
    }
    isEmpty(customField: CustomFieldTypes.ICustomFieldWithValueType): boolean {
        return customField.timeSpanValue === null;
    }
    isRelevant(fieldType: CustomFieldTypes.ICustomFieldWithValueType['fieldType'], dataType: CustomFieldTypes.ICustomFieldWithValueType['dataType']): boolean {
        return fieldType === 'INPUT' && dataType === 'TIME';
    }
    addCustomFieldValueToObject(customFieldObject: {[key:string]: string}, value: any) {
        customFieldObject.timeSpanValue = value;
    }
    getValue(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : moment((customField.timeSpanValue as string), serverTimeFormat).format(getTimeFormat());
    }
    toString(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : moment((customField.timeSpanValue as string), serverTimeFormat).format(getTimeFormat());
    }
}

class DateTimeInputBehavior implements ICustomFieldBehavior {
    getComponent(): React.ReactNode {
        return FieldTypes.DateTimeInput;
    }
    getType(): string | undefined {
        return undefined
    }
    handlesOptions(): boolean {
        return false;
    }
    getInitialValue(customField: CustomFieldTypes.ICustomFieldWithValueType): any {
        return customField.dateTimeValue ? moment(customField.dateTimeValue, serverDateFormat).add(moment.duration(customField.timeSpanValue as string)) : this.getDefaultValue();
    }
    getDefaultValue(): any {
        return null;
    }
    isDefaultValue(value: any) {
        return value === this.getDefaultValue();
    }
    isEmpty(customField: CustomFieldTypes.ICustomFieldWithValueType): boolean {
        return customField.dateTimeValue === null || customField.timeSpanValue === null;
    }
    isRelevant(fieldType: CustomFieldTypes.ICustomFieldWithValueType['fieldType'], dataType: CustomFieldTypes.ICustomFieldWithValueType['dataType']): boolean {
        return fieldType === 'INPUT' && dataType === 'DATETIME';
    }
    addCustomFieldValueToObject(customFieldObject: {[key:string]: string}, value: any) {
        customFieldObject.dateTimeValue = value.format(serverDateFormat);
        customFieldObject.timeSpanValue = value.format(serverTimeFormat);
    }
    getValue(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : moment(`${customField.dateTimeValue} ${customField.timeSpanValue}`, serverDateTimeFormat);
    }
    toString(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : `${moment((customField.dateTimeValue as string), serverDateFormat).format(getDateFormat())} ${moment((customField.timeSpanValue as string), serverTimeFormat).format(getTimeFormat())}`;
    }
}

class CheckboxInputBehavior implements ICustomFieldBehavior {
    getComponent(): React.ReactNode {
        return FieldTypes.Checkbox;
    }
    getType(): string | undefined {
        return undefined
    }
    handlesOptions(): boolean {
        return false;
    }
    getInitialValue(customField: CustomFieldTypes.ICustomFieldWithValueType): any {
        return customField.boolValue ? customField.boolValue : this.getDefaultValue();
    }
    getDefaultValue(): any {
        return false;
    }
    isDefaultValue(value: any) {
        return false;
    }
    isEmpty(customField: CustomFieldTypes.ICustomFieldWithValueType): boolean {
        return false;
    }
    isRelevant(fieldType: CustomFieldTypes.ICustomFieldWithValueType['fieldType'], dataType: CustomFieldTypes.ICustomFieldWithValueType['dataType']): boolean {
        return fieldType === 'CHECKBOX';
    }
    addCustomFieldValueToObject(customFieldObject: {[key:string]: string}, value: any) {
        customFieldObject.boolValue = value;
    }
    getValue(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return customField.boolValue === true ? true : false;
    }
    toString(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return customField.boolValue === true ? 'Yes' : 'No';
    }
}

class SelectInputBehavior implements ICustomFieldBehavior {
    getComponent(): React.ReactNode {
        return FieldTypes.Select;
    }
    getType(): string | undefined {
        return undefined
    }
    handlesOptions(): boolean {
        return true;
    }
    getInitialValue(customField: CustomFieldTypes.ICustomFieldWithValueType): any {
        return customField.stringValue ? customField.stringValue : this.getDefaultValue();
    }
    getDefaultValue(): any {
        return '';
    }
    isDefaultValue(value: any) {
        return value === this.getDefaultValue();
    }
    isEmpty(customField: CustomFieldTypes.ICustomFieldWithValueType): boolean {
        return customField.stringValue === null;
    }
    isRelevant(fieldType: CustomFieldTypes.ICustomFieldWithValueType['fieldType'], dataType: CustomFieldTypes.ICustomFieldWithValueType['dataType']): boolean {
        return fieldType === 'DROPDOWN';
    }
    addCustomFieldValueToObject(customFieldObject: {[key:string]: string}, value: any) {
        customFieldObject.stringValue = value;
    }
    getValue(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : customField.stringValue;
    }
    toString(customField: CustomFieldTypes.ICustomFieldWithValueType) {

        if (this.isEmpty(customField)) {
            return '';
        }

        const values = JSON.parse(customField.optionValuesJson as string);
        const labels = JSON.parse(customField.optionFieldsJson as string);

        const index = values.indexOf(customField.stringValue)

        return labels[index];;
    }
}

class MultiSelectInputBehavior implements ICustomFieldBehavior {
    getComponent(): React.ReactNode {
        return FieldTypes.MultiSelect;
    }
    getType(): string | undefined {
        return undefined
    }
    handlesOptions(): boolean {
        return true;
    }
    getInitialValue(customField: CustomFieldTypes.ICustomFieldWithValueType): any {
        return customField.stringValue ? JSON.parse(customField.stringValue) : this.getDefaultValue();
    }
    getDefaultValue(): any {
        return [];
    }
    isDefaultValue(value: any) {
        return Array.isArray(value) && value.length === 0;
    }
    isEmpty(customField: CustomFieldTypes.ICustomFieldWithValueType): boolean {
        return customField.stringValue === null;
    }
    isRelevant(fieldType: CustomFieldTypes.ICustomFieldWithValueType['fieldType'], dataType: CustomFieldTypes.ICustomFieldWithValueType['dataType']): boolean {
        return fieldType === 'MULTI_DROPDOWN';
    }
    addCustomFieldValueToObject(customFieldObject: {[key:string]: string}, value: any) {
        customFieldObject.stringValue = JSON.stringify(value);
    }
    getValue(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? null : JSON.parse(customField.stringValue as string);
    }
    toString(customField: CustomFieldTypes.ICustomFieldWithValueType) {

        if (customField.stringValue === null) {
            return '';
        }

        const labelsToShow = []
        const values = JSON.parse(customField.optionValuesJson as string);
        const labels = JSON.parse(customField.optionFieldsJson as string);

        const selectedValues = JSON.parse(customField.stringValue)
        for (let i = 0; i < selectedValues.length; i++) {
            const index = values.indexOf(selectedValues[i])
            labelsToShow.push(labels[index])
        }

        return labelsToShow.join(', ');
    }
}

class PhoneInputBehavior implements ICustomFieldBehavior {
    getComponent(): React.ReactNode {
        return FieldTypes.TextInput
    }
    getType(): string | undefined {
        return 'tel'
    }
    handlesOptions(): boolean {
        return false;
    }
    getInitialValue(customField: CustomFieldTypes.ICustomFieldWithValueType): any {
        return customField.stringValue ? customField.stringValue : this.getDefaultValue();
    }
    getDefaultValue(): any {
        return '';
    }
    isDefaultValue(value: any) {
        return value === this.getDefaultValue();
    }
    isEmpty(customField: CustomFieldTypes.ICustomFieldWithValueType): boolean {
        return customField.stringValue === null;
    }
    isRelevant(fieldType: CustomFieldTypes.ICustomFieldWithValueType['fieldType'], dataType: CustomFieldTypes.ICustomFieldWithValueType['dataType']): boolean {
        return fieldType === 'PHONE';
    }
    addCustomFieldValueToObject(customFieldObject: {[key:string]: string}, value: any) {
        customFieldObject.stringValue = value;
    }
    getValue(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : customField.stringValue;
    }
    toString(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : (customField.stringValue as string);
    }
}

class EmailInputBehavior implements ICustomFieldBehavior {
    getComponent(): React.ReactNode {
        return FieldTypes.TextInput
    }
    getType(): string | undefined {
        return 'email'
    }
    handlesOptions(): boolean {
        return false;
    }
    getInitialValue(customField: CustomFieldTypes.ICustomFieldWithValueType): any {
        return customField.stringValue ? customField.stringValue : this.getDefaultValue();
    }
    getDefaultValue(): any {
        return '';
    }
    isDefaultValue(value: any) {
        return value === this.getDefaultValue();
    }
    isEmpty(customField: CustomFieldTypes.ICustomFieldWithValueType): boolean {
        return customField.stringValue === null;
    }
    isRelevant(fieldType: CustomFieldTypes.ICustomFieldWithValueType['fieldType'], dataType: CustomFieldTypes.ICustomFieldWithValueType['dataType']): boolean {
        return fieldType === 'EMAIL';
    }
    addCustomFieldValueToObject(customFieldObject: {[key:string]: string}, value: any) {
        customFieldObject.stringValue = value;
    }
    getValue(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : customField.stringValue;
    }
    toString(customField: CustomFieldTypes.ICustomFieldWithValueType) {
        return this.isEmpty(customField) ? '' : (customField.stringValue as string);
    }
}

const behaviors = [
    new StringInputBehavior(),
    new IntInputBehavior(),
    new DecimalInputBehavior(),
    new DateInputBehavior(),
    new TimeInputBehavior(),
    new DateTimeInputBehavior(),
    new CheckboxInputBehavior(),
    new SelectInputBehavior(),
    new MultiSelectInputBehavior(),
    new PhoneInputBehavior(),
    new EmailInputBehavior(),
]
