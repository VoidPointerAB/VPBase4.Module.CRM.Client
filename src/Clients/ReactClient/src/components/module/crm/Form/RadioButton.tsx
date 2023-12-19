import React from 'react';

import { FieldProps, FormikErrors } from 'formik';

interface IRadioButton {
  type?: 'radio',
  id: string | undefined,
  label: string | undefined,
  field?: any,
  children?: any,
  value?: any,
  errors?: string | FormikErrors<any> | undefined
  touched?: any,
}

export const RadioButton = ({
  field: { name, value, onChange, onBlur },
  form: { touched, errors, setFieldValue, setFieldTouched },
  id,
  label,
  ...props
}: FieldProps<any> & IRadioButton) => {
  return (
    <div className="activity-input">
      <input
        name={name}
        id={id}
        type="radio"
        value={id}
        checked={id === value}
        onChange={(e: any) => {
          setFieldValue(name, e.currentTarget.value)
        }}
        onBlur={onBlur}
        {...props}
      />
      <label htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export const RadioButtonGroup = ({
  value,
  touched,
  errors,
  id,
  label,
  children
}: IRadioButton) => {
  return (
    <div className="form-group">
      <label style={{marginBottom: '.5rem', fontWeight: 'bold', fontSize: '13px'}}>{label}</label>
      <div className="activity-button-container">{children}</div>
      {touched}
      {errors}
    </div>
  );
};
