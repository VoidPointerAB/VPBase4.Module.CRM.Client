import React from 'react';

import { Field, FieldProps, ErrorMessage } from 'formik';

import styles from './Radio.module.css';

interface IRadioButtonGroup {
    title: string,
    name: string,
    alignment?: 'horizontal' | 'vertical',
    contentAlignment?: 'horizontal' | 'vertical',
    options: { label: string, value: string }[]
}

interface IRadioButton {
    label: string,
    value: any,
}

export const RadioButtonGroup = ({
    title,
    name,
    alignment,
    contentAlignment,
    options,
}: IRadioButtonGroup) => {

    const content = options.map((option) =>
        <Field
            key={option.value}
            name={name}
            label={option.label}
            value={option.value}
            component={RadioButton}
        />)

    if (contentAlignment === undefined) {
        contentAlignment = "vertical";
    }

    return (
        <div className={`form-group ${alignment ? alignment : ''}`}>
            <label className="control-label m-r-sm">{title}</label>
            <div>
                <div className={`${styles.groupContainer} ${contentAlignment === "horizontal" ? styles.horizontal : styles.vertical}`}>
                    {content}
                </div>
                <ErrorMessage name={name} render={error => <div className="validation-error">{error}</div>} />
            </div>
        </div>
    );
};

export const RadioButton = ({
    field,
    form: { setFieldValue, setFieldTouched },
    label,
    value,
}: FieldProps<any> & IRadioButton) => {
    return (
        <label className={styles.checkmarkContainer}>{label}
            <input
                name={field.name}
                type="radio"
                value={value}
                checked={field.value === value}
                onChange={(e: any) => {
                    setFieldValue(field.name, e.currentTarget.value)
                    setFieldTouched(field.name, true)
                }}
                onBlur={field.onBlur}
            />
            <span className={styles.checkmark}></span>
        </label>
    );
};
