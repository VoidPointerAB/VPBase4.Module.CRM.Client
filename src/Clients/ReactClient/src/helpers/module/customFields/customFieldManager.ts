import _ from 'lodash'

import { generateId, entityType } from 'helpers/module/idGenerator'

import * as CustomFieldTypes from './customFieldTypes';

import { convertDataToComponent } from './customFieldCreator';
import { getCustomFieldBehavior } from './customFieldBehaviors';
import { TabbedFormBuilder } from '../tabbedFormBuilder';

export const undefinedCategoryKey = '$undefinedCategory$';

export function addCustomFieldsToTabbedForm(tabBuilder: TabbedFormBuilder, customFieldValues: CustomFieldTypes.ICustomFieldWithValueType[]) {
    const tabSortedCustomFieldComponents = getTabSortedCustomFieldsAsComponents(getTabSortedCustomFields(customFieldValues));

    const knownTabNames = tabBuilder.getTabNames();

    if (tabSortedCustomFieldComponents) {

        for (const tabName in tabSortedCustomFieldComponents) {
            const sections: any = [];

            for (const categoryName in tabSortedCustomFieldComponents[tabName]) {
                sections.push({
                    title: categoryName === undefinedCategoryKey ? undefined : categoryName,
                    content: tabSortedCustomFieldComponents[tabName][categoryName],
                });
            }

            if (knownTabNames.indexOf(tabName) !== -1) {
                for (const section of sections) {
                    tabBuilder.addSectionToTab(tabName, { title: section.title, content: section.content })
                }
            }
            else {
                tabBuilder.addTab(tabName, sections);
            }
        }
    }
}

export function getTabSortedCustomFields(customFields: CustomFieldTypes.ICustomFieldWithValueType[]) {

    const result: any = {};

    customFields.forEach(field => {

        const splitTabName: string[] = field.tabName.split('/');
        const tabName = splitTabName[0];
        const category = splitTabName.length > 1 ? splitTabName[1] : undefinedCategoryKey;

        if (result[tabName] && result[tabName][category]) {
            result[tabName][category].push(field);
        }
        else if (result[tabName]) {
            result[tabName][category] = [field];
        }
        else {
            result[tabName] = {};
            result[tabName][category] = [field];
        }
    });

    return result;
}

function getTabSortedCustomFieldsAsComponents(tabSortedCustomFields: any) {
    const result: any = {};

    for (let tabName in tabSortedCustomFields) {
        result[tabName] = {};
        for (const categoryName in tabSortedCustomFields[tabName]) {

            result[tabName][categoryName] = [];
            let fields = tabSortedCustomFields[tabName][categoryName];
            fields = _.sortBy(fields, ['title']);
            fields.forEach((customField: CustomFieldTypes.ICustomFieldWithValueType) => {
                result[tabName][categoryName].push(convertDataToComponent(customField));
            });
        }
    }

    return result;
}

export function getAsCustomFieldValues(data: any): CustomFieldTypes.ICustomFieldWithValueType[] {
    if (!data) {
        return [];
    }

    return data;
}

export function getInitialValues(customFields: CustomFieldTypes.ICustomFieldWithValueType[]) {
    const initialValues: any = {};
    customFields.forEach(customField => {
        const behavior = getCustomFieldBehavior(customField.fieldType, customField.dataType)

        initialValues[customField.customFieldId] = behavior.getInitialValue(customField);
    });

    return initialValues;
}

export function getCustomFieldValuesFromForm(formValues: any, customFields: CustomFieldTypes.ICustomFieldWithValueType[]): any {
    const customFieldRelevantData = getRelevantCustomFieldData(customFields);
    const formCustomFields: any = [];

    for (const valueName in formValues) {

        if (valueName.indexOf(`_${entityType.CustomField}_`) === -1) {
            continue;
        }

        const relevantData = customFieldRelevantData[valueName];
        const behavior = getCustomFieldBehavior(relevantData.fieldType, relevantData.dataType)

        if (behavior.isDefaultValue(formValues[valueName])) {
            continue;
        }

        const customFieldValue = {
            customFieldValueId: relevantData.customFieldValueId ? relevantData.customFieldValueId : generateId(entityType.CustomFieldValue),
            customFieldId: valueName,
            dataType: relevantData.dataType,
        }

        behavior.addCustomFieldValueToObject(customFieldValue, formValues[valueName]);

        formCustomFields.push(customFieldValue);
    }

    return formCustomFields;
}

function getRelevantCustomFieldData(customFields: CustomFieldTypes.ICustomFieldWithValueType[]): { [key: string]: CustomFieldTypes.ICustomFieldIdRelatedData } {
    const relevantData: { [key: string]: CustomFieldTypes.ICustomFieldIdRelatedData } = {};

    customFields.forEach(customField => {
        relevantData[customField.customFieldId] = {
            customFieldValueId: customField.customFieldValueId,
            dataType: customField.dataType,
            fieldType: customField.fieldType,
        };
    });

    return relevantData;
}
