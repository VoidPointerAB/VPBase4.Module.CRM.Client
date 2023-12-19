import React from 'react';

import { Field } from "formik";

import * as CustomFieldTypes from './customFieldTypes';
import { getCustomFieldBehavior } from './customFieldBehaviors';

export function convertDataToComponent(customFieldData: CustomFieldTypes.ICustomFieldWithValueType) {

    const behavior = getCustomFieldBehavior(customFieldData.fieldType, customFieldData.dataType)

    const behaviorProps = {
        type: behavior.getType(),
        options: behavior.handlesOptions() ? getOptions(customFieldData) : undefined,
        component: behavior.getComponent(),
    }

    return <Field key={customFieldData.customFieldId} name={customFieldData.customFieldId} title={customFieldData.title} {...behaviorProps} />;
}

function getOptions(customFieldData: CustomFieldTypes.ICustomFieldWithValueType) {
    const options = [];

    if (customFieldData.optionValuesJson === null || customFieldData.optionFieldsJson === null) {
        throw new Error("No options for dropdown")
    }

    const values = JSON.parse(customFieldData.optionValuesJson);
    const labels = JSON.parse(customFieldData.optionFieldsJson);

    for (let i = 0; i < values.length; i++) {
        options.push({ value: values[i], label: labels[i] })
    }

    return options.length > 0 ? options : null;
}
