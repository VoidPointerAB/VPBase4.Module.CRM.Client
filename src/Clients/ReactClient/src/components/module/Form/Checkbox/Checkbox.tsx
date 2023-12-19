import React from 'react';
import { FieldProps } from 'formik';

import { IGenericInputField } from '../VPForm';

import styles from './Checkbox.module.css';

interface ICheckboxInput extends IGenericInputField {
    disabled: boolean;
    onChange?(e: any): any;
}

export const Checkbox = ({
    field,
    form: { touched, errors },
    alignment,
    title,
    disabled,
    onChange,
}: FieldProps<any> & ICheckboxInput) => {
    const error = touched[field.name] && errors[field.name] ? errors[field.name] : undefined;

    const errorMessage =
        error === undefined ? null : <div className="validation-error">{error}</div>;

    if (onChange !== undefined) {
        field.onChange = onChange;
    }

    return (
        <div
            className={`form-group ${alignment ? alignment : ''}`}
            style={{ alignItems: 'flex-start' }}
        >
            <label className="control-label m-r-sm">{title}</label>

            <div>
                <label className={styles.container}>
                    <input
                        name={field.name}
                        type="checkbox"
                        checked={field.value === true ? true : false}
                        disabled={disabled}
                        {...field}
                    />
                    <span className={styles.checkmark}></span>
                </label>
                {errorMessage}
            </div>
        </div>
    );
};
